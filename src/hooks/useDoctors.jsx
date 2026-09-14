import {useEffect, useReducer} from 'react'
import {getDoctors,
        postDoctor,
        deleteDoctor
    } from '../services/doctors'

const initialDoctors = {
    loading: true,
    error: null,
    doctors: []
}

function reducer(state, action) {
    switch(action.type) {
        case 'FETCH_SUCCESS': return {...state, 
                                      loading: false,
                                      doctors: [...state.doctors, action.payload]}

        case 'FETCH_ERROR': return {...state,
                                    loading: false,
                                    error: action.payload}
                            
        case 'ADD': return {...state, 
                            doctors: [...state.doctors, action.payload]}

        case 'REMOVE': return {...state,
                                doctors: state.doctors.filter(doc => doc.id !== action.payload)
        }

        default: return state;
    }
}

function useDoctors() {
    const [docs, dispatch] = useReducer(reducer, initialDoctors)

    useEffect(() => {
        const controller = new AbortController();

        async function loadDoctors() {
            try {
                const feedback = await getDoctors(controller.signal);
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
        loadDoctors()

        return () => controller.abort();
    },[])

    async function addDoctor(obj) {
        try{
            const feedback = await postDoctor(obj)
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

    async function removeDoctor(obj_id) {
        try{
            await deleteDoctor(obj_id)
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
        loadingDocs: docs.loading,
        errorDocs: docs.error,
        doctors: docs.doctors,
        addDoctor,
        removeDoctor
    }
}
export default useDoctors