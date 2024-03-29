import {useRef, useState} from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import {useForm} from '@inertiajs/react';
import PasswordInput from '@/Components/PasswordInput';

export default function DeleteUserForm({className}) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('perfil.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Eliminar Cuenta</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Una vez que se elimine su cuenta, todos sus recursos y datos se eliminarán permanentemente. Antes de
                    eliminar su cuenta, descargue cualquier dato o información que desee conservar.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>Eliminar cuenta</DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        ¿Está seguro de que desea eliminar su cuenta?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Una vez que se elimine su cuenta, todos sus recursos y datos se eliminarán permanentemente.
                        Introduce tu contraseña para confirmar que deseas eliminar permanentemente tu cuenta.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Password" className="sr-only"/>

                        <PasswordInput
                            name="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            autoFocus={true}
                            placeholder="Contraseña"
                        />

                        <InputError message={errors.password} className="mt-2"/>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>

                        <DangerButton className="ml-3" disabled={processing}>
                            Eliminar cuenta
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
