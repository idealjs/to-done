import { Fragment } from "react";

import Logo from "../../components/Logo";
import CreateItem from "../../features/CreateItem";
import DoneList from "../../features/DoneList";
import Navbar from "../../features/Navbar";
import SignOut from "../../features/SignOut";
import SyncData from "../../features/SyncData";
import TodoList from "../../features/TodoList";

interface IProps {
  params: {
    id: string;
  };
}

const Workspace = async (props: IProps) => {
  const { params } = props;

  return (
    <Fragment>
      <SyncData workspaceId={params.id} />
      <div className="drawer">
        <input
          id="workspace-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <div
            className="sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 
  bg-base-100 text-base-content"
          >
            <Navbar />
          </div>
          <div className="px-5">
            <CreateItem />
            <div className="grid grid-cols-5">
              <TodoList />
              <DoneList />
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="workspace-drawer"
            className="drawer-overlay button"
          ></label>
          <aside className="bg-base-200 w-80 sm:border-r-2 sm:border-gray-300 flex flex-col">
            <div className="sticky flex items-baseline px-4 py-2 gap-2">
              <Logo />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <ul></ul>
              <SignOut />
            </div>
          </aside>
        </div>
      </div>
    </Fragment>
  );
};

export default Workspace;
