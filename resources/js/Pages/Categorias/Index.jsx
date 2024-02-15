import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Pagination from "@/Components/Pagination";
import SearchFilter from "@/Components/SearchFilter";
import { router } from "@inertiajs/react";
import OrderBy from "../../Components/OrderBy";
import Header from "@/Components/Header";
import BreadcrumbPage from "@/Components/BreadcrumbPage";
import formatDate from "@/Utils/formatDate";

function Index() {
    const { categorias } = usePage().props;
    const { data, links } = categorias;

    const sortOptions = [
        { value: "nombre", label: "Nombre" },
        { value: "tipo", label: "Tipo" },
        { value: "created_at", label: "Fecha de creación" },
        // { value: "updated_at", label: "Fecha de modificación" },
    ];

    return (
        <>
            <Head title="Categorías" />

            <div className="py-8">
                <div className="max-w-8xl mx-auto px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg">
                        <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <div className="flex items-center justify-between mb-6">
                                <BreadcrumbPage>Categorías</BreadcrumbPage>
                                <Link
                                    className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none hover:bg-green-600 lg:mb-0"
                                    href={route("categorias.create")}
                                >
                                    <FontAwesomeIcon icon={faPlus} beat />
                                    <div className="ml-2 hidden md:inline">
                                        Crear Categoría
                                    </div>
                                </Link>
                            </div>
                            <div className="flex flex-col lg:flex-row items-center justify-between mb-6">
                                <OrderBy sortOptions={sortOptions} currentRoute="categorias.index" />
                                <SearchFilter />
                            </div>

                            <div className="rounded-lg border border-gray-300 dark:border-gray-700 relative overflow-x-auto">
                                <table className="rounded-lg border-collapse lg:table-fixed w-full">
                                    <thead>
                                        <tr className="border-b border-gray-300 dark:border-gray-700 dark:bg-blue-300/75 bg-blue-200/75">
                                            <th className="text-start uppercase border-gray-300 dark:text-gray-100 px-4 py-3">
                                                Categoría
                                            </th>
                                            <th className="text-start uppercase border-gray-300 dark:text-gray-100 px-4 py-3">
                                                Tipo
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
                                                nombre,
                                                tipo,
                                                created_at,
                                            }) => (
                                                <tr
                                                    className="[&:not(:last-child)]:border-b dark:border-gray-700 border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                                                    key={id}
                                                    onClick={() =>
                                                        router.visit(
                                                            route(
                                                                "categorias.edit",
                                                                id
                                                            )
                                                        )
                                                    }
                                                >
                                                    <td className="truncate dark:border-gray-700 border-gray-300 px-4 py-4 text-gray-900 dark:text-gray-100">
                                                        {nombre}
                                                    </td>
                                                    <td className="truncate dark:border-gray-700 border-gray-300 px-4 py-4 text-gray-900 dark:text-gray-100">
                                                        {tipo}
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
                                                    className="px-4 py-4 text-center text-gray-900 dark:text-gray-100"
                                                    colSpan="3"
                                                >
                                                    No se encontraron
                                                    categorías.
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
        header={<Header>Categorías</Header>}
        children={page}
    />
);

export default Index;
