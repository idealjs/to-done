import clsx from "clsx";
import { PropsWithChildren } from "react";

import { IClassNameProps } from "../../type";

interface IProps extends IClassNameProps {}

const ListItem = (props: PropsWithChildren<IProps>) => {
  const { children, className } = props;
  return (
    <li className={clsx("card p-2 m-1 shadow-md", className)}>{children}</li>
  );
};

export default ListItem;
