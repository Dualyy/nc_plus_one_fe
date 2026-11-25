import { useNavigate } from "react-router";
import EventGrid from "../components/event-components/EventGrid";
import useUser from "../hooks/useUser";
import { useUserEventList } from "../hooks/useUserEventsList";

export default function UserEventsPage() {

    const { userEventList, isLoading, fetchEventError } = useUserEventList();
    const { userState } = useUser();
    const navigate = useNavigate()


    if (userState.status === "anonymous") navigate("/login")

    if (isLoading) {
        return <p>Loading ...</p>
    }

    if (userEventList === undefined) {
        return <p>Currently no events...</p>
    }

    return (<>
        {fetchEventError && <p>Error fetching events: {fetchEventError}</p>}
        {isLoading ? <p>Loading...</p> : <EventGrid events={userEventList} />}
    </>
    )
}