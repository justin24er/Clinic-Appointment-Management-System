const doctors_url = "http://localhost:3000/doctors";

export async function getDoctors(Signal) {
    const response = await fetch(doctors_url, {
        signal: Signal
    })
    if(!response.ok) throw new Error("Oops! failed to load doctors")
    return response.json();
}

export async function postDoctor(obj) {
    const response = await fetch(doctors_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })
    if(!response.ok) throw new Error("Oops! failed to create doctor")
    return response.json();
}

export async function deleteDoctor(obj_id) {
    const response = await fetch(`${doctors_url}/${obj_id}`, {
        method: 'DELETE',
    })
    if(!response.ok) throw new Error("Oops! failed to delete doctor")
}