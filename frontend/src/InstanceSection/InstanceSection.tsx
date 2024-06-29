import FolderSection from "../components/FolderSection";
import { useFCreds } from "../store/store";
import { useRoutes } from "../hooks/useRoutes";

export default function InstanceSection() {
  const credentials = useFCreds((state) => state.credentials);
  const { onChangeCredentials } = useRoutes();

  return (
    <FolderSection
      folders={credentials}
      onClick={onChangeCredentials}
      icon="/icons/default-cred-ixon.png"
    />
  );
}
