import { useContext, useState, useEffect} from 'react'
import { notification } from '../contexts/notifyContext'
import useDoctors from '../hooks/useDoctors'
import usePatients from '../hooks/usePatients'
import useAppointments from '../hooks/useAppointments'
import Input from '../components/ui/input'
import Button from '../components/ui/button'
import Select from '../components/ui/select'
import Form from '../components/form'

function CreateAppt() {
    const [fdate, setFdate] = useState("")
    const [ftime, setFtime] = useState("")
    const [fdoctor, setFdoctor] = useState("")
    const [fpatient, setFpatient] = useState("")
    const [freason, setFreason] = useState("")

    const {addAppointment} = useAppointments()
    const {doctors} = useDoctors()
    const {patients} = usePatients()

    const {setSUCCESS, setERROR, setMessage} = useContext(notification)

    return (
        <div className="appointment-form-wrapper">
            <span className="appointment-form-title">Create Appointment</span>
            <Form className="appointment-form">
                <label htmlFor="date">
                    <span>Date</span>
                    <Input
                        type="date"
                        value={fdate}
                        id="date"
                        onChange={e => setFdate(e.target.value)}
                         />
                </label>
                <label htmlFor="time">
                    <span>Time</span>
                    <Input 
                        type="text"
                        maxLength="5"
                        value={ftime}
                        onChange={e => setFtime(e.target.value)}
                        id="time"
                        placeholder="00:00"
                        autoComplete="off"
                        />
                </label>
                <label htmlFor="doctor">
                    <span>Doctor</span>
                    <Select
                        value={fdoctor}
                        onChange={e => setFdoctor(e.target.value)}
                        className="form-select">
                        <Button className="select-btn">
                            <i className="fa-solid fa-chevron-down"></i>
                        </Button>
                        <option value="" selected disabled>--select-doctor--</option>
                        {doctors.map(doc => (
                            <option key={doc.id} value={doc.name}>{doc.name}</option>
                        ))}
                    </Select>
                </label>
                <label htmlFor="patient">
                    <span>Patient</span>
                    <Select 
                        value={fpatient}
                        className="form-select"
                        onChange={e => setFpatient(e.target.value)}>
                            <Button className="select-btn">
                                <i className="fa-solid fa-chevron-down"></i>
                            </Button>
                            <option value="" selected disabled>--select-patient--</option>
                            {patients.map(pat => (
                                <option key={pat.id} value={pat.name}>{pat.name}</option>
                            ))}
                    </Select>
                </label>
                <textarea
                    value={freason}
                    id="reasonBox"
                    placeholder="Reason..."
                    maxLength="40"
                    autoComplete="off"
                    onChange={e => setFreason(e.target.value)} 
                    />
                <Button type="submit" className="form-button">CREATE</Button>
                {}
            </Form>
        </div>
    )

}
export default  CreateAppt;