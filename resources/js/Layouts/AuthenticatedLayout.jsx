import React, { useEffect, useState } from "react";
import logo from "../../assets/images/ui/logo.png";
import Dropdown from "@/Components/Dropdown";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import Switcher from "@/Components/DarkMode";
import AppLink from "@/Components/AppLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faClose,
    faHome,
    faTags,
    faUser,
    faUserGear,
    faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import NProgress from "nprogress";
import { Link } from "@inertiajs/react";
import { Tooltip } from "flowbite-react";
import FlashMessages from "@/Components/FlashMessages";

export default function Authenticated({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const [isSmallScreen, setIsSmallScreen] = useState(
        useMediaQuery({ maxDeviceWidth: 639 })
    );

    const [isPanelOpen, setIsPanelOpen] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 639px)");
        setIsSmallScreen(mediaQuery.matches);
        const handler = () => setIsSmallScreen(mediaQuery.matches);
        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    const handlePanelOpen = () => {
        setIsPanelOpen(true);
    };

    const handlePanelClose = () => {
        setIsPanelOpen(false);
    };

    useEffect(() => {
        function handleLoad() {
            if (isSmallScreen) {
                setIsPanelOpen(false);
            } else {
                setIsPanelOpen(true);
            }
        }

        window.addEventListener("load", handleLoad);
    });

    let progressTimeout;

    function stopProgress() {
        clearTimeout(progressTimeout); // Limpiar el tiempo de espera
        NProgress.done(); // Ocultar la barra de progreso
    }

    useEffect(() => {
        // Simular un retraso en la carga
        setTimeout(() => {
            stopProgress();
        }, 250); // Establecer un tiempo de espera de 3 segundos (solo para fines de demostración)
    }, []);

    const initialShowSpan =
        localStorage.getItem("showSpan") === "false" ? false : true;
    const [showSpan, setShowSpan] = useState(initialShowSpan);

    // Guardar en localStorage el estado de showSpan
    useEffect(() => {
        localStorage.setItem("showSpan", showSpan);
    }, [showSpan]);

    const toggleSpan = () => setShowSpan(!showSpan);

    // Sidebar menu items

    function isUser() {
        if (auth.user) {
            if (auth.user.roles && auth.user.roles[0]) {
                if (auth.user.roles[0].name === "User") {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }

    function isEditorOrSuper() {
        if (auth.user) {
            if (auth.user.roles && auth.user.roles[0]) {
                if (
                    auth.user.roles[0].name === "Editor" ||
                    auth.user.roles[0].name === "SuperAdmin"
                ) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }

    function isSuperAdmin() {
        if (auth.user) {
            if (auth.user.roles && auth.user.roles[0]) {
                if (auth.user.roles[0].name === "SuperAdmin") {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }

    const userItems = [
        { href: route("dashboard"), icon: faHome, text: "Dashboard" },
    ];

    const editorItems = [
        { href: route("dashboard"), icon: faHome, text: "Dashboard" },
        { href: route("categorias.index"), icon: faTags, text: "Categorías" },
    ];

    const superAdminItems = [
        { href: route("usuarios.index"), icon: faUserGroup, text: "Usuarios" },
        { href: route("roles.index"), icon: faUserGear, text: "Roles" },
    ];

    // eliminar clase w-fit de data-testid="flowbite-tooltip-target" con useEffect
    useEffect(() => {
        const tooltipTarget = document.querySelectorAll(
            "[data-testid='flowbite-tooltip-target']"
        );
        tooltipTarget.forEach((element) => {
            element.classList.remove("w-fit");
        });
    });

    const ListItem = ({ items, checkFunction }) => {
        return (
            checkFunction() &&
            items.length > 0 && (
                <>
                    {items.map((item, index) => (
                        <li key={index}>
                            <AppLink
                                href={item.href}
                                active={route()
                                    .current()
                                    .includes(
                                        item.text
                                            .toLowerCase()
                                            .normalize("NFD")
                                            .replace(/[\u0300-\u036f]/g, "")
                                    )}
                            >
                                <Tooltip
                                    content={item.text}
                                    placement="right"
                                    className={`ml-5 ${
                                        isSmallScreen
                                            ? "hidden"
                                            : showSpan
                                            ? "hidden"
                                            : "inline"
                                    }`}
                                >
                                    <FontAwesomeIcon
                                        icon={item.icon}
                                        className={`text-xl text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white w-6 h-6`}
                                    />
                                </Tooltip>
                                <span
                                    className={`ml-3 ${
                                        isSmallScreen
                                            ? "inline"
                                            : showSpan
                                            ? "inline"
                                            : "hidden"
                                    }`}
                                >
                                    {item.text}
                                </span>
                            </AppLink>
                        </li>
                    ))}
                </>
            )
        );
    };

    return (
        <>
            <FlashMessages />
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                <nav
                    className={`bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 ${
                        showSpan ? "sm:ml-64" : "sm:ml-16"
                    }`}
                >
                    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="flex items-center justify-start">
                                    <button
                                        type="button"
                                        onClick={
                                            isSmallScreen
                                                ? handlePanelOpen
                                                : toggleSpan
                                        }
                                        className={`inline-flex items-center justify-center rounded-md text-gray-800 dark:text-white focus:outline-none transition duration-150 ease-in-out sm:p-0 p-2 ${
                                            isSmallScreen
                                                ? "hover:bg-gray-300 dark:hover:bg-gray-900 focus:bg-gray-300 dark:focus:bg-gray-900"
                                                : "sm:bg-transparent"
                                        }`}
                                    >
                                        <span className="sr-only">
                                            Toggle Span
                                        </span>
                                        <FontAwesomeIcon
                                            icon={faBars}
                                            className="text-2xl sm:p-0 p-1"
                                        />
                                    </button>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="mr-4 hidden sm:flex sm:items-center sm:ml-6">
                                    <div className="ml-3 relative">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
                                                    >
                                                        {auth.user.name}

                                                        <svg
                                                            className="ml-2 -mr-0.5 h-4 w-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link
                                                    href={route("perfil.edit")}
                                                >
                                                    Perfil
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route("logout")}
                                                    method="post"
                                                    as="button"
                                                >
                                                    Cerrar Sesión
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </div>
                                <Switcher />
                            </div>

                            <div className="flex items-center sm:hidden">
                                <button
                                    onClick={() =>
                                        setShowingNavigationDropdown(
                                            (previousState) => !previousState
                                        )
                                    }
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-300 dark:focus:bg-gray-900 transition duration-150 ease-in-out"
                                >
                                    <FontAwesomeIcon
                                        icon={faUser}
                                        className="p-1 text-2xl"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className={
                            (showingNavigationDropdown ? "block" : "hidden") +
                            " sm:hidden"
                        }
                    >
                        <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                            <div className="px-4">
                                <div className="font-medium text-base text-gray-800 dark:text-gray-200">
                                    {auth.user.name}
                                </div>
                                <div className="font-medium text-sm text-gray-500">
                                    {auth.user.email}
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink
                                    href={route("perfil.edit")}
                                    active={route().current("perfil.edit")}
                                >
                                    Perfil
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route("logout")}
                                    active={route().current("logout")}
                                    as="button"
                                >
                                    Cerrar Sesión
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </nav>

                {isPanelOpen && (
                    <div
                        className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={handlePanelClose}
                        aria-hidden="true"
                    ></div>
                )}

                {(!isSmallScreen || isPanelOpen) && (
                    <React.Fragment>
                        <aside
                            id="logo-sidebar"
                            className={`fixed top-0 left-0 z-40 h-screen sm:pt-0 pt-5 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 ${
                                isSmallScreen && !isPanelOpen
                                    ? "-translate-x-full"
                                    : ""
                            } ${
                                isSmallScreen
                                    ? "w-64"
                                    : showSpan
                                    ? "w-64"
                                    : "w-16"
                            }`}
                            aria-label="Sidebar"
                        >
                            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                                <div className="flex justify-between items-center mb-5">
                                    <Link
                                        href="/"
                                        className="flex justify-between sm:mt-5 mt-0 md:mr-24"
                                    >
                                        <Tooltip
                                            content="Inicio"
                                            placement="right"
                                            className={`ml-3 ${
                                                isSmallScreen
                                                    ? "hidden"
                                                    : showSpan
                                                    ? "hidden"
                                                    : "inline"
                                            }`}
                                        >
                                            <img
                                                src={logo}
                                                className=""
                                                style={{
                                                    minWidth: "40px",
                                                    maxWidth: "40px",
                                                    minHeight: "40px",
                                                    maxHeight: "40px",
                                                }}
                                                alt="Logo"
                                            />
                                        </Tooltip>
                                        <span
                                            className={
                                                `self-center text-lg sm:text-xl font-semibold whitespace-nowrap dark:text-white ml-3 ${
                                                    isSmallScreen
                                                        ? "inline"
                                                        : showSpan
                                                        ? "inline"
                                                        : "hidden"
                                                }` + " hover:underline"
                                            }
                                        >
                                            FitoLab
                                        </span>
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={handlePanelClose}
                                        className="sm:hidden flex items-center justify-center rounded-md text-gray-800 dark:text-white focus:outline-none focus:bg-gray-300 dark:focus:bg-gray-900 transition duration-150 ease-in-out"
                                    >
                                        <span className="sr-only">
                                            Cerrar Panel
                                        </span>
                                        <FontAwesomeIcon
                                            icon={faClose}
                                            className="text-2xl"
                                        />
                                    </button>
                                </div>

                                <ul className="space-y-2">
                                    <ListItem
                                        items={userItems}
                                        checkFunction={isUser}
                                    />
                                    <ListItem
                                        items={editorItems}
                                        checkFunction={isEditorOrSuper}
                                    />
                                    {isSuperAdmin() &&
                                        superAdminItems.length > 0 && (
                                            <hr className="border-gray-800 dark:border-gray-400" />
                                        )}
                                    <ListItem
                                        items={superAdminItems}
                                        checkFunction={isSuperAdmin}
                                    />
                                </ul>
                            </div>
                        </aside>
                    </React.Fragment>
                )}

                {header && (
                    <header
                        className={`bg-white dark:bg-gray-800 shadow ${
                            showSpan ? "sm:ml-64" : "sm:ml-16"
                        }`}
                    >
                        <div className="max-w-8xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <main className={`${showSpan ? "sm:ml-64" : "sm:ml-16"}`}>
                    {children}
                </main>
            </div>
        </>
    );
}
