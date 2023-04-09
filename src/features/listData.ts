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
  items: {
    a1: {
      id: "a1",
      content: "a1",
      title: "a1",
      itemType: ITEM_TYPE.TODO,
      date: new Date(new Date().toDateString()),
    },
    b1: {
      id: "b1",
      content: "b1",
      title: "b1",
      itemType: ITEM_TYPE.TODO,
      date: new Date(new Date().toDateString()),
    },
    c1: {
      id: "c1",
      content: "c1",
      title: "c1",
      itemType: ITEM_TYPE.TODO,
      date: new Date(new Date().toDateString()),
    },
    d1: {
      id: "d1",
      content: "d1",
      title: "d1",
      itemType: ITEM_TYPE.TODO,
      date: new Date(new Date().toDateString()),
    },
    e1: {
      id: "e1",
      content: "e1",
      title: "e1",
      itemType: ITEM_TYPE.TODO,
      date: new Date(new Date().toDateString()),
    },
    f1: {
      id: "f1",
      content: "f1",
      title: "f1",
      itemType: ITEM_TYPE.TODO,
      date: new Date(new Date().toDateString()),
    },
    g1: {
      id: "g1",
      content: "g1",
      title: "g1",
      itemType: ITEM_TYPE.TODO,
      date: new Date(new Date().toDateString()),
    },
    h1: {
      id: "h1",
      content: "h1",
      title: "h1",
      itemType: ITEM_TYPE.TODO,
      date: new Date(new Date().toDateString()),
    },
    i1: {
      id: "i1",
      content: "i1",
      title: "i1",
      itemType: ITEM_TYPE.TODO,
      date: new Date(new Date().toDateString()),
    },
    j1: {
      id: "j1",
      content: "j1",
      title: "j1",
      itemType: ITEM_TYPE.TODO,
      date: new Date(new Date().toDateString()),
    },
    k1: {
      id: "k1",
      content: "k1",
      title: "k1",
      itemType: ITEM_TYPE.TODO,
      date: new Date(new Date().toDateString()),
    },
    l1: {
      id: "l1",
      content: "l1",
      title: "l1",
      itemType: ITEM_TYPE.TODO,
      date: new Date(new Date().toDateString()),
    },
    m1: {
      id: "m1",
      content: "m1",
      title: "m1",
      itemType: ITEM_TYPE.TODO,
      date: new Date(new Date().toDateString()),
    },
    n1: {
      id: "n1",
      content: "n1",
      title: "n1",
      itemType: ITEM_TYPE.TODO,
      date: new Date(new Date().toDateString()),
    },
    o1: {
      id: "o1",
      content: "o1",
      title: "o1",
      itemType: ITEM_TYPE.TODO,
      date: new Date(new Date().toDateString()),
    },
    p1: {
      id: "p1",
      content: "p1",
      title: "p1",
      itemType: ITEM_TYPE.TODO,
      date: new Date(new Date().toDateString()),
    },
    q1: {
      id: "q1",
      content: "q1",
      title: "q1",
      itemType: ITEM_TYPE.TODO,
      date: new Date(new Date().toDateString()),
    },
    r1: {
      id: "r1",
      content: "r1",
      title: "r1",
      itemType: ITEM_TYPE.TODO,
      date: new Date(new Date().toDateString()),
    },
    a2: {
      id: "a2",
      content: "a2",
      title: "a2",
      itemType: ITEM_TYPE.DONE,
      date: new Date(new Date().toDateString()),
    },
    b2: {
      id: "b2",
      content: "b2",
      title: "b2",
      itemType: ITEM_TYPE.DONE,
      date: new Date(new Date().toDateString()),
    },
    c2: {
      id: "c2",
      content: "c2",
      title: "c2",
      itemType: ITEM_TYPE.DONE,
      date: new Date(new Date().toDateString()),
    },
    d2: {
      id: "d2",
      content: "d2",
      title: "d2",
      itemType: ITEM_TYPE.DONE,
      date: new Date(new Date().toDateString()),
    },
    e2: {
      id: "e2",
      content: "e2",
      title: "e2",
      itemType: ITEM_TYPE.DONE,
      date: new Date(new Date().toDateString()),
    },
    f2: {
      id: "f2",
      content: "f2",
      title: "f2",
      itemType: ITEM_TYPE.DONE,
      date: new Date(new Date().toDateString()),
    },
    g2: {
      id: "g2",
      content: "g2",
      title: "g2",
      itemType: ITEM_TYPE.DONE,
      date: new Date(new Date().toDateString()),
    },
    h2: {
      id: "h2",
      content: "h2",
      title: "h2",
      itemType: ITEM_TYPE.DONE,
      date: new Date(new Date().toDateString()),
    },
    i2: {
      id: "i2",
      content: "i2",
      title: "i2",
      itemType: ITEM_TYPE.DONE,
      date: new Date(new Date().toDateString()),
    },
    j2: {
      id: "j2",
      content: "j2",
      title: "j2",
      itemType: ITEM_TYPE.DONE,
      date: new Date(new Date().toDateString()),
    },
    k2: {
      id: "k2",
      content: "k2",
      title: "k2",
      itemType: ITEM_TYPE.DONE,
      date: new Date(new Date().toDateString()),
    },
    l2: {
      id: "l2",
      content: "l2",
      title: "l2",
      itemType: ITEM_TYPE.DONE,
      date: new Date(new Date().toDateString()),
    },
    m2: {
      id: "m2",
      content: "m2",
      title: "m2",
      itemType: ITEM_TYPE.DONE,
      date: new Date(new Date().toDateString()),
    },
    n2: {
      id: "n2",
      content: "n2",
      title: "n2",
      itemType: ITEM_TYPE.DONE,
      date: new Date(new Date().toDateString()),
    },
    o2: {
      id: "o2",
      content: "o2",
      title: "o2",
      itemType: ITEM_TYPE.DONE,
      date: new Date(new Date().toDateString()),
    },
    p2: {
      id: "p2",
      content: "p2",
      title: "p2",
      itemType: ITEM_TYPE.DONE,
      date: new Date(new Date().toDateString()),
    },
    q2: {
      id: "q2",
      content: "q2",
      title: "q2",
      itemType: ITEM_TYPE.DONE,
      date: new Date(new Date().toDateString()),
    },
    r2: {
      id: "r2",
      content: "r2",
      title: "r2",
      itemType: ITEM_TYPE.DONE,
      date: new Date(new Date().toDateString()),
    },
  } as { [key: string]: IItem | undefined },
  sequence: [
    "a1",
    "b1",
    "c1",
    "d1",
    "e1",
    "f1",
    "g1",
    "h1",
    "i1",
    "j1",
    "k1",
    "l1",
    "m1",
    "n1",
    "o1",
    "p1",
    "q1",
    "r1",
    "a2",
    "b2",
    "c2",
    "d2",
    "e2",
    "f2",
    "g2",
    "h2",
    "i2",
    "j2",
    "k2",
    "l2",
    "m2",
    "n2",
    "o2",
    "p2",
    "q2",
    "r2",
  ],
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
    const item = {
      id: nanoid(),
      itemType: ITEM_TYPE.TODO,
      date,
    };

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

export const useSyncListData = () => {
  useEffect(() => {
    const unsubscribe = subscribe(state, (ops) => {
      ops.forEach((op) => {
        if (op[0] === "set") {
        }
      });
    });
    return () => {
      unsubscribe();
    };
  }, []);
};
