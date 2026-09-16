import '../styles/form.css'

function Form({
            children,
            onSubmit,
            className}) {
    return <form 
            action="#" 
            method="Post"
            onSubmit={onSubmit}
            className={className}
            >{children}</form>
}
export default Form;