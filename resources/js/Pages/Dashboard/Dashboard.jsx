import Header from "@/Components/Header";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

function Dashboard(props) {
    return (
        <>
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="max-w-8xl mx-auto px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            ¡Bienvenido {props.auth.user.name}!
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (page) => (
    <Authenticated
        auth={page.props.auth}
        errors={page.props.errors}
        header={<Header>Dashboard</Header>}
        children={page}
    />
);

export default Dashboard;
