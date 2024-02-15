import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default () => {
    const { flash, errors } = usePage().props;
    const numOfErrors = Object.keys(errors).length;

    useEffect(() => {
        flash.success && toast.success(flash.success);
        flash.error && toast.error(flash.error);

        // if (flash.error || numOfErrors > 0) {
        //     toast.error(
        //         numOfErrors === 1
        //             ? "Existe un error en el formulario."
        //             : `Hay ${numOfErrors} errores en el formulario.`
        //     );
        // }
    }, [flash, errors]);

    // useEffect(() => {
    //     flash.success && toast.success(flash.success);
    // }, [flash]);

    return <Toaster />;
};
