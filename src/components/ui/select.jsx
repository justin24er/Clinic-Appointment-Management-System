import '../../styles/select.css'

function Select({
    className,
    value,
    onChange,
    children
}) {
    return <select 
                className={className}
                value={value}
                onChange={onChange}>{children}</select>
}
export default Select;