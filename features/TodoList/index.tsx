"use client";

import clsx from "clsx";
import { useSnapshot } from "valtio";

import DraggableList from "../DraggableList";
import { categorizedData } from "../listData";

interface IProps {
  id?: string;
}

const TodoList = (props: IProps) => {
  const { id = "todo" } = props;
  const items = useSnapshot(categorizedData).todo;
  return (
    <DraggableList
      id={id}
      items={items}
      listProps={{
        className: clsx("col-span-5 w-full", "lg:col-span-3"),
      }}
    />
  );
};

export default TodoList;
