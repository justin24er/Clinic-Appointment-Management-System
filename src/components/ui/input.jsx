import '../../styles/input.css'

function Input({
    type,
    value,
    className,
    id,
    placeholder,
    maxLength,
    autoComplete,
    onChange
}) {
    return <input
            type={type}
            value={value}
            className={className}
            id={id}
            placeholder={placeholder}
            maxLength={maxLength}
            autoComplete={autoComplete}
            onChange={onChange} />
}
export default Input;