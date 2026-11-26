import { useState } from "react";
import useRSVP from "../../hooks/useRSVPs";
import useUser from "../../hooks/useUser";
import { useUserEventList } from "../../hooks/useUserEventsList";
import type { BasicEvent } from "../../types/Events";
import { useNavigate } from "react-router";


interface RsvpButtonProps {
    event: BasicEvent;
    userEventList:BasicEvent[]
    refetch: () => void;
}


export function RsvpButton({ event, userEventList, refetch }: RsvpButtonProps) {


    const { toggleRSVP, currId, rsvpError } = useRSVP(refetch);
    const { userState } = useUser()

    const isGoing = userEventList.some((rsvpEvent) => rsvpEvent.id === event.id);
    const navigate = useNavigate();
  
    if (userState.status === "anonymous") {
        return <button onClick={() => navigate("/login")}>Log in to RSVP</button>;
    }


    return (
        <>
            <button disabled={currId !== null} onClick={() => toggleRSVP(String(event.id), isGoing)}>
                {isGoing ? "Cancel RSVP" : "RSVP"}
            </button>
            {rsvpError && <p>Couldn't update your RSVP. Please try again.</p>}
        </>
    );
}