import clsx from "clsx";
import { PropsWithChildren } from "react";

interface IProps extends IClassNameProps {
  searchId: string;
}

const Search = (props: PropsWithChildren<IProps>) => {
  const { children, className, searchId } = props;
  return (
    <div className={clsx("w-80 max-w-xs flex mr-8", className)}>
      <div className="searchbox relative mx-3 w-full">
        <svg
          className="pointer-events-none absolute z-10 my-3 ml-2 stroke-current opacity-60 text-base-content"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
        <div
          aria-haspopup="listbox"
          aria-expanded="true"
          className="dropdown w-full"
        >
          <form>
            <input
              id={searchId}
              type="search"
              placeholder="Search…"
              autoComplete="off"
              spellCheck="false"
              className="input w-full max-w-xs pl-8 pr-3 py-2 border-0 input-md h-10"
            />
          </form>
          {children}
        </div>
      </div>
    </div>
  );
};
export default Search;
