import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./Modal";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const DeleteModal = ({
    isModalOpen,
    closeModal,
    item,
    destroy,
    processing,
}) => {
    return (
        <Modal show={isModalOpen} onClose={closeModal}>
            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <FontAwesomeIcon
                            icon={faTrashAlt}
                            className="text-red-700"
                        />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Eliminar:{" "}
                            <b className="break-words text-red-500">
                                "{item}"
                            </b>
                        </h3>
                        <div className="mt-2">
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                ¿Está seguro de que desea eliminar este elemento?
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-4 py-3 pb-4 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                    onClick={() => {
                        if (!processing) {
                            destroy();
                        }
                    }}
                    disabled={processing}
                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm ${
                        processing && "opacity-25"
                    }`}
                    tabIndex="-1"
                >
                    Eliminar
                </button>
                <button
                    onClick={() => {
                        closeModal();
                    }}
                    tabIndex="1"
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                    Cancelar
                </button>
            </div>
        </Modal>
    );
};

export default DeleteModal;
