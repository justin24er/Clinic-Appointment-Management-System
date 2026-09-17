import {useState,useEffect,useContext,useRef} from 'react'
import useAppointments from '../hooks/useAppointments' 
import useDoctors from '../hooks/useDoctors'
import usePatients from '../hooks/usePatients'
import '../styles/dashboard.css'
import Select from '../components/ui/select'
import Button from '../components/ui/button'
import Input from '../components/ui/input'
import DashboardCard from '../components/dashboard_card'
import Table from '../components/table'
import Form from '../components/form'
import { notification } from '../contexts/notifyContext'

function Dashboard()  {
    const {appointments,
          loadingAppts,
          errorAppts,
          cancelAppointment,
          editAppointment,
          removeAppointment,
          restoreAppointment
        } = useAppointments()
   
    const {doctors}  = useDoctors();
    const {patients} = usePatients();

    const [searchName, setSearchName] = useState("")
    const [selectSearch, setSelectSearch] = useState("Patient name")
    const [selectFilter, setSelectFilter] = useState("All")

    const [fdate, setFdate] = useState("")
    const [ftime, setFtime] = useState("")
    const [freason, setFreason] = useState("")
    const [dr, setDr] = useState("")
    const [fstatus, setFstatus] = useState("");
    const [formContainer, setFormContainer] = useState(false)
    const [formSuccess, setFormSuccess] = useState("")
    const [formError, setFormError] = useState("")
    const [apptId, setApptId] = useState("")
    

    const appointSearch = useRef();
    const [filter, setFilter] = useState(appointments)
    
    useEffect(() => {
        if(selectFilter === 'All') {
            setFilter(appointments)
        }else {
            setFilter(appointments.filter(appt => appt.status === selectFilter))
        }
    },[selectFilter,appointments])

    useEffect(() => {
        appointSearch.current.focus()
        const trimed_name = searchName.trim().toLowerCase();
        if(selectSearch === "Patient name" && trimed_name) {
            const pat_ids = patients.map(pat => pat.name
                                                .trim()
                                                .toLowerCase()
                                                .includes(trimed_name)
                                                && pat.id)
                                                .filter(id => id!==false)
            if(pat_ids.length > 0) {
                const apptSearchResult = appointments.filter(appt => pat_ids.includes(appt.patientId))
                console.log(apptSearchResult)
            }
            /* if(patients.some(pat => pat.name.trim().toLowerCase() === trimed_name)) {
                const pat_ids = patients.map(pat => pat.name.toLowerCase().trim() === trimed_name && pat.id)
                const searched_appts = appointments.filter(appt => pat_ids.includes(appt.patientId))
            } */
        }
    },[searchName,selectSearch,patients,appointments])

    const {setSUCCESS,
            SUCCESS,
            setERROR,
            ERROR, 
            setMessage} = useContext(notification)

    useEffect(() => {
        const clear = setTimeout(() => {
            setSUCCESS(false)
            setERROR(false)
            setFormSuccess("")
            setFormError("")
        },2000)

        return () => clearTimeout(clear)
    },[SUCCESS,
        ERROR,
        setSUCCESS,
        setERROR,
        formSuccess,
        formError])

    async function handleCancel(obj,id) {
        const result = await cancelAppointment(obj,id)
        if(result.success) {
            setSUCCESS(result.success)
            setMessage(result.mssg)
        }
        if(!result.success) {
            setERROR(!result.success)
            setMessage(result.mssg)
        }
    }

    async function handleRestore(obj,id) {
        const result = await restoreAppointment(obj,id)
        if(result.success) {
            setSUCCESS(result.success)
            setMessage(result.mssg)
        }
        if(!result.success) {
            setSUCCESS(!result.success) 
            setMessage(result.mssg)
        }
    }

    async function handleRemove(id) {
        const result = await removeAppointment(id)
        if(result.success) {
            setSUCCESS(result.success)
            setMessage(result.mssg)
        }
        if(!result.success) {
            setERROR(!result.success)
            setMessage(result.mssg)
        }
    }

    function docName(id) {
        return doctors.map(doc => doc.id === id && doc.name).find(x => x!=false)
    }
    function patientName(id) {
        return patients.map(pat => pat.id === id && pat.name).find(z => z!=false)
    }

    async function handleEditForm(event) {
        event.preventDefault();
        const pattern = /^\d{1,2}:\d{1,2}$/;

        if(fdate === "" ||
            freason === "" ||
            ftime === ""
        ) setFormError("*fill all sections") 

        else if(!pattern.test(ftime)) setFormError("*incorrect TIME format,use 00:00 format")

        else {
            const result = await editAppointment({
                date: fdate,
                reason: freason,
                time: ftime,
                status: fstatus,
                doctorId: doctors.map(doc => doc.name === dr && doc.id).find(id => id!==false)
            },apptId)  

            if(result.success) {
                setFormSuccess(result.mssg)
                setMessage(result.mssg)
                setSUCCESS(result.success)
            }
            if(!result.success) {
                setFormError(`*${result.mssg}`)
                setERROR(!result.success)
                setMessage(result.mssg)
            }
        }
        
    }

    return (
        <section className="dashboard-container">
            <div className="dashboard-header">
                <div className="dash-cards">
                    <DashboardCard className="card a">
                        <p className="card-title">Total Appointments</p>
                        <p className="card-value">{appointments.length || 0}</p>
                    </DashboardCard>
                    <DashboardCard className="card b">
                        <p className="card-title">Scheduled</p>
                        <p className="card-value">{appointments
                                                .filter(appt => appt.status === "Scheduled")
                                                .length || 0}</p>
                    </DashboardCard>
                    <DashboardCard className="card c">
                        <p className="card-title">Confirmed</p>
                        <p className="card-value">{appointments
                                                .filter(appt => appt.status === "Confirmed")
                                                .length || 0}</p>
                    </DashboardCard>
                    <DashboardCard className="card d">
                        <p className="card-title">Completed</p>
                        <p className="card-value">{appointments
                                                .filter(appt => appt.status === "Completed")
                                                .length || 0}</p>
                    </DashboardCard>
                    <DashboardCard className="card e">
                        <p className="card-title">Cancelled</p>
                        <p className="card-value">{appointments
                                                .filter(appt => appt.status === "Cancelled")
                                                .length || 0}</p>
                    </DashboardCard>
                </div>
                <div className="dash-controlls">
                    <div className="filter-controlls">
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
                            <Button className="select-btn"><i className="fa-solid fa-chevron-down"></i></Button>
                            <option value="Patient name">Patient name</option>
                            <option value="Doctor name">Doctor name</option>
                        </Select>
                        <label htmlFor="search">
                            <span><i className="fa-solid fa-magnifying-glass"></i></span>
                            <Input
                                className="search-input"
                                type="text"
                                placeholder="Search..."
                                maxLength="25"
                                autoComplete="off"
                                ref={appointSearch}
                                value={searchName}
                                onChange={(event) => setSearchName(event.target.value)}
                                 />
                        </label>
                    </div>
                </div>
            </div>

            <div className="dashboard-body">
                {loadingAppts && <div class="loading">loading...</div>}
                {errorAppts ? <div class="loading-error">{errorAppts}</div> :
                    <Table className="appointments-table">
                        <tr>
                            <th>Edit</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Doctor</th>
                            <th>Patient</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th>Cancel</th>
                            <th>Delete</th>
                        </tr>
                        {filter.map(appt => (
                            <tr key={appt.id}>
                                <td>
                                    <Button onClick={() => {
                                        setFdate(appt.date)
                                        setFreason(appt.reason)
                                        setFtime(appt.time)
                                        setDr(docName(appt.doctorId))
                                        setFstatus(appt.status)
                                        setApptId(appt.id)
                                        setFormContainer(true)
                                    }} className="table-data-button">
                                        <i className="fa-regular fa-pen-to-square"></i>
                                    </Button>
                               </td>
                                <td>
                                    {appt.date.replaceAll("-","/")}
                                </td>
                                <td>
                                    {appt.time}
                                </td>
                                <td>
                                    {docName(appt.doctorId) || "loading..."}
                                </td>
                                <td>
                                    {patientName(appt.patientId) || "loading..."}
                                </td>
                                <td>
                                    {appt.reason}
                                </td>
                                <td>
                                    {appt.status}
                                </td>
                                <td>
                                    <Button onClick={appt.status !== "Cancelled" 
                                                        ? () => handleCancel({status: "Cancelled"},appt.id)
                                                        : () => handleRestore({status: "Scheduled"}, appt.id)} 
                                        className="table-data-button cancel">
                                        {appt.status === "Cancelled" ? "restore" : "cancel"}
                                    </Button>
                                </td>
                                {appt.status === "Cancelled" && <td>
                                    <Button 
                                        onClick={() => handleRemove(appt.id)}
                                        class="table-data-button delete">
                                        <i className="fa-solid fa-trash-can"></i>
                                    </Button>
                                </td>}
                            </tr>
                        ))}
                    </Table>
                    }
            </div>
            <div style={{display: formContainer ? "flex" : "none"}} className="edit-form-section">
                <div className="edit-form-wrapper">
                    <Button onClick={() => setFormContainer(false)} className="close-form">
                        <i className="fa-solid fa-xmark"></i>
                    </Button>
                    <div className="form-title">Edit Appointment</div>
                    <Form onSubmit={handleEditForm} className="appointment-edit-form">
                        <div className="input-wrapper">
                            <label htmlFor="date">Date</label>
                            <Input
                                type="date"
                                value={fdate}
                                id="date"
                                onChange={e => setFdate(e.target.value)}
                                 />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="reason">Reason</label>
                            <Input 
                                type="text"
                                value={freason}
                                id="reason"
                                onChange={e => setFreason(e.target.value)}
                                maxLength="25"
                                autoComplete="off"
                            />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="time">Time</label>
                            <Input 
                                type="text"
                                value={ftime}
                                id="time"
                                onChange={e => setFtime(e.target.value)}
                                maxLength="5"
                                placeholder="00:00"
                                autoComplete="off"
                            />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="doctor">Doctor</label>
                            <Select 
                                className="edit-form-select"
                                value={dr}
                                onChange={e => setDr(e.target.value)}>
                                    <Button className="select-btn"><i className="fa-solid fa-chevron-down"></i></Button>
                                    {doctors.map((doc,index) => (
                                        <option key={index} value={doc.name}>{doc.name}</option>
                                    ))}
                                </Select>
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="status">Status</label>
                             <Select
                                className="status-form-select"
                                value={fstatus}
                                onChange={(e) => setFstatus(e.target.value)}>
                                <Button className="select-btn"><i className="fa-solid fa-chevron-down"></i></Button>
                                <option value="Scheduled">Scheduled</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </Select>
                        </div>
                        {formSuccess && <div className="status form-success">{formSuccess}</div>}
                        {formError && <div className="status form-error">{formError}</div>}
                        <Button type="submit" className="confirm-edit-btn">CONFIRM</Button>
                    </Form>
                </div>
            </div>
        </section>
    )
}
export default Dashboard;