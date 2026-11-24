import { Outlet } from "react-router";
import NavBar from "../components/NavBar";

export function Layout(){
    return(<>
        <NavBar />
        <main>
            <Outlet />
        </main>
        {/* <Toast />
        <Footer /> */}
        </>
    )
}