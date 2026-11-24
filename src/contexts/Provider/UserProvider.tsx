import {  useEffect, useMemo, useState, type ReactNode } from "react"
import { clearToken, readToken, writeToken } from "../../util/token"
import { getUser, userLogin, userRegister } from "../../api/auth/register";
import type { User } from "../../types/User";
import { UserContext } from "../UserContext";

export type UserState =
    | { status: "loading" }
    | { status: "anonymous" }
    | { status: "success"; user: User }
    | { status: "error"; message: string };


export default function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserState>({ status: "loading" });

    useEffect(() => {
        const token = readToken();

        if (!token) {
            setUser({ status: "anonymous" });
            return
        }

        async function loadUser() {
            try {
                const currUser: User = await getUser();
                setUser({ status: "success", user: currUser })
            } catch {
                clearToken()
                setUser({ status: "anonymous" })
            }
        }
        loadUser()
    }, [])

    async function login(email: string, password: string) {
        clearToken()
        const { token } = await userLogin({ email, password })
        writeToken(token)
        const currUser = await getUser()
        setUser({ status: "success", user: currUser })
    }

    function logout() {
        setUser({ status: "anonymous" })
        clearToken()
    }

    async function signUp(name: string, email: string, password: string) {
        await userRegister({ name, email, password })
    }



    const value = useMemo(() => { return { userState: user, signUp, login, logout } }, [user])

    return (
        <UserContext value={value}>{children}</UserContext>
    )
}