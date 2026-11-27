import { readToken } from "../util/token";

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000';


export class ApiError extends Error {
    status: number;
    constructor(status: number, message: string) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

export function getErrorMessage(err: unknown): string {
    if (!(err instanceof ApiError)) return "Something went wrong.";

    switch (err.status) {
        case 0: return "Couldn't reach the server.";
        case 401: return "Please log in again.";
        case 403: return "You don't have permission to do that.";
        case 404: return "We couldn't find that.";
        default: return err.message;
    }
}

function authHeaders(): Record<string, string> {
    const token = readToken()
    return token ? { Authorization: `Bearer ${token}` } : {}
}


export async function apiGet<T>(path: string, signal?: AbortSignal): Promise<T> {
    const response = await fetch(BASE_URL + path, { headers: authHeaders(), signal })

    if (!response.ok) throw new ApiError(response.status, `Request failed with ${response.status}`)
    return await response.json() as T
}

export async function apiPost<T>(path: string, body: unknown, signal?: AbortSignal) {
    const response = await fetch(BASE_URL + path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify(body),
        signal,
    })

    if (!response.ok) throw new ApiError(response.status, `Request failed with ${response.status} ${await response.text()}`)
    return await response.json() as T
}

export async function apiPatch<T>(path: string, body: unknown, signal?: AbortSignal) {
    const response = await fetch(BASE_URL + path, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify(body),
        signal,
    })

    if (!response.ok) throw new ApiError(response.status, `Request failed with ${response.status}`)
    return await response.json() as T
}


export const apiDelete = async (path: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}${path}`, { method: "DELETE", headers: authHeaders() });

    if (!response.ok) {
        throw new ApiError(response.status, `Request failed with status ${response.status}`);
    }
};