import BreadcrumbPage from "@/Components/BreadcrumbPage";
import Header from "@/Components/Header";
import OrderBy from "@/Components/OrderBy";
import Pagination from "@/Components/Pagination";
import SearchFilter from "@/Components/SearchFilter";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import formatDate from "@/Utils/formatDate";
import { Head, router, usePage } from "@inertiajs/react";

function Index() {
    const { users } = usePage().props;
    const { data, links } = users;

    const sortOptions = [
        { value: "name", label: "Nombre" },
        { value: "email", label: "Correo" },
        { value: "created_at", label: "Fecha de creación" },
        // { value: "updated_at", label: "Fecha de modificación" },
    ];

    return (
        <>
            <Head title="Usuarios" />

            <div className="py-8">
                <div className="max-w-8xl mx-auto px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg">
                        <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <div className="flex items-center justify-start mb-6">
                                <BreadcrumbPage>Usuarios</BreadcrumbPage>
                            </div>
                            <div className="flex flex-col lg:flex-row items-center justify-between mb-6">
                                <OrderBy
                                    sortOptions={sortOptions}
                                    currentRoute="usuarios.index"
                                />
                                <SearchFilter />
                            </div>

                            <div className="rounded-lg border border-gray-300 dark:border-gray-700 relative overflow-x-auto">
                                <table className="rounded-lg border-collapse lg:table-fixed w-full">
                                    <thead>
                                        <tr className="border-b border-gray-300 dark:border-gray-700 dark:bg-blue-300/75 bg-blue-200/75">
                                            <th className="text-start uppercase truncate border-gray-300 dark:text-gray-100 px-4 py-3">
                                                Usuario
                                            </th>
                                            <th className="text-start uppercase truncate border-gray-300 dark:text-gray-100 px-4 py-3">
                                                Email
                                            </th>
                                            <th className="text-center uppercase truncate border-gray-300 dark:text-gray-100 px-4 py-3">
                                                Rol
                                            </th>
                                            <th className="text-center uppercase border-gray-300 dark:text-gray-100 px-4 py-3">
                                                Fecha de creación
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map(
                                            ({
                                                id,
                                                name,
                                                email,
                                                roles,
                                                created_at,
                                            }) => (
                                                <tr
                                                    className="[&:not(:last-child)]:border-b dark:border-gray-700 border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                                                    key={id}
                                                    onClick={() =>
                                                        router.visit(
                                                            route(
                                                                "usuarios.edit",
                                                                id
                                                            )
                                                        )
                                                    }
                                                >
                                                    <td className="truncate dark:border-gray-700 border-gray-300 px-4 py-4 text-gray-900 dark:text-gray-100">
                                                        {name}
                                                    </td>
                                                    <td className="truncate dark:border-gray-700 border-gray-300 px-4 py-4 text-gray-900 dark:text-gray-100">
                                                        {email}
                                                    </td>
                                                    <td className="truncate text-center dark:border-gray-700 border-gray-300 px-4 py-4 text-gray-900 dark:text-gray-100">
                                                        {roles.map(
                                                            (
                                                                { name },
                                                                index
                                                            ) => (
                                                                <span
                                                                    key={index}
                                                                    className="inline-flex items-center justify-center px-2 py-1 text-sm font-bold leading-none text-white bg-green-600 rounded-full"
                                                                >
                                                                    {name}
                                                                </span>
                                                            )
                                                        )}
                                                    </td>
                                                    <td className="text-center truncate dark:border-gray-700 border-gray-300 px-4 py-4 text-gray-900 dark:text-gray-100">
                                                        {formatDate(created_at)}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                        {data.length === 0 && (
                                            <tr>
                                                <td
                                                    className="px-6 py-4 text-center px-4 py-2 text-gray-900 dark:text-gray-100"
                                                    colSpan="4"
                                                >
                                                    No se encontraron usuarios.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={links} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Index.layout = (page) => (
    <Authenticated
        auth={page.props.auth}
        errors={page.props.errors}
        header={<Header>Usuarios</Header>}
        children={page}
    />
);

export default Index;
