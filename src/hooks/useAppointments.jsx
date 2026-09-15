import {useEffect, useReducer} from 'react';
import { getAppt,
         postAppt,
         patchAppt,
         deleteAppt
        } from '../services/appointments'
const initialAppointments = {
        loading: true,
        error: null,
        appointments: []
}

function reducer(state, action) {
    switch(action.type) {
        case 'FETCH_SUCCESS':  return {...state, 
                                        loading: false, 
                                        appointments: action.payload}

        case 'FETCH_ERROR': return {...state, 
                                        loading: false,
                                        error: action.payload}

        case 'ADD': return {...state,
                            appointments: [...state.appointments, action.payload]}
        case 'EDIT':    return     {...state, 
                                    appointments: state.appointments.map(appt => appt.id === action.payload.id
                                                                                 ? {...appt, 
                                                                                    date: action.payload.date,
                                                                                    time: action.payload.time,
                                                                                    reason: action.payload.reason,
                                                                                    doctorId: action.payload.doctorId}
                                                                                 : appt) }
        case 'CANCEL': return {...state, 
                               appointments: state.appointments.map(appt => appt.id === action.payload.id
                                                                            ? {...appt, status: action.payload.status}
                                                                            : appt)}

        case 'REMOVE': return {...state,
                                appointments: state.appointments.filter(appt => appt.id !== action.payload)}

        default: return state;
        }

    }


function useAppointments() {
    const [appts, dispatch] = useReducer(reducer, initialAppointments)

    useEffect(() => {
        const controller = new AbortController();

        async function loadAppointments() {
            try {
                const feedback = await getAppt(controller.signal)
                dispatch({
                    type: 'FETCH_SUCCESS',
                    payload: feedback
                })
            }
            catch(err) {
                if(err.name !== 'AbortError') {
                    dispatch({
                        type: 'FETCH_ERROR',
                        payload: err.message
                    })
                }
            }
        }
        loadAppointments()

        return () => controller.abort();
    },[])

    async function addAppointment(obj) {
        try {
            const feedback = await postAppt(obj);
            dispatch({
                type: 'ADD',
                payload: feedback
            })
            return {success: true}
        }
        catch(err) {
            return {success: false, error: err.message}
        }
    }

    async function cancelAppointment(obj,obj_id) {
        try{
            const feedback = await patchAppt(obj,obj_id) 
            dispatch({
                type: 'CANCEL',
                payload: feedback
            })
            return {success: true}
        }
        catch(err) {
            return {success: false, error: err.message}
        }
    }

    async function editAppointment(obj,obj_id) {
        try {
            const feedback = await patchAppt(obj,obj_id);
            dispatch({
                type: 'EDIT',
                payload: feedback
            })
            return {success: true}
        }
        catch(err) {
            return {success: false, error: err.message}
        }
    }

    async function removeAppointment(obj_id) {
        try {
            await deleteAppt(obj_id)
            dispatch({
                type: 'REMOVE',
                payload: obj_id
            })
            return {success: true}
        }
        catch(err) {
            return {success: false, error: err.message}
        }
    }

    return {
        appointments: appts.appointments,
        loadingAppts: appts.loading,
        errorAppts: appts.error,
        addAppointment,
        cancelAppointment,
        editAppointment,
        removeAppointment
    }
}
export default useAppointments