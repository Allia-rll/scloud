//COMPONENTE LLAMADO EN EL LAYOUT

import { useForm } from "react-hook-form";
import { CredentialInput } from "../../types/formsInterfaces/credentialInput";
import ModalButton from "../../components/ModalButton";
import { useState } from "react";
import { useFCreds } from "../../store/store";

export default function AddCredential() {
  const [open, setOpen] = useState(false);
  const updtCreds = useFCreds((state) => state.updateCredentials);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<CredentialInput>();

  const onSubmit = async (data: CredentialInput) => {
    try {
      const private_key = data.private_key.split(String.raw`\n`).join('\n');
      const res = await fetch(
        "http://localhost:5050/api/v1/credentials/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data, private_key}),
        }
      );
      const response = await res.json();
      if (response.error) {
        throw new Error("Error adding credential");
      }
      console.log("NEW CREDENTIAL");
      console.log(response);
      const newcred = response.data;
      updtCreds({ cod: newcred.codcred, name: newcred.namecreds });
      setOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        setError("namecreds", { type: "manual", message: error.message });
      }
    }
  };

  const handleAdd = () => {
    setOpen(!open);
  };

  return (
    <ModalButton open={open} onClick={handleAdd} label="Add Credential">
      <div
        className="relative w-full max-h-max max-w-md overflow-auto"
        style={{ height: "70vh" }}
      >
        <div className="relative bg-slate-700 rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Add new Credential
            </h3>
          </div>
          <form className="p-4 md:p-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Credential Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Insert a name"
                  {...register("namecreds", {
                    required: {
                      value: true,
                      message: "Credential name is required",
                    },
                  })}
                />
                {errors.namecreds && (
                  <span className="text-red-600 py-8">
                    {errors.namecreds.message}
                  </span>
                )}
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="type"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Type
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Insert type"
                  {...register("type", {
                    required: {
                      value: true,
                      message: "Type is required",
                    },
                  })}
                />
                {errors.type && (
                  <span className="text-red-600 py-8">
                    {errors.type.message}
                  </span>
                )}
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="project_id"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Project ID
                </label>
                <input
                  type="text"
                  id="project_id"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Insert project_id"
                  {...register("project_id", {
                    required: {
                      value: true,
                      message: "Project_id is required",
                    },
                  })}
                />
                {errors.project_id && (
                  <span className="text-red-600 py-8">
                    {errors.project_id.message}
                  </span>
                )}
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="private_key_id"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Private Key ID
                </label>
                <input
                  type="text"
                  id="private_key_id"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Insert private_key_id"
                  {...register("private_key_id", {
                    required: {
                      value: true,
                      message: "Private Key ID is required",
                    },
                  })}
                />
                {errors.private_key_id && (
                  <span className="text-red-600 py-8">
                    {errors.private_key_id.message}
                  </span>
                )}
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="private_key"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Private Key
                </label>
                <textarea
                  id="private_key"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Insert private_key"
                  {...register("private_key", {
                    required: {
                      value: true,
                      message: "Private Key is required",
                    },
                  })}
                ></textarea>
                {errors.private_key && (
                  <span className="text-red-600 py-8">
                    {errors.private_key.message}
                  </span>
                )}
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="client_email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Client Email
                </label>
                <input
                  type="text"
                  id="client_email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Insert client_email"
                  {...register("client_email", {
                    required: {
                      value: true,
                      message: "Client Email is required",
                    },
                  })}
                />
                {errors.client_email && (
                  <span className="text-red-600 py-8">
                    {errors.client_email.message}
                  </span>
                )}
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="client_id"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Client ID
                </label>
                <input
                  type="text"
                  id="client_id"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Insert client_id"
                  {...register("client_id", {
                    required: {
                      value: true,
                      message: "Client ID is required",
                    },
                  })}
                />
                {errors.client_id && (
                  <span className="text-red-600 py-8">
                    {errors.client_id.message}
                  </span>
                )}
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="universe_domain"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Universe Domain
                </label>
                <input
                  type="text"
                  id="universe_domain"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Insert universe_domain"
                  {...register("universe_domain", {
                    required: {
                      value: true,
                      message: "Universe Domain is required",
                    },
                  })}
                />
                {errors.universe_domain && (
                  <span className="text-red-600 py-8">
                    {errors.universe_domain.message}
                  </span>
                )}
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="froot"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Folder Root ID
                </label>
                <input
                  type="text"
                  id="froot"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Insert froot"
                  {...register("froot", {
                    required: {
                      value: true,
                      message: "Folder Root is required",
                    },
                  })}
                />
                {errors.froot && (
                  <span className="text-red-600 py-8">
                    {errors.froot.message}
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
      </div>
    </ModalButton>
  );
}
