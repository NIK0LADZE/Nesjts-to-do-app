import { ACCESS_TOKEN } from "../constants";

type Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

interface FetchOptions {
    fetchUrl: string;
    method: Method,
    formData?: object;
    signal?: AbortSignal
}

export const fetchHelper = ({ fetchUrl, method, formData, signal }: FetchOptions): Promise<Response> => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    if (accessToken) headers.set('Authorization', `Bearer ${ accessToken }`)

    return fetch(fetchUrl, {
        signal,
        method,
        headers,
        body: JSON.stringify(formData)
    });
}