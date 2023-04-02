import { proxy } from "valtio";
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
}

export const listData = proxy<{
  items: IItem[];
}>({
  items: [
    { id: "a1", content: "a1", title: "a1", itemType: ITEM_TYPE.TODO },
    { id: "b1", content: "b1", title: "b1", itemType: ITEM_TYPE.TODO },
    { id: "c1", content: "c1", title: "c1", itemType: ITEM_TYPE.TODO },
    { id: "d1", content: "d1", title: "d1", itemType: ITEM_TYPE.TODO },
    { id: "e1", content: "e1", title: "e1", itemType: ITEM_TYPE.TODO },
    { id: "f1", content: "f1", title: "f1", itemType: ITEM_TYPE.TODO },
    { id: "g1", content: "g1", title: "g1", itemType: ITEM_TYPE.TODO },
    { id: "h1", content: "h1", title: "h1", itemType: ITEM_TYPE.TODO },
    { id: "i1", content: "i1", title: "i1", itemType: ITEM_TYPE.TODO },
    { id: "j1", content: "j1", title: "j1", itemType: ITEM_TYPE.TODO },
    { id: "k1", content: "k1", title: "k1", itemType: ITEM_TYPE.TODO },
    { id: "l1", content: "l1", title: "l1", itemType: ITEM_TYPE.TODO },
    { id: "m1", content: "m1", title: "m1", itemType: ITEM_TYPE.TODO },
    { id: "n1", content: "n1", title: "n1", itemType: ITEM_TYPE.TODO },
    { id: "o1", content: "o1", title: "o1", itemType: ITEM_TYPE.TODO },
    { id: "p1", content: "p1", title: "p1", itemType: ITEM_TYPE.TODO },
    { id: "q1", content: "q1", title: "q1", itemType: ITEM_TYPE.TODO },
    { id: "r1", content: "r1", title: "r1", itemType: ITEM_TYPE.TODO },
    { id: "a2", content: "a2", title: "a2", itemType: ITEM_TYPE.DONE },
    { id: "b2", content: "b2", title: "b2", itemType: ITEM_TYPE.DONE },
    { id: "c2", content: "c2", title: "c2", itemType: ITEM_TYPE.DONE },
    { id: "d2", content: "d2", title: "d2", itemType: ITEM_TYPE.DONE },
    { id: "e2", content: "e2", title: "e2", itemType: ITEM_TYPE.DONE },
    { id: "f2", content: "f2", title: "f2", itemType: ITEM_TYPE.DONE },
    { id: "g2", content: "g2", title: "g2", itemType: ITEM_TYPE.DONE },
    { id: "h2", content: "h2", title: "h2", itemType: ITEM_TYPE.DONE },
    { id: "i2", content: "i2", title: "i2", itemType: ITEM_TYPE.DONE },
    { id: "j2", content: "j2", title: "j2", itemType: ITEM_TYPE.DONE },
    { id: "k2", content: "k2", title: "k2", itemType: ITEM_TYPE.DONE },
    { id: "l2", content: "l2", title: "l2", itemType: ITEM_TYPE.DONE },
    { id: "m2", content: "m2", title: "m2", itemType: ITEM_TYPE.DONE },
    { id: "n2", content: "n2", title: "n2", itemType: ITEM_TYPE.DONE },
    { id: "o2", content: "o2", title: "o2", itemType: ITEM_TYPE.DONE },
    { id: "p2", content: "p2", title: "p2", itemType: ITEM_TYPE.DONE },
    { id: "q2", content: "q2", title: "q2", itemType: ITEM_TYPE.DONE },
    { id: "r2", content: "r2", title: "r2", itemType: ITEM_TYPE.DONE },
  ],
});

export const categorizedListData = derive({
  todo: (get) =>
    get(listData).items.filter((item) => item.itemType === ITEM_TYPE.TODO),
  done: (get) =>
    get(listData).items.filter((item) => item.itemType === ITEM_TYPE.DONE),
});
