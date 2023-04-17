import { openDB } from "idb";
import debounce from "lodash.debounce";
import { nanoid } from "nanoid";
import { useEffect } from "react";
import { proxy, subscribe, useSnapshot } from "valtio";
import { derive } from "valtio/utils";

export enum ITEM_TYPE {
  TODO = "TODO",
  DONE = "DONE",
}

export interface IItem {
  id: string;
  content?: string;
  title?: string;
  itemType: ITEM_TYPE;
  sortIndex?: number;
  date: Date;
}

const state = proxy({
  items: {} as { [key: string]: IItem | undefined },
  sequence: [] as string[],
  sequenceItem: () => {
    return state.sequence.map((s) => state.items[s]);
  },
  moveItem: (from: string | number, to: string | number) => {
    const fromIndex = state.sequence.findIndex((v) => v === from);
    const toIndex = state.sequence.findIndex((v) => v === to);
    const fromEl = state.sequence.splice(fromIndex, 1);
    state.sequence.splice(toIndex, 0, ...fromEl);
  },
  createTodo: (date: Date = new Date(new Date().toDateString())): IItem => {
    const id = nanoid();
    const item: IItem = {
      id,
      itemType: ITEM_TYPE.TODO,
      title: id,
      date,
    };
    state.items[item.id] = item;
    state.sequence.unshift(item.id);
    return item;
  },
  moveToTop: (id: string | number) => {
    const index = state.sequence.findIndex((s) => s === id);
    const el = state.sequence.splice(index, 1);
    state.sequence.unshift(...el);
  },
  toggleItem: (
    id: string | number,
    options?: {
      moveToTop?: boolean;
    }
  ) => {
    const item = state.items[id];
    if (item == null) {
      return;
    }

    if (item.itemType === ITEM_TYPE.TODO) {
      item.itemType = ITEM_TYPE.DONE;
    } else {
      item.itemType = ITEM_TYPE.TODO;
    }
    if (options?.moveToTop) {
      state.moveToTop(id);
    }
  },
});

export const categorizedData = derive({
  todo: (get) =>
    get(state)
      .sequenceItem()
      .filter(
        (item: IItem | undefined): item is IItem =>
          item?.itemType === ITEM_TYPE.TODO
      ),
  done: (get) =>
    get(state)
      .sequenceItem()
      .filter(
        (item: IItem | undefined): item is IItem =>
          item?.itemType === ITEM_TYPE.DONE
      ),
});

export const useMoveItem = () => {
  return useSnapshot(state).moveItem;
};

export const useToggleItem = () => {
  return useSnapshot(state).toggleItem;
};

export const useCreateTodo = () => {
  return useSnapshot(state).createTodo;
};

const syncData = debounce(async (workspaceId: string) => {
  const db = await openDB<{
    sequence: {
      key: string;
      value: string[];
    };
    items: {
      key: string;
      value: { [key: string]: IItem | undefined };
    };
  }>(workspaceId, undefined, {
    upgrade(database, oldVersion, newVersion, transaction, event) {
      database.createObjectStore("sequence");
      database.createObjectStore("items");
    },
  });

  try {
    const sequence = await db.get("sequence", "sequence");
    state.sequence = sequence ?? [];
  } catch (error) {
    console.error(error);
  }

  try {
    const items = await db.get("items", "items");
    state.items = items ?? {};
  } catch (error) {
    console.error(error);
  }

  const unsubscribe = subscribe(state, async (ops) => {
    console.log("test test");
    await db.put("sequence", [...state.sequence], "sequence");
    await db.put(
      "items",
      Object.entries(state.items).reduce(
        (p, c) => ({ ...p, [c[0]]: { ...c[1] } }),
        {}
      ),
      "items"
    );
  });

  return unsubscribe;
});

export const useSyncListData = (
  workspaceId: string,
  options?: { pushToRemote?: boolean }
) => {
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    syncData(workspaceId)?.then((res) => {
      unsubscribe = res;
    });

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [workspaceId]);
};
