import { useEffect, useState } from "react";
import ModalButton from "../../components/ModalButton";
import { useFPyto, useStore } from "../../store/store";
import { useForm } from "react-hook-form";
import DropdownOptions from "./DropdownOptions";
import { useRoutes } from "../../hooks/useRoutes";
import { Proyecto } from "../../types/models/proyecto";
import { FPytoInput } from "../../types/formsInterfaces/fpytoinput";

export default function AddFProyecto() {
  const [open, setOpen] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const { params } = useRoutes();
  const updtFpyto = useFPyto((state) => state.updateProyectos);
  const [pytos, setPytos] = useState<Proyecto[]>([]);
  const { cia } = useStore((state) => state.session);

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<FPytoInput>();

  const onSubmit = async (data: FPytoInput) => {
    try {
      const codpyto = pytos.find((c) => c.nombpyto === data.nombpyto)?.codpyto;
      const res = await fetch(
        "http://localhost:5050/api/v1/folderpyto/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            codcred: params.credential?.cod,
            codfcia: params.cia?.cod,
            codpyto: codpyto,
          }),
        }
      );
      const response = await res.json();
      if (response.error) {
        throw new Error("Error adding Proyecto");
      }
      console.log("NEW PROYECTO");
      console.log(response);
      const newfcia = response.data;
      updtFpyto({ cod: newfcia.codfpyto, name: newfcia.nombfpyto });
      setOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        setError("namecred", { type: "manual", message: error.message });
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
    setValue("nombpyto", value);
    setOpenOptions(false);
  };

  useEffect(() => {
    const fetchPytos = async () => {
      try {
        const response = await fetch(
          "http://localhost:5050/api/v1/proyectos/withoutfolder",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ codfcia: params.cia?.cod, codcia: cia?.codcia }),
          }
        );
        const { data } = (await response.json()) as { data: Proyecto[] };
        setPytos(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPytos();
  }, [params.cia, openOptions]);

  return (
    <ModalButton open={open} onClick={handleAdd} label="Add Proyecto">
      <div className="relative bg-slate-700 rounded-lg shadow">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Add Proyecto
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
                {...register("namecred")}
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="codcred"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Cia
              </label>
              <input
                type="text"
                id="codcred"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Madrid-Fondo-de-pantalla.jpg"
                value={params.cia?.name}
                readOnly
                {...register("descia")}
              />
            </div>
            <div className="flex-shrink-0 w-fit justify-center ">
              <button
                id="dropdownCia"
                className="col-span-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                type="button"
                onClick={openDropdown}
                {...register("nombpyto", {
                  required: {
                    value: true,
                    message: "Proyecto is required",
                  },
                  validate: (value) => {
                    if (value === "Proyecto" || value === "") {
                      return "Proyecto is required";
                    }
                    return true;
                  },
                })}
              >
                {watch("nombpyto") || "Proyecto"}
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
                  {pytos.length === 0 ? (
                    <p className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                      No Cias available
                    </p>
                  ) : (
                    <DropdownOptions data={pytos} onClick={onOptionSelected} />
                  )}
                </div>
              )}
              {errors?.nombpyto && (
                <span className="text-red-600 py-8">
                  {errors.nombpyto.message}
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
