import clsx from "clsx";
import { useSnapshot } from "valtio";

import DraggableList from "../DraggableList";
import { listData } from "../listData";

interface IProps {
  id?: string;
}

const TodoList = (props: IProps) => {
  const { id = "todo" } = props;
  const items = useSnapshot(listData.todo);
  return (
    <DraggableList
      id={id}
      items={items}
      listProps={{
        className: clsx("w-full sm:w-full md:w-full", "col-span-3"),
      }}
    />
  );
};

export default TodoList;
