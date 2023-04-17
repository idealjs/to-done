"use client";

import { useSyncListData } from "./listData";

interface IProps {
  workspaceId: string;
}

const SyncData = (props: IProps) => {
  const { workspaceId } = props;

  useSyncListData(workspaceId);
  return null;
};

export default SyncData;
