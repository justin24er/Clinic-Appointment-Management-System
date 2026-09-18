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
    onChange,
    pattern,
    title,
    name
}) {
    return <input
            type={type}
            value={value}
            className={className}
            ref={ref}
            id={id}
            title={title}
            name={name}
            placeholder={placeholder}
            maxLength={maxLength}
            pattern={pattern}
            autoComplete={autoComplete}
            onChange={onChange} />
}
export default Input;