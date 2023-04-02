import { DndContext, DragEndEvent, Modifier } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Suspense, useCallback } from "react";

import List from "../../components/List";
import { IItem, listData } from "../listData";
import DraggableItem from "./DraggableItem";

interface IProps {
  id: string;
  items: IItem[];
  listProps?: {
    className: string;
  };
}

const restrictToVerticalAxis: Modifier = ({ transform }) => {
  return {
    ...transform,
    x: 0,
  };
};

const DraggableList = (props: IProps) => {
  const { id, items, listProps } = props;

  const onDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    const activeId = active.id;
    const overId = over?.id;
    if (overId == null) {
      return;
    }

    const activeIndex = listData.items.findIndex((v) => v.id === activeId);
    const overIndex = listData.items.findIndex((v) => v.id === overId);

    const activeEl = listData.items.splice(activeIndex, 1);
    listData.items.splice(overIndex, 0, ...activeEl);
  }, []);

  return (
    <DndContext
      id={id}
      onDragEnd={onDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext
        items={items}
        id={id}
        strategy={verticalListSortingStrategy}
      >
        <List {...listProps}>
          {items.map((item) => {
            return <DraggableItem key={item.id} item={item} />;
          })}
        </List>
      </SortableContext>
    </DndContext>
  );
};

export default DraggableList;
