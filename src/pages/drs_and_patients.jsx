import useDoctors from '../hooks/useDoctors'
import usePatients from '../hooks/usePatients'
import Table from '../components/table'
import Button from '../components/ui/button'
import Form from '../components/form'
import Input from "../components/ui/input"
import { useState, useContext, useEffect } from 'react'
import { notification } from '../contexts/notifyContext'
import '../styles/drs_pats.css'

function Drs_patients() {
    const [dname, setDname] = useState("")
    const [dspecialty, setDspecialty] = useState("")
    const [dphone, setDphone] = useState("")
    const [demail, setDemail] = useState("")

    const [pname, setPname] = useState("")
    const [p_age, setP_age] = useState("")
    const [p_phone, setP_phone] = useState("")
    const [paddress, setPaddress] = useState("")
    const [pgender, setPgender] = useState("")

    const [docForm, setDocForm] = useState(false)
    const [patForm, setPatForm] = useState(false)

    const [formSuccess, setFormSuccess] = useState("")
    const [formError, setFormError] = useState("")

    const {doctors,
           loadingDocs,
           errorDocs,
           addDoctor,
           removeDoctor} = useDoctors()

    const {patients,
           loadingPatients,
           errorPatients,
           addPatient,
           removePatient} = usePatients()

    const { setSUCCESS, setERROR, setMessage } = useContext(notification)

    useEffect(() => {
        const clear = setTimeout(() => {
            setFormSuccess("")
            setFormError("")
        },2000)

        return () => clearTimeout(clear)
    },[formError,formSuccess])

    async function doctorDelete(id) {
        const result = await removeDoctor(id)
        if(result.success) {
            setSUCCESS(result.success)
            setMessage(result.mssg)
        }
        if(!result.success) {
            setERROR(!result.success)
            setMessage(result.mssg)
        }
    }

    async function patientDelete(id) {
        const result = await removePatient(id)
        if(result.success) {
            setSUCCESS(result.success)
            setMessage(result.mssg)
        }
        if(!result.success) {
            setERROR(!result.success)
            setMessage(result.mssg)
        }
    }

    async function handleDoctorAdd(event) {
        event.preventDefault()

        const mobile_pattern = /^\+?[0-9 -]{10,15}$/
        const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i // letter "i" allows case-insensitive
        if(dname === "" ||
           dspecialty === "" ||
           dphone === "" ||
           demail === ""
        ) setFormError("*fill all sections");
        else if(!mobile_pattern.test(dphone)) setFormError("*Invalid Phone number");
        else if(!email_pattern.test(demail)) setFormError("*Invalid email format");
        else {
            const result = await addDoctor({
                name: dname,
                specialty: dspecialty,
                phone: dphone,
                email: demail
            })
            if(result.success) {
                setFormSuccess(result.mssg)
                setSUCCESS(result.mssg)
                setMessage(result.mssg)

                setDname("")
                setDspecialty("")
                setDphone("")
                setDemail("")
            }
            else if(!result.success) {
                setERROR(!result.success)
                setMessage(result.mssg)
            }
        }
    }

    async function handlePatientAdd(event) {
        event.preventDefault();

        const phone_pattern = /^\+?[0-9 -]{10,15}$/
        if(pname === "" ||
           p_age === "" ||
           p_phone === "" ||
           paddress === ""  ||
           pgender === ""  
        ) setFormError("*fill all sections");
        else if(!Number(p_age)) setFormError("*Incorrent Age format. Use Numbers only")
        else if(!phone_pattern.test(p_phone)) setFormError("*Invalid Phone number")
        else {
            const result = await addPatient({
                name: pname,
                age: p_age,
                phone: p_phone,
                gender: pgender,
                address: paddress
            })

            if(result.success) {
                setFormSuccess(result.mssg)
                setSUCCESS(result.success)
                setMessage(result.mssg)

                setPname("")
                setP_age("")
                setP_phone("")
                setPaddress("")
            }
            else if(!result.success) {
                setERROR(!result.success) 
                setMessage(result.mssg)
            }
        }
    }

    return (
    <section className="list-wrapper">
        <div className="doctors-list">
            <span className="list-header">
                <span>Doctors</span>
                <Button 
                    className="addDoctor-btn"
                    onClick={() => setDocForm(true)}>add</Button>
            </span>
            {loadingDocs && <div className="loading">loading...</div>}
            {errorDocs ? <div className="loading-error">{errorDocs}&nbsp;&nbsp;:(</div> :
            <Table className="doctors-table">
                <tr>
                    <th>Name</th>
                    <th>Specialty</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Delete</th>
                </tr>
                {doctors.map(doc => (
                    <tr key={doc.id}>
                        <td>{doc.name}</td>
                        <td>{doc.specialty}</td>
                        <td>{doc.phone}</td>
                        <td>{doc.email}</td>
                        <td>
                            <Button 
                                className="delete-btn"
                                onClick={() => doctorDelete(doc.id)}>
                                    <i className="fa-solid fa-trash-can"></i>
                            </Button>
                        </td>
                    </tr>
                ))}
            </Table>}
        </div>

        <div className="patients-list">
            <span className="list-header">
                <span>Patients</span>
                <Button 
                    className="addPatient-btn"
                    onClick={() => setPatForm(true)}>add</Button>
            </span>
            {loadingPatients && <div className="loading">loading...</div>}
            {errorPatients ? <div className="loading-error">{errorPatients}&nbsp;&nbsp;:(</div> :
            <Table className="patients-table">
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Phone</th>
                        <th>address</th>
                        <th>Delete</th>
                    </tr>
                    {patients.map(pat => (
                        <tr key={pat.id}>
                            <td>{pat.name}</td>
                            <td>{pat.age}</td>
                            <td>{pat.gender}</td>
                            <td>{pat.phone}</td>
                            <td>{pat.address}</td>
                            <td>
                                <Button
                                    className="delete-btn"
                                    onClick={() => patientDelete(pat.id)}>
                                        <i className="fa-solid fa-trash-can"></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
            </Table>}
        </div>

        <div style={{display: (docForm || patForm) ? "flex" : "none"}} className="add-form-section">
            <div style={{display: docForm ? "flex" : "none"}} className="add-doctor-form-wrapper">
                <Button onClick={() => setDocForm(false)} className="close-form">
                    <i className="fa-solid fa-xmark"></i>
                </Button>
                <div className="form-title">Add Doctor</div>
                <Form onSubmit={handleDoctorAdd}>
                    <Input 
                        type="text"
                        value={dname}
                        placeholder="Name"
                        maxLength="25"
                        onChange={e => setDname(e.target.value)}
                        />
                    <Input 
                        type="text"
                        value={dspecialty}
                        placeholder="Specialty(e.g dentistry,vision)"
                        onChange={e => setDspecialty(e.target.value)}
                        maxLength="25"
                        />
                    <Input 
                        type="tel"
                        value={dphone}
                        placeholder="Phone(+255)"
                        onChange={e => setDphone(e.target.value)}
                        pattern = "\+?[0-9 -]{10,15}"
                        title="Enter a 10 valid phone number"
                        autoComplete="tel"
                        />
                    <Input 
                        type="email"
                        value={demail}
                        placeholder="example@gmail.com"
                        autoComplete="email"  
                        onChange={e => setDemail(e.target.value)}
                        />
                    <Button type="submit" >CONFIRM</Button>
                    {formSuccess && <div className="status form-success">{formSuccess}</div>}
                    {formError && <div className="status form-error">{formError}</div>}
                </Form>
            </div>
            <div style={{display: patForm ? "flex" : "none"}} className="add-patient-form-wrapper">
                <Button onClick={() => setPatForm(false)} className="close-form">
                    <i className="fa-solid fa-xmark"></i>
                </Button>
                <div className="form-title">Add Patient</div>
                <Form onSubmit={handlePatientAdd}>
                    <Input 
                        type="text"
                        placeholder="Name"
                        value={pname}
                        maxLength="25"
                        onChange={e => setPname(e.target.value)}
                        />
                    <Input 
                        type="text"
                        placeholder="Age"
                        value={p_age}
                        maxLength="2"
                        onChange={e => setP_age(e.target.value)}
                        />
                    <Input 
                        type="tel"
                        placeholder="Phone(+255)"
                        value={p_phone}
                        pattern="\+?[0-9]{10,15}"
                        title="Enter a 10 valid phone number"
                        onChange={e => setP_phone(e.target.value)}
                        autoComplete="tel"
                        />
                    <Input 
                        type="text"
                        value={paddress}
                        placeholder="Address"
                        maxLength="25"
                        onChange={e => setPaddress(e.target.value)}
                        />
                    <label className="male-radio">
                        <Input 
                            type="radio"
                            value="Male"
                            name="gender"
                            onChange={e => setPgender(e.target.value)}
                            />
                            <span>Male</span>
                    </label>
                    <label className="female-radio">
                        <Input 
                            type="radio"
                            value="Female"
                            name="gender"
                            onChange={e => setPgender(e.target.value)}
                            />
                            <span>Female</span>
                    </label>
                    <Button type="submit">CONFIRM</Button>
                    {formSuccess && <div className="status form-success">{formSuccess}</div>}
                    {formError && <div className="status form-error">{formError}</div>}
                </Form>
            </div>
        </div>
    </section>
    )
}
export default Drs_patients;