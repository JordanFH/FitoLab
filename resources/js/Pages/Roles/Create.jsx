import React, { useState } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link, usePage } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import Checkbox from "@/Components/Checkbox";
import Header from "@/Components/Header";
import BreadcrumbPage from "@/Components/BreadcrumbPage";

function Create() {
    const { permissions } = usePage().props;
    const { data, setData, errors, post, processing } = useForm({
        permissions: [],
        name: "",
    });
    const [permisosSeleccionados, setPermisosSeleccionados] = useState([]);

    const handleCheckboxChange = (permiso) => {
        // Verifica si el permiso ya está en la lista de seleccionados
        if (permisosSeleccionados.includes(permiso)) {
            // Si ya está, lo eliminamos
            setPermisosSeleccionados(
                permisosSeleccionados.filter((p) => p !== permiso)
            );
            setData(
                "permissions",
                permisosSeleccionados.filter((p) => p !== permiso)
            );
        } else {
            // Si no está, lo agregamos
            setPermisosSeleccionados([...permisosSeleccionados, permiso]);
            setData("permissions", [...permisosSeleccionados, permiso]);
        }
    };

    function groupPermissions(permissions) {
        const excludedPermissions = ["perfil.edit", "perfil.destroy"];

        const groupedPermissions = {};

        permissions.forEach((permission) => {
            let category = permission.description.split(" ");

            if (category.length >= 2) {
                category = category[1];
            }

            if (!excludedPermissions.includes(permission.name)) {
                if (!groupedPermissions[category]) {
                    groupedPermissions[category] = [];
                }

                groupedPermissions[category].push(permission);
            }
        });

        return groupedPermissions;
    }

    function handleSubmit(e) {
        e.preventDefault();
        post(route("roles.store"));
    }

    return (
        <>
            <Head title="Roles" />

            <div className="py-8">
                <div className="max-w-8xl mx-auto px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg">
                        <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <div className="flex items-center justify-start mb-6">
                                <BreadcrumbPage
                                    subtitle={{
                                        name: "Roles",
                                        route: "roles.index",
                                    }}
                                >
                                    Crear Rol
                                </BreadcrumbPage>
                            </div>

                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="text-gray-900 dark:text-gray-100">
                                            Nombre del rol
                                            <span className="text-red-500 ml-1">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            className="mt-1 w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-blue-500 dark:focus:border-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 rounded-md shadow-sm"
                                            label="name"
                                            name="name"
                                            autoFocus
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                        />
                                        <InputError
                                            message={errors.name}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="text-gray-900 dark:text-gray-100">
                                            Listas de Permisos:
                                            <span className="text-red-500 ml-1">
                                                *
                                            </span>
                                        </label>
                                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid-flow-row gap-4">
                                            {Object.entries(
                                                groupPermissions(permissions)
                                            ).map(([category, permissions]) => (
                                                <div key={category}>
                                                    <br />
                                                    <b className="text-blue-600 dark:text-blue-500">
                                                        {category}
                                                    </b>
                                                    {permissions.map(
                                                        (permission) => (
                                                            <li
                                                                key={
                                                                    permission.id
                                                                }
                                                                className="text-gray-900 dark:text-gray-100 list-none mt-2"
                                                            >
                                                                <label>
                                                                    <Checkbox
                                                                        value={
                                                                            permission.id
                                                                        }
                                                                        checked={permisosSeleccionados.includes(
                                                                            permission.id
                                                                        )}
                                                                        onChange={() =>
                                                                            handleCheckboxChange(
                                                                                permission.id
                                                                            )
                                                                        }
                                                                        className="mr-2"
                                                                    />
                                                                    {
                                                                        permission.description
                                                                    }
                                                                </label>
                                                            </li>
                                                        )
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <InputError
                                        message={errors.permissions}
                                        className="mt-2"
                                    />
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
        header={<Header>Crear Rol</Header>}
        children={page}
    />
);

export default Create;
