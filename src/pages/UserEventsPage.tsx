import EventGrid from "../components/event-components/EventGrid";
import useUser from "../hooks/useUser";
import { useUserEventList } from "../hooks/useUserEventsList";
import AuthForm from "../components/auth-components/AuthForm";

export default function UserEventsPage() {

    const { userEventListState, refetch } = useUserEventList();
    const { userState } = useUser();

    if (userEventListState.status === "loading") {
        return <p>Loading ...</p>
    }

    if (userState.status === "anonymous") return <AuthForm mode="login" />
    if (userEventListState.status === "error") return <p>Something went wrong: {userEventListState.msg}</p>

    if (userEventListState.status === undefined) {
        return <p>Currently no events...</p>
    }
    if (userEventListState.status === "anonymous") return <p>Something went wrong.</p>



    return (<>
        <EventGrid userEventList={userEventListState.userRsvpEventList.events} refetch={() => refetch((count) => count + 1)} events={userEventListState.userRsvpEventList.events} />
    </>
    )
}