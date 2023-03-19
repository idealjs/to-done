import clsx from "clsx";

import { IClassNameProps } from "../../type";

interface IProps extends IClassNameProps {}

const CreateItem = (props: IProps) => {
  const { className } = props;

  return <div className={clsx("btn btn-info shadow-md", className)}>Create Item</div>;
};

export default CreateItem;
