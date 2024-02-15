import { useState, useEffect } from "react";
import { router, usePage } from "@inertiajs/react";
import { usePrevious } from "react-use";
import pickBy from "lodash/pickBy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";

function OrderBy({ sortOptions, currentRoute }) {
    const { filters } = usePage().props;

    const [values, setValues] = useState({
        sort: "created_at",
        direction: "desc",
    });

    const prevValues = usePrevious(values);

    useEffect(() => {
        const previousRoute = localStorage.getItem("currentRoute");

        if (previousRoute !== currentRoute) {
            localStorage.setItem("sort", "created_at");
            localStorage.setItem("direction", "desc");
            localStorage.setItem("currentRoute", currentRoute);
        }
    }, [currentRoute]);

    useEffect(() => {
        // Set initial values from localStorage if available
        const storedSort = localStorage.getItem("sort") || filters.sort;
        const storedDirection =
            localStorage.getItem("direction") || filters.direction;

        setValues({
            sort: storedSort || "created_at",
            direction: storedDirection || "desc",
        });
    }, []);

    useEffect(() => {
        if (prevValues) {
            const currentQuery = new URLSearchParams(window.location.search);
            const newQuery = pickBy(values);
            const mergedQuery = {
                ...Object.fromEntries(currentQuery),
                ...newQuery,
            };

            router.get(route(route().current()), mergedQuery, {
                replace: true,
                preserveState: true,
                preserveScroll: true,
            });
        }
    }, [values]);

    function reset() {
        setValues({
            sort: "created_at",
            direction: "desc",
        });
        localStorage.setItem("sort", "created_at");
        localStorage.setItem("direction", "desc");
    }

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;

        setValues((values) => ({
            ...values,
            [key]: value,
        }));
        localStorage.setItem(key, value);
    }

    return (
        <div className="flex items-center w-full max-w-screen-md mr-0 lg:mr-6 mb-6 lg:mb-0">
            <div className="relative flex w-full">
                <select
                    name="sort"
                    value={values.sort}
                    onChange={handleChange}
                    className="mr-2 w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-blue-500 dark:focus:border-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 rounded-md shadow-sm"
                >
                    {sortOptions &&
                        sortOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                </select>

                <select
                    name="direction"
                    value={values.direction}
                    onChange={handleChange}
                    className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-blue-500 dark:focus:border-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 rounded-md shadow-sm"
                >
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>

                <button
                    onClick={reset}
                    className="ml-3 text-base"
                    type="button"
                >
                    <FontAwesomeIcon
                        icon={faRefresh}
                        className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-100"
                    />
                </button>
            </div>
        </div>
    );
}

export default OrderBy;
