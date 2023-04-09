import { useCreateTodo } from "../listData";

const CreateItem = () => {
  const createTodo = useCreateTodo();
  return (
    <div
      className="btn btn-info shadow-md z-10 sticky top-16"
      onClick={() => {
        createTodo();
      }}
    >
      Create Item
    </div>
  );
};

export default CreateItem;
