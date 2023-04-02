import clsx from "clsx";
import { useSnapshot } from "valtio";

import DraggableList from "../DraggableList";
import { listData } from "../listData";

interface IProps {
  id?: string;
}

const DoneList = (props: IProps) => {
  const { id = "done" } = props;
  const items = useSnapshot(listData.done);
  return (
    <DraggableList
      id={id}
      items={items}
      listProps={{
        className: clsx("hidden lg:block", "w-full", "col-span-2"),
      }}
    />
  );
};

export default DoneList;
