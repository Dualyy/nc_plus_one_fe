import { readToken } from "../util/token";

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000';

//TODO: better error handling

function authHeaders(): Record<string, string> {
    const token = readToken()
    return token ? { Authorization: `Bearer ${token}` } : {}
}


export async function apiGet<T>(path: string, signal?: AbortSignal): Promise<T> {
    const response = await fetch(BASE_URL + path, {headers: authHeaders(), signal })

    if (!response.ok) {
        throw new Error(`Request failed with ${response.status}`)
    }
    return await response.json() as T
}

export async function apiPost<T>(path: string, body: unknown, signal?: AbortSignal) {
    const response = await fetch(BASE_URL + path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify(body),
        signal,
    })

    if (!response.ok) throw new Error(`Request failed with ${response.status}`)
    return await response.json() as T
}

export async function apiPatch<T>(path: string, body: unknown, signal?: AbortSignal) {
    const response = await fetch(BASE_URL + path, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify(body),
        signal,
    })

    if (!response.ok) throw new Error(`Request failed with ${response.status}`)
    return await response.json() as T
}


export const apiDelete = async (path: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}${path}`, { method: "DELETE", headers: authHeaders() });

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }
};