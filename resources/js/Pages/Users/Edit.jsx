import React, { useState } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage, Link } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import InputError from "@/Components/InputError";
import BreadcrumbPage from "@/Components/BreadcrumbPage";
import DeleteModal from "@/Components/DeleteModal";
import Header from "@/Components/Header";

function Edit() {
    const { user, roles } = usePage().props;
    const {
        data,
        setData,
        put,
        errors,
        processing,
        delete: destroy,
    } = useForm({
        role: user.role || "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route("usuarios.update", user.id));
    }

    function handleDestroy() {
        destroy(route("usuarios.destroy", user.id));
    }

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <Head title="Usuarios" />

            <div className="py-8">
                <div className="max-w-8xl mx-auto px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg">
                        <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <div className="flex items-center justify-start mb-6">
                                <BreadcrumbPage
                                    subtitle={{
                                        name: "Usuarios",
                                        route: "usuarios.index",
                                    }}
                                >
                                    Editar Usuario
                                </BreadcrumbPage>
                            </div>

                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="text-gray-900 dark:text-gray-100">
                                            Rol a asignar a{" "}
                                            <b className="break-words text-blue-600 dark:text-blue-500">
                                                {user.name}
                                            </b>
                                            <span className="text-red-500 ml-1">
                                                *
                                            </span>
                                        </label>
                                        <select
                                            name="role"
                                            value={data.role}
                                            onChange={(e) =>
                                                setData("role", e.target.value)
                                            }
                                            className="mt-1 w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-blue-500 dark:focus:border-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 rounded-md shadow-sm"
                                        >
                                            <option value="">
                                                Selecciona un rol
                                            </option>{" "}
                                            {/* Opción en blanco */}
                                            {roles.map((role) => (
                                                <option key={role.id}>
                                                    {role.name}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError
                                            message={errors.role}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-between">
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
                                    <button
                                        onClick={() => {
                                            openModal();
                                        }}
                                        tabIndex="-1"
                                        type="button"
                                        className={`px-6 py-2 font-bold text-white bg-red-500 hover:bg-red-600 rounded ${
                                            processing && "opacity-25"
                                        }`}
                                    >
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                        <div className="ml-2 hidden sm:inline">
                                            Eliminar
                                        </div>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <DeleteModal
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                id={user.id}
                item={user.name}
                destroy={handleDestroy}
            />
        </>
    );
}

Edit.layout = (page) => (
    <Authenticated
        auth={page.props.auth}
        errors={page.props.errors}
        header={<Header>Editar Usuario</Header>}
        children={page}
    />
);

export default Edit;
