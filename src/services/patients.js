const patients_url = "http://localhost:3000/patients";

export async function getPatients(Signal) {
    const response = await fetch(patients_url, {
        signal: Signal
    })
    if(!response.ok) throw new Error("Oops! failed to load patients")
    return response.json();
}

export async function postPatient(obj) {
    const response = await fetch(patients_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })
    if(!response.ok) throw new Error("Oops! failed to create patient")
    return response.json();
}

export async function deletePatient(obj_id) {
    const response = await fetch(`${patients_url}/${obj_id}`, {
        method: 'DELETE'
    })
    if(!response.ok) throw new Error("Oops! failed to delete a patient")
}