import { nanoid } from "nanoid";

import { ITEM_TYPE, listData } from "../listData";

const CreateItem = () => {
  return (
    <div
      className="btn btn-info shadow-md z-10 sticky top-16"
      onClick={() => {
        listData.items.unshift({
          id: nanoid(),
          itemType: ITEM_TYPE.TODO,
        });
      }}
    >
      Create Item
    </div>
  );
};

export default CreateItem;
