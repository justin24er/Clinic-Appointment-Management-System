import '../../styles/button.css'

function Button({
    className,
    type,
    onClick,
    children
}) {
    return <button 
                onClick={onClick} 
                type={type} 
                className={className}
            >{children}</button>
}
export default Button