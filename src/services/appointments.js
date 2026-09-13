const appts_url = 'http://localhost:3000/appointments';

export async function getAppt(Signal) {
    const response = await fetch(appts_url, {
        signal: Signal
    })
    if(!response.ok) throw new Error("Oops! failed to load appointments")
    return response.json();
}

export async function postAppt(obj) {
    const response = await fetch(appts_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })

    if(!response.ok) throw new Error("Oops! failed to create appointment")
    return response.json();
}

export async function patchAppt(obj,obj_id) {
    const response = await fetch(`${appts_url}/${obj_id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })
    
    if(!response.ok) throw new Error("Oops! there is an error")
    return response.json();
}