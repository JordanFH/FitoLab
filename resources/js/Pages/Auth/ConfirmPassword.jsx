import { useEffect } from "react";
import Guest from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, useForm } from "@inertiajs/react";
import PasswordInput from "@/Components/PasswordInput";

function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("password.confirm"));
    };

    return (
        <>
            <Head title="Confirmar Contraseña" />

            <div className="mb-4 text-gray-600 dark:text-gray-400">
                Esta es un área segura de la aplicación. Por favor, confirme su
                contraseña antes de continuar.
            </div>

            <form onSubmit={submit}>
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Contraseña" />

                    <PasswordInput
                        name="password"
                        value={data.password}
                        onChange={handleOnChange}
                        autoFocus={true}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" disabled={processing}>
                        Confirmar
                    </PrimaryButton>
                </div>
            </form>
        </>
    );
}

ConfirmPassword.layout = (page) => <Guest children={page} />;

export default ConfirmPassword;
