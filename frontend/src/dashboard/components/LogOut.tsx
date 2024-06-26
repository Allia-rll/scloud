import { useStore } from "../../store/store";

export default function LogOut() {
  const setSession = useStore((state) => state.setSession);

  const signOut = () => {
    setSession({ cia: null });
  };
  
  return (
    <div className="ml-4 mr-12">
      <button onClick={() => signOut()} className="w-max flex">
        <img
          className="h-7 drop-shadow-xl shadow-red-800/100"
          src={"/icons/logout-icon.svg"}
          alt="Sign Out"
        />
        <span className="text-red-600 pt-0.5">Sign Out</span>
      </button>
    </div>
  );
}
