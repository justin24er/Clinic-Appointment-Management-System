import useDoctors from '../hooks/useDoctors'
import usePatients from '../hooks/usePatients'
import Table from '../components/table'
import Button from '../components/ui/button'

function Drs_patients() {
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
    return (
    <section className="list-wrapper">
        <div className="doctors-list">
            <span className="list-header">
                <span>Doctors</span>
                <Button className="addDoctor-btn">add</Button>
            </span>
            {loadingDocs && <div className="loading">loading...</div>}
            {errorDocs ? <div className="loading-error">{errorDocs}</div> :
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
                            <Button className="delete-btn"><i className="fa-solid fa-trash-can"></i></Button>
                        </td>
                    </tr>
                ))}
            </Table>}
        </div>

        <div className="patients-list">
            <span className="list-header">
                <span>Patients</span>
                <Button className="addPatient-btn">add</Button>
            </span>
            {loadingPatients && <div className="loading">loading...</div>}
            {errorPatients ? <div className="loading-error">{errorPatients}</div> :
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
                                <Button className="delete-btn"><i className="fa-solid fa-trash-can"></i></Button>
                            </td>
                        </tr>
                    ))}
            </Table>}
        </div>
    </section>
    )
}
export default Drs_patients;