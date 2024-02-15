import React, { useState, useEffect } from "react";
import { Password } from "primereact/password";
// import Switcher from "./DarkMode";

function PasswordInput(props) {
    const [isFocused, setIsFocused] = useState(false);
    const [isDark, setIsDark] = useState(
        document.documentElement.classList.contains("dark")
    );

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains("dark"));

        let isMounted = true;

        const observer = new MutationObserver(() => {
            if (isMounted) {
                setIsDark(document.documentElement.classList.contains("dark"));
            }
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => {
            isMounted = false;
            observer.disconnect();
        };
    }, []);

    const tailwindStyles = {
        transition: "none",
        width: "100%",
        height: "42px",
        padding: ".5rem .75rem",
        fontSize: "1rem",
        fontWeight: "400",
        lineHeight: "1.5",
        color: isDark ? "#d1d5db" : "#000",
        backgroundColor: isDark ? "#111827" : "#fff",
        backgroundClip: "padding-box",
        border: `solid 1px ${
            isFocused
                ? isDark
                    ? "#2563eb"
                    : "#3b82f6"
                : isDark
                ? "#374151"
                : "#d1d5db"
        }`,
        outline: `solid 1px ${
            isFocused ? (isDark ? "#2563eb" : "#3b82f6") : "transparent"
        }`,
        borderRadius: "0.375rem",
        boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    };

    return (
        <>
            <Password
                {...props}
                onFocus={handleFocus}
                onBlur={handleBlur}
                toggleMask
                feedback={false}
                className={`mt-1 block w-full`}
                inputStyle={{
                    ...tailwindStyles,
                }}
            />
            {/* <Switcher /> */}
        </>
    );
}

export default PasswordInput;
