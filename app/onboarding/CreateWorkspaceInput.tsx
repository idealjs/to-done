"use client";

import { useRouter } from "next/navigation";

import HeroInput from "../components/HeroInput";
import createWorkspace from "../hooks/api/createWorkspace";

const CreateWorkspaceInput = () => {
  const router = useRouter();
  return (
    <HeroInput
      title="Create Your Workspace"
      content="Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
      excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
      a id nisi."
      input={{
        label: "Workspace Name",
        placeholder: "workspace name",
      }}
      button={{
        check: "Go",
      }}
      check={async (input) => {
        await createWorkspace(input ?? "");
        router.push("/");
        return false;
      }}
    />
  );
};

export default CreateWorkspaceInput;
