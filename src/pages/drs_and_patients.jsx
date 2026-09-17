import useDoctors from '../hooks/useDoctors'
import usePatients from '../hooks/usePatients'
import Table from '../components/table'

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
        <div className="doctors-list"></div>
        <div className="patients-list"></div>
    </section>
    )
}
export default Drs_patients;