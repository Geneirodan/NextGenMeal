const baseUrl = 'https://localhost:7168/api/'

export const sendRequest = async (url, method, {data = null, params = null}) => {

    let input = `${baseUrl}${url}`;
    if (params)
        input += `?${new URLSearchParams(params)}`
    let init = {
        method,
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors"
    };
    if (data)
        init.body = JSON.stringify(data)
    try {
        return await fetch(input, init);
    } catch {
        return {
            ok: false,
            json: async () => ({
                errors: {
                    "Common": [
                        "Can't establish connection with server. Try again later"
                    ]
                }
            })
        }
    }
}

export const get = async (url, params = null) => await sendRequest(url, "GET", {params})
export const post = async (url, data, params = null) => await sendRequest(url, "POST", {data, params})
export const put = async (url, data, params = null) => await sendRequest(url, "PUT", {data, params})
export const patch = async (url, data, params = null) => await sendRequest(url, "PATCH", {data, params})
export const del = async (url, params = null) => await sendRequest(url, "DELETE", {params})