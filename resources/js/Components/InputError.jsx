export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p {...props} className={'text-sm text-errors ' + className}>
            {message}
        </p>
    ) : null;
}
