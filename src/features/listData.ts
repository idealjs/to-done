import { proxy } from "valtio";

export const listData = proxy({
  todo: [
    { id: "a1", content: "a1", title: "a1" },
    { id: "b1", content: "b1", title: "b1" },
    { id: "c1", content: "c1", title: "c1" },
    { id: "d1", content: "d1", title: "d1" },
    { id: "e1", content: "e1", title: "e1" },
    { id: "f1", content: "f1", title: "f1" },
    { id: "g1", content: "g1", title: "g1" },
    { id: "h1", content: "h1", title: "h1" },
    { id: "i1", content: "i1", title: "i1" },
    { id: "j1", content: "j1", title: "j1" },
    { id: "k1", content: "k1", title: "k1" },
    { id: "l1", content: "l1", title: "l1" },
    { id: "m1", content: "m1", title: "m1" },
    { id: "n1", content: "n1", title: "n1" },
    { id: "o1", content: "o1", title: "o1" },
    { id: "p1", content: "p1", title: "p1" },
    { id: "q1", content: "q1", title: "q1" },
    { id: "r1", content: "r1", title: "r1" },
  ],
  done: [
    { id: "a2", content: "a2", title: "a2" },
    { id: "b2", content: "b2", title: "b2" },
    { id: "c2", content: "c2", title: "c2" },
    { id: "d2", content: "d2", title: "d2" },
    { id: "e2", content: "e2", title: "e2" },
    { id: "f2", content: "f2", title: "f2" },
    { id: "g2", content: "g2", title: "g2" },
    { id: "h2", content: "h2", title: "h2" },
    { id: "i2", content: "i2", title: "i2" },
    { id: "j2", content: "j2", title: "j2" },
    { id: "k2", content: "k2", title: "k2" },
    { id: "l2", content: "l2", title: "l2" },
    { id: "m2", content: "m2", title: "m2" },
    { id: "n2", content: "n2", title: "n2" },
    { id: "o2", content: "o2", title: "o2" },
    { id: "p2", content: "p2", title: "p2" },
    { id: "q2", content: "q2", title: "q2" },
    { id: "r2", content: "r2", title: "r2" },
  ],
});

export const findContainer = (id: string | number) => {
  const keys = Object.keys(listData) as (keyof typeof listData)[];
  for (const key of keys) {
    for (const data of listData[key]) {
      if (data.id === id) {
        return key;
      }
    }
  }
};
