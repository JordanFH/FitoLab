import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import Header from "@/Components/Header";
import BreadcrumbPage from "@/Components/BreadcrumbPage";

function Create() {
    const { data, setData, errors, post, processing } = useForm({
        nombre: "",
        tipo: "Producto",
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("categorias.store"));
    }

    return (
        <>
            <Head title="Categorías" />

            <div className="py-8">
                <div className="max-w-8xl mx-auto px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg">
                        <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <div className="flex items-center justify-start mb-6">
                                <BreadcrumbPage
                                    subtitle={{
                                        name: "Categorías",
                                        route: "categorias.index",
                                    }}
                                >
                                    Crear Categoría
                                </BreadcrumbPage>
                            </div>

                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="text-gray-900 dark:text-gray-100">
                                            Nombre
                                            <span className="text-red-500 ml-1">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            className="mt-1 w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-blue-500 dark:focus:border-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 rounded-md shadow-sm"
                                            label="Nombre"
                                            name="nombre"
                                            autoFocus
                                            value={data.nombre}
                                            onChange={(e) =>
                                                setData(
                                                    "nombre",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.nombre}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-gray-900 dark:text-gray-100">
                                            Tipo
                                            <span className="text-red-500 ml-1">
                                                *
                                            </span>
                                        </label>
                                        <select
                                            name="tipo"
                                            errors={errors.tipo}
                                            onChange={(e) =>
                                                setData("tipo", e.target.value)
                                            }
                                            value={data.tipo}
                                            className="mt-1 w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-blue-500 dark:focus:border-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 rounded-md shadow-sm"
                                        >
                                            <option value="Producto">
                                                Producto
                                            </option>
                                        </select>
                                        <InputError
                                            message={errors.tipo}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className={`px-6 py-2 font-bold text-white bg-green-500 hover:bg-green-600 rounded ${
                                            processing && "opacity-25"
                                        }`}
                                    >
                                        <FontAwesomeIcon icon={faSave} />
                                        <div className="ml-2 hidden sm:inline">
                                            Guardar
                                        </div>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Create.layout = (page) => (
    <Authenticated
        auth={page.props.auth}
        errors={page.props.errors}
        header={<Header>Crear Categoría</Header>}
        children={page}
    />
);

export default Create;
