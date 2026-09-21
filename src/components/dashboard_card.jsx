import '../styles/dashboard_card.css'

function DashboardCard({
    className,
    style,
    children
}) {
    return <span style={style} className={className}>
        {children}
    </span>
}
export default DashboardCard;