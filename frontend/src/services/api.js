
export async function get(route) {
    const response = await fetch('http://localhost:8000/' + route, {
        method: "GET"
    });
    return response.json();
}

export async function post(route, data) {
    const response = await fetch('http://localhost:8000/' + route, {
        method: "POST",
        body: JSON.stringify(data),
        
    });
    return response.json();
}
    
export async function patch(route, data) {
    const response = await fetch('http://localhost:8000/' + route, {
        method: "PATCH",
        body: JSON.stringify(data),
    });
    return response.json();
}

export async function del(route) {
    const response = await fetch('http://localhost:8000/' + route, {
        method: "DELETE"
    });
    return response.json();
}
