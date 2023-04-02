import clsx from "clsx";
import { CSSProperties, forwardRef, PropsWithChildren } from "react";

import { IClassNameProps } from "../../type";

interface IProps extends IClassNameProps {
  style?: CSSProperties;
}

const ListItem = forwardRef<HTMLLIElement, PropsWithChildren<IProps>>(
  (props, ref) => {
    const { children, className, style } = props;

    return (
      <li ref={ref} style={style}>
        <div className={clsx("card p-2 m-1 shadow-md", className)}>
          {children}
        </div>
      </li>
    );
  }
);

ListItem.displayName = "ListItem";

export default ListItem;
