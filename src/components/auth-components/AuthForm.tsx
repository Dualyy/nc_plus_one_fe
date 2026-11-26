import { useState } from "react";
import useUser from "../../hooks/useUser"
import { useNavigate } from "react-router"

type AuthFormProps = { mode: "login" | "signup" }

export default function AuthForm(authMode: AuthFormProps) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSignup, setIsSignUp] = useState(authMode.mode === "signup")
    const navigate = useNavigate()


    const { login, signUp } = useUser();

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setIsSubmitting(true);
        try {
            if (authMode.mode === "login") {
                await login(email, password);
                setEmail("");
                setPassword("");
                navigate("/")
            } else {
                await signUp(name, email, password);
                setEmail("");
                setPassword("");
                navigate("/login")
            }

        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
            setEmail("");
            setPassword("");
            setIsSubmitting(false);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h1>{isSignup ? "Create an account" : "Log in"}</h1>

            {isSignup && (
                <label htmlFor="name">
                    Name
                    <input
                        id="name"
                        name="name"
                        autoComplete="name"
                        required
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </label>
            )}

            <label htmlFor="email">
                Email
                <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </label>

            <label htmlFor="password">
                Password
                <input
                    type="password"
                    id="password"
                    name="password"
                    autoComplete={isSignup ? "new-password" : "current-password"}
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </label>

            {error && <p role="alert">{error}</p>}

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Please wait…" : isSignup ? "Sign up" : "Log in"}
            </button>
        </form>
    )
}
