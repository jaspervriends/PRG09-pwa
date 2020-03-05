function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }

    return response;
}

export default function api(endpoint) {
    return new Promise((resolve, reject) => {
        fetch(`https://cmgt.hr.nl:8000/api${endpoint}`)
            .then(handleErrors)
            .then(function(response) {
                resolve(response.json());
            })
            .catch(function(error) {
                reject(error);
            })
    });
}