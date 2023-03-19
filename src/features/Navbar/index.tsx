import Search from "../../components/Search";

const Navbar = () => {
  return (
    <nav className="navbar w-full">
      <div className="flex-1 md:gap-1 lg:gap-2">
        <span className="tooltip tooltip-bottom before:text-xs" data-tip="Menu">
          <label
            htmlFor="workspace-drawer"
            className="btn btn-square btn-ghost drawer-button"
          >
            <svg
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </span>
        <Search searchId="globalSearchId" className="hidden md:block" />
        <input
          type="date"
          className="input w-full max-w-xs pl-4 pr-3 py-2 border-0 input-md h-10"
        />
      </div>
    </nav>
  );
};
export default Navbar;
