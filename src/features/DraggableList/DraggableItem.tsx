import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PropsWithChildren } from "react";

import ListItem from "../../components/List/ListItem";

interface IProps {
  item: {
    id: UniqueIdentifier;
    title: string;
    content: string;
  };
}

const DraggableItem = (props: PropsWithChildren<IProps>) => {
  const { item } = props;

  const { setNodeRef, listeners, transform, transition } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString({
      x: transform?.x ?? 0,
      y: transform?.y ?? 0,
      scaleX: 1,
      scaleY: 1,
    }),
    transition,
  };

  return (
    <ListItem
      ref={setNodeRef}
      className={"flex-row bg-base-200 my-2"}
      style={style}
    >
      <div {...listeners}>
        <svg viewBox="0 0 20 20" width="12">
          <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
        </svg>
      </div>
      <div>
        <input type="checkbox" className="checkbox mt-1" />
      </div>
      <div tabIndex={0} className="collapse collapse-arrow w-full">
        <input type="checkbox" className="min-h-fit" />
        <div className="collapse-title text-xl min-h-fit py-1">
          <div className="flex items-center h-6">{item.title}</div>
        </div>
        <div className="collapse-content">
          <p>{item.content}</p>
        </div>
      </div>
    </ListItem>
  );
};

export default DraggableItem;
