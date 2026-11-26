import AuthForm from "../components/auth-components/AuthForm";
import useUser from "../hooks/useUser";

export default function LoginPage() {

    const {userState, logout} = useUser();

    function onClickHandler(){
    logout()
  }

    return (
    <>
        {userState.status=== "anonymous" && <AuthForm  mode="signup"/>}
        {userState.status === "success" && <button type="button" onClick={()=> onClickHandler()}>Logout</button>}
    </>
  );
}
