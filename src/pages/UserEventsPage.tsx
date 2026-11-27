import { useNavigate } from "react-router";
import EventGrid from "../components/event-components/EventGrid";
import useUser from "../hooks/useUser";
import { useUserEventList } from "../hooks/useUserEventsList";
import { useEffect } from "react";
import AuthForm from "../components/auth-components/AuthForm";

export default function UserEventsPage() {

    const { userEventList, isLoading, fetchEventError, refetch } = useUserEventList();
    const { userState } = useUser();
    const navigate = useNavigate()

    
    
  
    

    if (isLoading) {
        return <p>Loading ...</p>
    }

    if (userState.status === "anonymous") return <AuthForm mode="login" />

    if (userEventList === undefined) {
        return <p>Currently no events...</p>
    }

    

    return (<>
        {fetchEventError && <p>Error fetching events: {fetchEventError}</p>}
        {isLoading ? <p>Loading...</p> : <EventGrid userEventList={userEventList} refetch={()=> refetch((count)=> count +1)} events={userEventList} />}
    </>
    )
}