import {useState} from 'react'
import useAppointments from '../hooks/useAppointments' 
import '../styles/dashboard.css'
import Select from '../components/ui/select'
import Button from '../components/ui/button'
import Input from '../components/ui/input'
import DashboardCard from '../components/dashboard_card'
import Table from '../components/table'

function Dashboard()  {
    const {appointments,
          loadingAppts,
          errorAppts,
          addAppointment,
          cancelAppointment,
          editAppointment,
          removeAppointment
        } = useAppointments()

    const [name, setName] = useState("")
    const [selectSearch, setSelectSearch] = useState("")
    const [selectFilter, setSelectFilter] = useState("")

    return (
        <section className="dashboard-container">
            <div className="dashboard-header">
                <div className="dash-cards">
                    <DashboardCard className="card a">
                        <p class="card-title">Total Appointments</p>
                        <p class="card-value">{appointments.length || 0}</p>
                    </DashboardCard>
                    <DashboardCard className="card b">
                        <p class="card-title">Scheduled</p>
                        <p class="card-value">{appointments
                                                .filter(appt => appt.status === "scheduled")
                                                .length || 0}</p>
                    </DashboardCard>
                    <DashboardCard className="card c">
                        <p class="card-title">Confirmed</p>
                        <p class="card-value">{appointments
                                                .filter(appt => appt.status === "confirmed")
                                                .length || 0}</p>
                    </DashboardCard>
                    <DashboardCard className="card d">
                        <p class="card-title">Completed</p>
                        <p class="card-value">{appointments
                                                .filter(appt => appt.status === "completed")
                                                .length || 0}</p>
                    </DashboardCard>
                    <DashboardCard className="card e">
                        <p class="card-title">Cancelled</p>
                        <p class="card-value">{appointments
                                                .filter(appt => appt.status === "cancelled")
                                                .length || 0}</p>
                    </DashboardCard>
                </div>
                <div className="dash-controlls">
                    <div className="filter-controll">
                        <span>filter <i className="fa-solid fa-filter"></i></span>
                        <Select
                            className="filter-select"
                            value={selectFilter}
                            onChange={(e) => setSelectFilter(e.target.value)}>
                            <Button className="select-btn"><i className="fa-solid fa-chevron-down"></i></Button>
                            <option value="All">All</option>
                            <option value="Scheduled">Scheduled</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </Select>
                    </div>
                    <div className="search-controll">
                        <span>Search by</span>
                        <Select 
                            className="search-select"
                            value={selectSearch}
                            onChange={(e) => setSelectSearch(e.target.value)}>
                            <Button className="select-btn"><i class="fa-solid fa-chevron-down"></i></Button>
                            <option value="Patient name">Patient name</option>
                            <option value="Doctor name">Doctor name</option>
                        </Select>
                        <label htmlFor="search">
                            <span><i class="fa-solid fa-magnifying-glass"></i></span>
                            <Input
                                className="search-input"
                                type="text"
                                placeholder="Search..."
                                maxLength="30"
                                autoComplete="off"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                 />
                        </label>
                    </div>
                </div>
            </div>

            <div className="dashboard-body">
                <Table className="appointments-table">
                    <th>
                        <td>Edit</td>
                        <td>Date</td>
                        <td>Time</td>
                        <td>Doctor</td>
                        <td>Patient</td>
                        <td>Reason</td>
                        <td>Status</td>
                        <td>Delete</td>
                    </th>
                    
                </Table>
            </div>
        </section>
    )
}
export default Dashboard;