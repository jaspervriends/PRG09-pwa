// Init indexedDB
let dbRequest = null;
let dbStore = null;

// Check if supported
if (!('indexedDB' in window)) {
    console.log("IndexedDB not supported");
}else{
    dbRequest = indexedDB.open('application', 1);
    
    // On first request or upgrade
    dbRequest.onupgradeneeded = () => {
        var db = dbRequest.result;

        if (!db.objectStoreNames.contains('result_cache')) {
            db.createObjectStore('result_cache', { keyPath: 'url' });
        }

        console.log("Initialized database");
    }

    // Success
    dbRequest.onsuccess = () => {
        dbStore = dbRequest.result;
        console.log("Ready to index!");
    };
}

// Get result
function findResultByUrl(url) {
    if(!('indexedDB' in window) || dbStore === null) {
        return null;
    }

    return new Promise((resolveCaching, unfortunatelyReject) => {
        const tx = dbStore.transaction('result_cache', 'readonly');
        const store = tx.objectStore('result_cache');  
        const request = store.get(url);

        request.onsuccess = () => {
            if (request.result !== undefined) {
                console.log("data", request.result);
                resolveCaching(request.result);
            }else{
                console.log("Couldn't find Data");
                unfortunatelyReject();
            }
        }
    })
}

// Store result
function storeUrlResult(url, result) {
    if(!('indexedDB' in window) || dbStore === null) {
        console.log("Not stored.");
        return false;
    }

    // Store in database
    const tx = dbStore.transaction('result_cache', 'readwrite');
    const store = tx.objectStore('result_cache');
    store.add({ url, result });
}

export { findResultByUrl, storeUrlResult };