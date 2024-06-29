import { useForm, SubmitHandler } from "react-hook-form";
import { useStore } from "../../store/store";
import { LoginInput } from "../../types/formsInterfaces/loginInput";
import { Folder } from "../../components/FolderCard";
import { Navigate } from "react-router-dom";
import { useRoutes } from "../../hooks/useRoutes";
import Modal from "./Modal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  cia: Folder | null;
}

const LoginModal = ({ isOpen, onClose, cia }: ModalProps) => {
  if (!cia && isOpen) return <Navigate to="/credential" />;

  const { changeCia } = useRoutes();
  const setSession = useStore((state) => state.setSession);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginInput>();

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    try {
      console.log(data);

      if (data.password === data.username) {
        console.log("Login successful");
      } else {
        setError("password", {
          type: "manual",
          message: "Password or username incorrect",
        });
      }

      const res = await fetch(`http://localhost:5050/api/v1/cias/byfolder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codfcia: cia?.cod,
        }),
      }).then((res) => res.json());

      setSession({ cia: { ...res.data } });
      changeCia(cia as Folder);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}  >
        <div className="flex">
          <h2 className="text-2xl font-semibold text-center mb-4 text-white">
            Login in <span className="font-bold">{cia?.name}</span>
          </h2>
          <button
            onClick={onClose}
            className="ml-auto mb-auto text-white font-bold"
          >
            &times;
          </button>
        </div>

        {errors?.password?.type === "manual" && (
          <span className="text-red-600 py-8">{errors.password.message}</span>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-100 text-sm font-semibold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="bg-slate-800 w-full px-4 py-2 border focus:ring focus:ring-blue-500 focus:border-blue-500 border-gray-600 placeholder-gray-400 rounded-lg text-white"
              placeholder="James Brown"
              {...register("username", {
                required: {
                  value: true,
                  message: "Username is required",
                },
              })}
            />
            {errors?.username && (
              <span className="text-red-600 py-8">
                {errors.username.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-100  text-sm font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-slate-800 w-full px-4 py-2 border focus:ring focus:ring-blue-500 focus:border-blue-500 border-gray-600 placeholder-gray-400 rounded-lg text-white"
              placeholder="••••••••"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
              })}
            />
            {errors?.password && !errors.password.type.includes("manual") && (
              <span className="text-red-600 py-8">
                {errors.password.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Log in
          </button>
        </form>
    </Modal>
  );
};

export default LoginModal;
