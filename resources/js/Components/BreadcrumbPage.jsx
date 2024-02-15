import { Link } from "@inertiajs/react";
import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function BreadcrumbPage({ subtitle = { name: "", route: "" }, children }) {
    const subtitleRoute = subtitle.route ? route(subtitle.route) : "";

    return (
        <Breadcrumb className="py-3">
            <BreadcrumbItem href="#">
                <Link href={route("dashboard")}>
                    <FontAwesomeIcon icon={faHome} />
                    <span className="ml-1 hidden sm:inline">Dashboard</span>
                </Link>
            </BreadcrumbItem>
            {subtitle.name && (
                <BreadcrumbItem href="#">
                    <Link href={subtitleRoute}>{subtitle.name}</Link>
                </BreadcrumbItem>
            )}
            <BreadcrumbItem>{children}</BreadcrumbItem>
        </Breadcrumb>
    );
}

export default BreadcrumbPage;
