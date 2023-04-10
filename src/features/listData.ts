import { nanoid } from "nanoid";
import PouchDB from "pouchdb";
import upsert from "pouchdb-upsert";
import { useCallback, useEffect, useRef } from "react";
import { proxy, subscribe, useSnapshot } from "valtio";
import { derive } from "valtio/utils";

PouchDB.plugin(upsert);

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

export const useSyncListData = (
  workspaceId: string,
  options?: { pushToRemote?: boolean }
) => {
  const ref = useRef(new PouchDB(workspaceId));

  const syncData = useCallback(async () => {
    const sequenceDoc = await ref.current.get<{ sequence?: string[] }>(
      "sequence"
    );
    state.sequence = sequenceDoc.sequence ?? [];

    const itemsDoc = await ref.current.get<{
      items?: { [key: string]: IItem | undefined };
    }>("items");
    state.items = itemsDoc.items ?? {};
  }, []);

  useEffect(() => {
    syncData();
  }, [syncData]);

  useEffect(() => {
    const unsubscribe = subscribe(state, async (ops) => {
      await ref.current.upsert("sequence", (doc) => ({
        ...doc,
        sequence: state.sequence,
      }));
      await ref.current.upsert("items", (doc) => ({
        ...doc,
        items: state.items,
      }));
    });
    return () => {
      unsubscribe();
    };
  }, []);
};
