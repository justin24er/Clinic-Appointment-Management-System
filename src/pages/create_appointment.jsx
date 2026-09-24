import { useContext, useState, useEffect } from 'react'
import { notification } from '../contexts/notifyContext'
import useDoctors from '../hooks/useDoctors'
import usePatients from '../hooks/usePatients'
import useAppointments from '../hooks/useAppointments'
import Input from '../components/ui/input'
import Button from '../components/ui/button'
import Select from '../components/ui/select'
import Form from '../components/form'
import '../styles/create_appointment.css'

function CreateAppt() {
    const [fdate, setFdate] = useState("")
    const [ftime, setFtime] = useState("")
    const [fdoctor, setFdoctor] = useState("")
    const [fpatient, setFpatient] = useState("")
    const [freason, setFreason] = useState("")

    const {addAppointment} = useAppointments()
    const {doctors} = useDoctors()
    const {patients} = usePatients()
    const [isDoctor, setIsDoctor] = useState(false)
    const [isPatient, setIsPatient] = useState(false)


    const {setSUCCESS, setERROR, setMessage} = useContext(notification)
    const [formError, setFormError] = useState("")
    const [formSuccess, setFormSuccess] = useState("")

    const returnPatientId = (name) => patients.map(pat => pat.name === name && pat.id).find(id => id !== false)
    const returnDoctorId = (name) => doctors.map(doc => doc.name === name && doc.id).find(id => id !== false)

    useEffect(() => {
        const clear = setTimeout(() => {
            setFormError("")
            setFormSuccess("")
        },2000)
        return () => clearTimeout(clear) 
    },[formSuccess, formError])

    async function handleForm(event) {
        event.preventDefault();

        const time_pattern = /^[0-9]{1,2}:[0-9]{1,2}$/
        if(fdate === "" ||
            ftime === "" ||
            fdoctor === "" ||
            fpatient === "" ||
            freason === ""
        ) setFormError("*fill all sections")
        else if(!time_pattern.test(ftime)) setFormError("*incorrect TIME format,use 00:00 format")
        else {
            const result = await addAppointment({
                patientId: returnPatientId(fpatient),
                doctorId: returnDoctorId(fdoctor),
                date: fdate,
                time: ftime,
                reason: freason,
                status: "Scheduled"
            })
            if(result.success) {
                setSUCCESS(result.success)
                setMessage(result.mssg)
                setFormSuccess(result.mssg)

                setFdate("")
                setFtime("")
                setFdoctor("")
                setFpatient("")
                setFreason("")
            }
            if(!result.success) {
                setERROR(!result.success)
                setMessage(result.mssg) 
            }
        }
    }

    function handleFdoctor(event) {
        setFdoctor(event.target.value)
        setIsDoctor(false)
        requestAnimationFrame(() => {setIsDoctor(true)})
    }

    function handleFpatient(event) {
        setFpatient(event.target.value)
        setIsPatient(false)
        requestAnimationFrame(() => {setIsPatient(true)})
    }

    return (
        <div className="appointment-form-wrapper">
            <span className="appointment-form-title">Create Appointment</span>
            <Form className="appointment-form" onSubmit={handleForm}>
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
                        onChange={handleFdoctor}
                        className="form-select">
                        <Button className="select-btn">
                            <selectedContent className={isDoctor && "pop"}></selectedContent>
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
                        onChange={handleFpatient}>
                            <Button className="select-btn">
                                <selectedContent className={isPatient && "pop"}></selectedContent>
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
                {formSuccess && <div className="appointment-status form-success">{formSuccess}</div>}
                {formError && <div className="appointment-status form-error">{formError}</div>}
            </Form>
        </div>
    )

}
export default  CreateAppt;