import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ChangeEventHandler,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";

import ListItem from "../../components/List/ListItem";
import { IItem, ITEM_TYPE, listData } from "../listData";

interface IProps {
  item: IItem;
}

const DraggableItem = (props: PropsWithChildren<IProps>) => {
  const { item } = props;
  const [showEditor, setShowEditor] = useState(false);
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

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const target = listData.items.find((v) => v.id === item.id);
      if (target != null) {
        if (event.target.checked) {
          target.itemType = ITEM_TYPE.DONE;
        } else {
          target.itemType = ITEM_TYPE.TODO;
        }
        const itemIndex = listData.items.findIndex((v) => v.id === item.id);
        const items = listData.items.splice(itemIndex, 1);
        listData.items.unshift(...items);
      }
    },
    [item.id]
  );

  return (
    <ListItem
      ref={setNodeRef}
      className={"flex-row bg-base-200 my-2 mx-1"}
      style={style}
    >
      <label className="btn btn-ghost btn-square mt-1 swap swap-flip text-xl">
        <input
          type="checkbox"
          checked={item.itemType === ITEM_TYPE.DONE}
          onChange={onChange}
        />
        <div className="swap-on">😈</div>
        <div className="swap-off">😇</div>
      </label>
      <div>
        <button className="btn btn-ghost mt-1" {...listeners}>
          <svg viewBox="0 0 20 20" width="12">
            <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
          </svg>
        </button>
      </div>

      <div tabIndex={0} className="collapse collapse-arrow w-full">
        <input
          type="checkbox"
          onChange={(event) => {
            setShowEditor(event.target.checked);
          }}
        />

        <div className="collapse-title text-xl py-1 flex items-center">
          <div>{item.title}</div>
        </div>
        <div className="collapse-content">
          <textarea className="textarea mt-2 w-full"></textarea>
        </div>
      </div>
    </ListItem>
  );
};

export default DraggableItem;
