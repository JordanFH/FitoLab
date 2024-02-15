import FlashMessages from "@/Components/FlashMessages";
import logo from "../../assets/images/ui/logo.png";
import { Link } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function Guest({ children }) {
    function useDarkSide() {
        const [theme, setTheme] = useState(
            localStorage.theme && localStorage.theme !== "null"
                ? localStorage.theme
                : window.matchMedia &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "dark"
                    : "light"
        );
        const colorTheme = theme === "dark" ? "light" : "dark";

        useEffect(() => {
            const root = window.document.documentElement;
            root.classList.remove(colorTheme);
            root.classList.add(theme);
            localStorage.setItem("theme", theme);
        }, [theme, colorTheme]);

        return [colorTheme, setTheme];
    }

    const [colorTheme, setTheme] = useDarkSide();
    const [darkSide, setDarkSide] = useState(colorTheme === "light");

    const handleLoad = () => {
        setDarkSide(true);
    };

    return (
        <>
            <FlashMessages />
            <div
                onLoad={handleLoad}
                className="min-h-screen flex flex-col justify-center items-center pt-0 bg-gray-100 dark:bg-gray-900"
            >
                <div>
                    <Link href="/">
                        <img
                            src={logo}
                            className="hover:scale-105 transition flex mx-auto py-4"
                            alt="Logo"
                            width="175px"
                        />
                        <h2 className="hover:underline text-xl text-center font-semibold text-gray-900 dark:text-white">
                            FitoLab
                        </h2>
                    </Link>
                </div>

                <div className="w-11/12 max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden rounded-lg">
                    {children}
                </div>
            </div>
        </>
    );
}
