const corsParams = {
    method: "", //all methods
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    redirect: "follow",
    referrerPolicy: "origin-when-cross-origin",
}

const baseURL = 'http://localhost:8080/auth';

const configCorsParams = (method, headers) => {
    corsParams.headers = headers == null ? new Headers() : headers;
    corsParams.method = method;
}

export const login = async (user) => {

    configCorsParams("GET", null);

    return await fetch(`${baseURL}/csrf`, corsParams)
        .then((resp) => {
            if (resp.ok) {
                console.log("CSRF retrieved")
                return resp;
            } else {
                throw new Error("CSRF Request Unsuccessful");
            }
        })
        .then(async (data) => {
            let headers = {
                "Content-Type": "application/json",
                // Set the X-XSRF-TOKEN using the obtained cookie
                "X-XSRF-TOKEN": document.cookie.split("XSRF-TOKEN=")?.[1],
                "Authorization": "Basic " + btoa(user.email + ':' + user.password),
            };

            configCorsParams("POST", headers);

            return await fetch(baseURL, corsParams)
                .then((resp) => {
                    if (resp.ok) {
                        return resp.text(); //jwt from the response
                    } else if (resp.status === 400) {
                        throw new Error('Password incorrect');
                    } else if (resp.status === 403) {
                        throw new Error("Username not found")
                    } else {
                        throw new Error("Internal server error");
                    }
                })
                .then(async (data) => {

                    configCorsParams("GET", null);

                    return await fetch(`${baseURL}/user`, corsParams)
                        .then((resp) => {
                            if (resp.ok) {
                                return resp.json(); //current user from the response
                            } else {
                                throw new Error("Cannot get the current user!");
                            }
                        })
                })
        })
};

export const logout = async () => {

    configCorsParams("GET", null);

    return await fetch(`${baseURL}/logout`, corsParams)
        .then((resp) => {
            if (resp.ok) {
                return resp.text();
            } else {
                throw new Error("Logout Error");
            }
        })
};

export const extractCurrentUser = async () => {

    configCorsParams("GET", null);

    return await fetch(`${baseURL}/user`, corsParams)
        .then((resp) => {
            if (resp.ok) {
                return resp.json(); //current user from the response
            } else {
                throw new Error("Cannot get the current user!");
            }
        })
}
