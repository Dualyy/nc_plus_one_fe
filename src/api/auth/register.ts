import type { Token, User } from "../../types/User";
import { apiGet, apiPost } from "../clients";



export function userRegister(body: User) {
    return apiPost<User>("/auth/register", body)
}

export function userLogin(body: Partial<User>) {
    return apiPost<Token>("/auth/login", body)
}

export function getUser() {
    return apiGet<User>("/user/me")
}