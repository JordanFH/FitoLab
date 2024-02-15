import Authenticated from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import Header from "@/Components/Header";

function Perfil({ mustVerifyEmail, status }) {
    return (
        <>
            <Head title="Perfil" />

            <div className="py-8">
                <div className="max-w-8xl mx-auto px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow rounded-lg">
                        <UpdatePasswordForm />
                    </div>

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow rounded-lg">
                        <DeleteUserForm />
                    </div>
                </div>
            </div>
        </>
    );
}

Perfil.layout = (page) => (
    <Authenticated
        auth={page.props.auth}
        errors={page.props.errors}
        header={<Header>Perfil</Header>}
        children={page}
    />
);

export default Perfil;
