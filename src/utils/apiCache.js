import api from "./api";
import { storeUrlResult, findResultByUrl } from "./indexDBManager";


// Purpose of this file is to cache the object and return that
export default function apiCache(endpoint) {
    return new Promise((resolve, reject) => {

        api(endpoint)
            .then((response) => {
                storeUrlResult(endpoint, response);
                resolve(response);
            })
            .catch((error) => {
                if(!('indexedDB' in window)) {
                    reject(error);
                    return;
                }

                findResultByUrl(endpoint)
                    .then(resultInCache => resolve(resultInCache.result))
                    .catch(() => reject(error));
            })
    });
}