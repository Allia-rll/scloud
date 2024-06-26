import { useEffect, useState } from "react";
import { LoginInput } from "../../types/formsInterfaces/loginInput";
import { useForm, SubmitHandler } from "react-hook-form";
import { Cia } from "../../types/models/cia";
import DropdownOptions from "./components/DropdownOptions";
import { useStore } from "../../store/store";

export default function Login() {
  const setSession = useStore((state) => state.setSession);
  const [cias, setCias] = useState<Cia[]>([]);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
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
      const cia = cias.find((c) => c.descia === data.descia);

      const res = await fetch(
        `http://localhost:5050/api/v1/cias/${cia?.codcia}`
      ).then((res) => res.json());

      setSession({ cia: { ...res.data } });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const onOptionSelected = (value: string) => {
    setValue("descia", value);
    setOpen(false);
  };

  const openDropdown = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const fetchCias = async () => {
      try {
        const response = await fetch("http://localhost:5050/api/v1/cias");
        const { data } = await response.json();
        setCias(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCias();
  }, []);

  return (
    <div className="bg-gray-900 flex items-center justify-center h-screen">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center mb-4 text-white">
          Login
        </h2>
        {errors?.password?.type === "manual" && (
          <span className="text-red-600 py-8">{errors.password.message}</span>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-shrink-0 w-fit justify-center ">
            <button
              id="dropdownProject"
              className="col-span-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              type="button"
              onClick={openDropdown}
              {...register("descia", {
                required: {
                  value: true,
                  message: "Codigo CIA is required",
                },
                validate: (value) => {
                  if (value === "Codigo CIA" || value === "") {
                    return "Codigo CIA is required";
                  }
                  return true;
                },
              })}
            >
              {watch("descia") || "Codigo CIA"}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l4 4 4-4"
                />
              </svg>
            </button>
            {open && (
              <div
                id="dropdownDivider"
                className="z-100 absolute bg-gray-700 divide-y divide-gray-600 rounded-lg shadow w-max"
              >
                <DropdownOptions data={cias} onClick={onOptionSelected} />
              </div>
            )}
            {errors?.descia && (
              <span className="text-red-600 py-8">{errors.descia.message}</span>
            )}
          </div>

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
      </div>
    </div>
  );
}
