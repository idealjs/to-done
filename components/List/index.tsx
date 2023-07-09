import clsx from "clsx";
import { PropsWithChildren } from "react";

interface IProps extends IClassNameProps {}

const List = (props: PropsWithChildren<IProps>) => {
  const { children, className } = props;

  return <ul className={clsx(className)}>{children}</ul>;
};

export default List;
