import { useEffect, useState } from "react";
import ModalButton from "../../components/ModalButton";
import { useFCia } from "../../store/store";
import { useForm } from "react-hook-form";
import { FCiaInput } from "../../types/formsInterfaces/fciainput";
import { Cia } from "../../types/models/cia";
import DropdownOptions from "./DropdownOptions";
import { useRoutes } from "../../hooks/useRoutes";

export default function AddFCia() {
  const [open, setOpen] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const { params } = useRoutes();
  const updtFCias = useFCia((state) => state.updateFCias);
  const [cias, setCias] = useState<Cia[]>([]);

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<FCiaInput>();

  const onSubmit = async (data: FCiaInput) => {
    try {
      const codcia = cias.find((c) => c.descia === data.desccia)?.codcia;
      console.log("DATA");
      console.log(params.credential?.cod);
      console.log("CODCIA");
      console.log(codcia);
      const res = await fetch("http://localhost:5050/api/v1/foldercia/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codcred: params.credential?.cod,
          codcia: codcia,
        }),
      });
      const response = await res.json();
      if (response.error) {
        throw new Error("Error adding Cia");
      }
      console.log("NEW CIA");
      console.log(response);
      const newfcia = response.data;
      updtFCias({ cod: newfcia.codfcia, name: newfcia.namefcia });
      setOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        setError("codcred", { type: "manual", message: error.message });
      }
    }
  };

  const handleAdd = () => {
    setOpen(!open);
  };

  const openDropdown = () => {
    setOpenOptions(!openOptions);
  };

  const onOptionSelected = (value: string) => {
    setValue("desccia", value);
    setOpenOptions(false);
  };

  useEffect(() => {
    const fetchCias = async () => {
      try {
        const response = await fetch(
          "http://localhost:5050/api/v1/cias/withoutfolder",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ codcred: params.credential?.cod }),
          }
        );
        const { data } = (await response.json()) as { data: Cia[] };
        setCias(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCias();
  }, [params.credential]);

  return (
    <ModalButton open={open} onClick={handleAdd} label="Add Cia">
      <div className="relative bg-slate-700 rounded-lg shadow">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Add Cia
          </h3>
        </div>
        <form className="p-4 md:p-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label
                htmlFor="codcred"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Credential
              </label>
              <input
                type="text"
                id="codcred"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Madrid-Fondo-de-pantalla.jpg"
                value={params.credential?.name}
                readOnly
                {...register("codcred")}
              />
            </div>
            <div className="flex-shrink-0 w-fit justify-center ">
              <button
                id="dropdownCia"
                className="col-span-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                type="button"
                onClick={openDropdown}
                {...register("desccia", {
                  required: {
                    value: true,
                    message: "Cia is required",
                  },
                  validate: (value) => {
                    if (value === "Cia" || value === "") {
                      return "Cia is required";
                    }
                    return true;
                  },
                })}
              >
                {watch("desccia") || "Cia"}
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
              {openOptions && (
                <div
                  id="dropdownDivider"
                  className="z-100 absolute bg-gray-700 divide-y divide-gray-600 rounded-lg shadow w-max"
                >
                  {cias.length === 0 ? (
                    <p className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                      No Cias available
                    </p>
                  ) : (
                    <DropdownOptions data={cias} onClick={onOptionSelected} />
                  )}
                </div>
              )}
              {errors?.desccia && (
                <span className="text-red-600 py-8">
                  {errors.desccia.message}
                </span>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add
          </button>
        </form>
      </div>
    </ModalButton>
  );
}
