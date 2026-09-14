import '../styles/dashboard_card.css'

function DashboardCard({
    className,
    children
}) {
    return <span className={className}>
        {children}
    </span>
}
export default DashboardCard;