import '../../styles/input.css'

function Input({
    type,
    value,
    className,
    id,
    placeholder,
    maxLength,
    autoComplete,
    ref,
    onChange
}) {
    return <input
            type={type}
            value={value}
            className={className}
            ref={ref}
            id={id}
            placeholder={placeholder}
            maxLength={maxLength}
            autoComplete={autoComplete}
            onChange={onChange} />
}
export default Input;