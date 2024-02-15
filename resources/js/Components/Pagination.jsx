import React from "react";
import { Link } from "@inertiajs/react";
import classNames from "classnames";

const PageLink = ({ active, label, url }) => {
    const className = classNames(
        [
            "mr-1 mb-1",
            "px-3 py-2",
            "border border-solid border-blue-400/75 rounded",
            "dark:border-blue-300/75",
            "text-sm font-black",
            "hover:bg-blue-400/75 hover:dark:bg-blue-300/75",
            "hover:text-white hover:dark:text-white",
            "dark:text-white",
            "dark:bg-gray-800",
        ],
        {
            "bg-blue-400/75 dark:bg-blue-300/75 text-white dark:text-white": active,
        }
    );
    return (
        <Link className={className} href={url}>
            <span dangerouslySetInnerHTML={{ __html: label }}></span>
        </Link>
    );
};

// Previous, if on first page
// Next, if on last page
// and dots, if exists (...)
const PageInactive = ({ label }) => {
    const className = classNames(
        "mr-1 mb-1 px-3 py-2 text-sm font-black border rounded border-solid border-gray-400 dark:border-gray-600 text-gray-400 dark:text-gray-400"
    );
    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: label }}
        />
    );
};

export default ({ links = [] }) => {
    // dont render, if there's only 1 page (previous, 1, next)
    if (links.length === 3) return null;
    return (
        <div className="flex flex-wrap mt-6 -mb-1">
            {links.map(({ active, label, url }) => {
                return url === null ? (
                    <PageInactive key={label} label={label} />
                ) : (
                    <PageLink
                        key={label}
                        label={label}
                        active={active}
                        url={url}
                    />
                );
            })}
        </div>
    );
};
