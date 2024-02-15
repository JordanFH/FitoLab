export default function Checkbox({ className = "", ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                "rounded border-gray-500 dark:border-gray-700 text-blue-600 dark:text-blue-500 shadow-sm focus:ring-blue-600 dark:focus:ring-blue-500 dark:focus:ring-offset-gray-800 " +
                className
            }
        />
    );
}
