import {NavLink} from 'react-router-dom';
import '../styles/navigation.css';
import { notification } from '../contexts/notifyContext';
import { useContext} from 'react';

function Navigation({children})  {
    const {SUCCESS, ERROR, message} = useContext(notification);

    return (
        <div className="main-container">
            {SUCCESS && <span className="notify notification-success">{message} <i className="fa-solid fa-check"></i></span> }
            {ERROR && <span className="notify notification-error">{message} <i className="fa-solid fa-xmark"></i></span>}
            <h2 className="primary-heading">Clinic <span>Appointment</span> Management System</h2>
            <main>
                <nav className="main-navigation">
                    <NavLink to='/' className={({isActive}) => isActive && "active"}>dashboard</NavLink>
                    <NavLink to='/doctors_and_patients' className={({isActive}) => isActive && "active"}>doctors/patients</NavLink>
                    <NavLink to='/create_appointment' className={({isActive}) => isActive && "active"}>create appointment</NavLink>
                </nav>
                <section className="page-section">
                    {children}
                </section>
            </main>
        </div>
    )
}
export default Navigation;