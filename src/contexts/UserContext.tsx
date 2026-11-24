import { createContext} from "react"
import type { UserState } from "./Provider/UserProvider";





export interface UserContextValue {
    userState: UserState;
    login: (email: string, password: string) => Promise<void>;
    signUp: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const UserContext = createContext<UserContextValue | null>(null);


