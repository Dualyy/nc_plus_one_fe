import { useState } from "react";
import useUser from "../../hooks/useUser"
import { useNavigate } from "react-router"

export default function LogInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate()


    const { login } = useUser();

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setIsSubmitting(true);
        try {
            await login(email, password);
            setEmail("");
            setPassword("");
            navigate("/")
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
            console.log(err instanceof Error && err.message)
            setEmail("");
            setPassword("");
            setIsSubmitting(false);
        }
    }
    return (
        <form onSubmit={(event) => handleSubmit(event)}>
            <p>Log in</p>
            <label htmlFor="email">
                Email
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </label>
            <label htmlFor="password">
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                password
            </label>
            <button>Submit</button>
        </form>
    );
}
