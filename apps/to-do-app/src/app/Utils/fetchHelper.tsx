import { ACCESS_TOKEN } from "../constants";

type Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

interface FetchOptions {
    fetchUrl: string;
    method: Method,
    withAccessToken?: boolean,
    formData?: object;
    signal?: AbortSignal
}

export const fetchHelper = ({ fetchUrl, method, formData, withAccessToken = true, signal }: FetchOptions): Promise<Response> => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    if (withAccessToken) headers.set('Authorization', `Bearer ${ accessToken }`)

    return fetch(fetchUrl, {
        signal,
        method,
        headers,
        body: JSON.stringify(formData)
    });
}