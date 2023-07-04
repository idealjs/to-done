import { Fragment } from "react";

const Logo = () => {
  return (
    <Fragment>
      <div className="btn btn-ghost px-2 font-title inline-flex text-lg transition-all duration-200 md:text-3xl">
        <span className="lowercase">to</span>
        <span className="uppercase text-primary">done</span>
      </div>
      <div data-tip="Changelog" className="tooltip tooltip-bottom">
        {process.env.NEXT_PUBLIC_APP_VERSION}
      </div>
    </Fragment>
  );
};
export default Logo;
