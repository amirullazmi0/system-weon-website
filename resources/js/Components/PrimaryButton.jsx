export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `w-full px-4 py-2 bg-sky-500 rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sky-600 focus:bg-sky-600 active:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
