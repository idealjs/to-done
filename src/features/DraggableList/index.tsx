import { DndContext, DragEndEvent, Modifier } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useCallback } from "react";

import List from "../../components/List";
import { findContainer, listData } from "../listData";
import DraggableItem from "./DraggableItem";

interface IProps {
  id: string;
  items: {
    id: string;
    content: string;
    title: string;
  }[];
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
    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (activeContainer == null || overContainer == null) {
      return null;
    }

    const activeIndex = listData[activeContainer].findIndex(
      (v) => v.id === activeId
    );
    const overIndex = listData[overContainer].findIndex((v) => v.id === overId);

    const activeEl = listData[activeContainer].splice(activeIndex, 1);
    listData[overContainer].splice(overIndex, 0, ...activeEl);
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
