import type { Workspace } from "@prisma/client";
import { useCallback } from "react";

const useCreateWorkspace = () => {
  return useCallback(async (name: string) => {
    const res = await fetch("/api/v1/workspaces", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });

    const workspace = (await res.json()) as Workspace;

    return workspace;
  }, []);
};

export default useCreateWorkspace;
