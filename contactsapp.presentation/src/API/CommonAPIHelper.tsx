
interface HttpResponse<T> extends Response {
    parsedBody?: T;
}
export async function http<T>(
    request: RequestInfo
): Promise<HttpResponse<T>> {
    const response: HttpResponse<T> = await fetch(
        request
    );
    response.parsedBody = await response.json();
    return response;
}

export async function get<T>(
    path: string,
    args: RequestInit = { method: "get" }
): Promise<T | undefined> {
    var fetchPromise = await http<T>(new Request(path, args));
    try {
        fetchPromise.parsedBody = await fetchPromise.json();
    } catch (ex) { }
    if (!fetchPromise.ok) {
        throw new Error(fetchPromise.statusText);
    }
    return fetchPromise.parsedBody;
};

export async function post<T>(
    path: string,
    body: any,
    args: RequestInit = {
        method: "post", headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json'
        }, body: JSON.stringify(body)
    }
): Promise<T | undefined> {
    var fetchPromise = await http<T>(new Request(path, args));

    try {

        fetchPromise.parsedBody = await fetchPromise.json();
    } catch (ex) { }

    if (!fetchPromise.ok) {
        throw new Error(fetchPromise.statusText);
    }
    return fetchPromise.parsedBody;
};

export async function put<T>(
    path: string,
    body: any,
    args: RequestInit = {
        method: "put", headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json'
        }, body: JSON.stringify(body)
    }
): Promise<HttpResponse<T>> {
    return await http<T>(new Request(path, args));
};

export async function deleteData<T>(
    path: string,
    args: RequestInit = { method: "delete" }
): Promise<T | undefined> {
    var fetchPromise = await http<T>(new Request(path, args));
    try {
        fetchPromise.parsedBody = await fetchPromise.json();
    } catch (ex) { }
    if (!fetchPromise.ok) {
        throw new Error(fetchPromise.statusText);
    }
    return fetchPromise.parsedBody;
};