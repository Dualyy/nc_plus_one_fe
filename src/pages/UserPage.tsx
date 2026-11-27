import AuthForm from "../components/auth-components/AuthForm";
import useUser from "../hooks/useUser";

export default function UserPage() {

    const { userState, logout } = useUser();

    if (userState.status === "loading") return <p>Loading...</p>
    if (userState.status === "anonymous") return <AuthForm mode="login" />

    return (<div className="user-settings-container">
        <h2 className="user-settings-header">User settings:</h2>
        <br />
        <button type="button" onClick={()=> logout()}>Logout</button>
    </div>
    )
}