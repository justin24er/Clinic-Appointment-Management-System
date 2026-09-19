import { useContext, useState, useEffect} from 'react'
import { notification } from '../contexts/notifyContext'
import useDoctors from '../hooks/useDoctors'
import usePatients from '../hooks/usePatients'
import useAppointments from '../hooks/useAppointments'
import Input from '../components/ui/input'
import Button from '../components/ui/button'
import Select from '../components/ui/select'

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



}
export default  CreateAppt;