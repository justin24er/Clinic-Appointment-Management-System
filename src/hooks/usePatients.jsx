import {useEffect, useReducer} from 'react'
import {getPatients,
        postPatient,
        deletePatient} from '../services/patients'
    
const initialPatients = {
    loading: true,
    error: null,
    patients: []
}

function reducer(state, action) {
    switch(action.type) {
        case 'FETCH_SUCCESS': return {...state, 
                                      loading: false,
                                      patients: action.payload}

        case 'FETCH_ERROR': return {...state,
                                    error: action.payload,
                                    loading: false
                                }

        case 'ADD': return {...state,
                            patients: [...state.patients, action.payload]
                            }

        case 'REMOVE': return {...state,
                               patients: state.patients.filter(patient => patient.id !== action.payload)
                            }
        default: return state
    }
}

function usePatients() {
    const [pats, dispatch] = useReducer(reducer, initialPatients)

    useEffect(() => {
        const controller = new AbortController();

        async function loadPatients() {
            try {
                const feedback = await getPatients(controller.signal)
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
        loadPatients()

        return () => controller.abort();
    },[])

    async function addPatient(obj) {
        try{
            const feedback = await postPatient(obj);
            dispatch({
                type: 'ADD',
                payload: feedback
            })
            return {success: true, mssg: "added successfully!"}
        }
        catch(err) {
            return {success: false, mssg: err.message}
        }
    }

    async function removePatient(obj_id) {
        try{
            await deletePatient(obj_id);
            dispatch({
                type: 'REMOVE',
                payload: obj_id
            })
            return {success: true, mssg: "removed successfully!"}
        }
        catch(err) {
            return {success: true, mssg: err.message}
        }
    }

    return {
        patients: pats.patients,
        loadingPatients: pats.loading,
        errorPatients: pats.error,
        addPatient,
        removePatient
    }
}
export default usePatients;