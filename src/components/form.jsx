import '../styles/form.css'

function Form({
            children,
            onChange,
            className}) {
    return <form 
            action="#" 
            method="Post"
            onChange={onChange}
            className={className}
            >{children}</form>
}
export default Form;