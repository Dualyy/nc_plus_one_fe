import LogInForm from "../components/login-components/LogInForm";
import useUser from "../hooks/useUser";

export default function LoginPage() {

    const {userState, logout} = useUser();
    console.log(userState)

    function onClickHandler(){
    logout()
  }

    return (
    <>
        {userState.status=== "anonymous" && <LogInForm />}
        
        {userState.status === "success" && <button type="button" onClick={()=> onClickHandler()}>Logout</button>}
    </>
  );
}
