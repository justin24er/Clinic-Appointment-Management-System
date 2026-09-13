import {Link} from 'react-router-dom';
import '../styles/navigation.css';

function Navigation({children})  {
    return (
        <div className="main-container">
            <h2 className="primary-heading">Clinic Appointment Management System</h2>
            <main>
                <nav className="main-navigation">
                    <Link to='/' className="dashboard-nav">dashboard</Link>
                    <Link to='/doctors_and_patients' className="dashboard-nav">doctors/patients</Link>
                    <Link to='/create_appointment' className="dashboard-nav">create appointment</Link>
                </nav>
                <section className="page-section">
                    {children}
                </section>
            </main>
        </div>
    )
}
export default Navigation;