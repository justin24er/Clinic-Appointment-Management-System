import '../styles/table.css'

function Table({
    children,
    className}) {
    return (
        <table className={className}>
            {children}
        </table>
    )
}
export default Table