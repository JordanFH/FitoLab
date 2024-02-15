import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import Guest from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import PasswordInput from "@/Components/PasswordInput";

function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <>
            <Head title="Iniciar Sesión" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Correo Electrónico" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={handleOnChange}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Contraseña" />

                    <PasswordInput
                        name="password"
                        value={data.password}
                        onChange={handleOnChange}
                        autoComplete="current-password"
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="sm:flex block justify-between mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            value={data.remember}
                            onChange={handleOnChange}
                        />
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                            Recuérdame
                        </span>
                    </label>
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="flex mt-4 sm:mt-0 underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    )}
                </div>

                <div className="flex items-center mt-6">
                    <PrimaryButton className="w-full" disabled={processing}>
                        Iniciar Sesión
                    </PrimaryButton>
                </div>
                <div className="flex items-center mt-4">
                    <Link
                        className="px-5 py-2 mx-auto w-full flex items-center items-center justify-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 false"
                        href={route("registro")}
                    >
                        Registrarse
                    </Link>
                </div>
            </form>
        </>
    );
}

Login.layout = (page) => <Guest children={page} />;

export default Login;
