const Header = ({ children }) => {
    return (
        <h2 className="relative sm:ml-0 ml-3 font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {children}
        </h2>
    );
};

export default Header;
