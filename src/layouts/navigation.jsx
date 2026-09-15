import {Link} from 'react-router-dom';
import '../styles/navigation.css';
import { notification } from '../contexts/notifyContext';
import { useContext } from 'react';

function Navigation({children})  {
    const {SUCCESS, ERROR, message} = useContext(notification);

    return (
        <div className="main-container">
            <div className="page-notification">
                {SUCCESS && <span className="notification-success">{message}</span> }
                {ERROR && <span className="notification-error">{message}</span>}
            </div>
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