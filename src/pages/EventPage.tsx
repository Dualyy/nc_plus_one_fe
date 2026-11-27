import { useState } from "react";
import EventGrid from "../components/event-components/EventGrid";
import SearchBar from "../components/SearchBar";
import { useEventList } from "../hooks/useEventsList";
import type { BasicEvent } from "../types/Events";
import { useUserEventList } from "../hooks/useUserEventsList";

export default function EventPage() {

    const { eventListState, refetch } = useEventList();

    const [searchValue, setSearchValue] = useState("");

    const { userEventListState, refetch: refetchUserEvents } = useUserEventList();


    function onChangeHandler(value: string) {
        setSearchValue(value)
    }

    function allRefetch() {
        refetch((count) => count + 1);
        refetchUserEvents((count) => count + 1)
    }

    function eventFilter(events: BasicEvent[]) {

        const query = searchValue.trim().toLowerCase()
        if (query === '') return events

        const lowerCaseSearch = searchValue.toLowerCase()
        return events.filter((event) => event.title.toLowerCase().includes(lowerCaseSearch) || (event.location ?? 'online').toLowerCase().includes(lowerCaseSearch));

    }

    if (eventListState.status === "loading" || userEventListState.status === "loading") { return <p>test...</p> }
    if (eventListState.status === "error" || userEventListState.status === "error") { return <p>An error occured...</p> }

    if (userEventListState.status === "success" && userEventListState.userRsvpEventList === undefined) {
        return <p>Currently no events...</p>
    }


    else {
        return (<>
            <h2 className="header" id="header__event-page"> What's on?</h2>
            <p className="subtext" id="subtext__event-page">currently {eventListState.events.length} events in the UK</p>
            <SearchBar htmlId="event-search-bar" value={searchValue} changeHandler={onChangeHandler} />
            <hr></hr>

            <EventGrid userEventList={userEventListState.status === "success" ? userEventListState.userRsvpEventList.events : []} refetch={allRefetch} events={eventFilter(eventListState.events)} />

        </>)
    }



}    
