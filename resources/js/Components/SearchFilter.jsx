import { useState, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";
import { usePrevious } from "react-use";
import pickBy from "lodash/pickBy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";

export default () => {
    const { filters } = usePage().props;

    const [values, setValues] = useState({
        search: filters.search || "",
    });

    const prevValues = usePrevious(values);

    function reset() {
        setValues({
            search: "",
        });
    }

    useEffect(() => {
        if (prevValues) {
            const query = {
                ...pickBy(values),
                sort: localStorage.getItem("sort"),
                direction: localStorage.getItem("direction"),
            };
            router.get(route(route().current()), query, {
                replace: true,
                preserveState: true,
            });
        }
    }, [values]);

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;

        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    return (
        <div className="flex items-center w-full max-w-screen-md">
            <div className="relative flex w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="w-4 h-4 text-gray-500 dark:text-gray-400 mx-4"
                    />
                </div>

                <input
                    className="block w-full px-10 ps-10 text-base text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    autoComplete="off"
                    type="text"
                    name="search"
                    value={values.search}
                    onChange={handleChange}
                    placeholder="Buscar..."
                />

                <div className="absolute inset-y-0 right-0 flex items-center ps-3">
                    <button
                        onClick={reset}
                        className="ml-3 text-base"
                        type="button"
                    >
                        <FontAwesomeIcon
                            icon={faTrash}
                            className="w-4 h-4 mx-4 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-100"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};
