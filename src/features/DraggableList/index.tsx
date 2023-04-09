import { DndContext, DragEndEvent, Modifier } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback } from "react";

import List from "../../components/List";
import { IItem, useMoveItem } from "../listData";
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

  const moveItem = useMoveItem();

  const onDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      const activeId = active.id;
      const overId = over?.id;
      if (overId == null) {
        return;
      }
      moveItem(activeId, overId);
    },
    [moveItem]
  );

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
          <AnimatePresence>
            {items.map((item) => {
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    marginBottom: -8,
                  }}
                >
                  <DraggableItem item={item} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </List>
      </SortableContext>
    </DndContext>
  );
};

export default DraggableList;
