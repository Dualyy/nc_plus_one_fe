import { useState } from "react";
import EventGrid from "../components/event-components/EventGrid";
import SearchBar from "../components/SearchBar";
import { useEventList } from "../hooks/useEventsList";
import type { BasicEvent } from "../types/Events";

export default function EventPage() {

    const {eventList, isLoading, fetchEventError, refetch} = useEventList();

    const[searchValue,setSearchValue] = useState("");

    function onChangeHandler(value: string){
        setSearchValue(value)
    }

    function eventFilter(events: BasicEvent[]){

         const query = searchValue.trim().toLowerCase()
        if (query === '') return events
        
       const lowerCaseSearch = searchValue.toLowerCase()
        return events.filter((event)=> event.title.toLowerCase().includes(lowerCaseSearch)|| (event.location ?? 'online').toLowerCase().includes(lowerCaseSearch));
   
    }

    if(eventList === undefined){
        return <p>Currently no events...</p>
    }

    return (
    <>
    <SearchBar htmlId="event-search-bar"value={searchValue} changeHandler={onChangeHandler}/>
    {fetchEventError && <p>Error fetching events: {fetchEventError}</p>}
    {isLoading ? <p>Loading...</p> : <EventGrid events={eventFilter(eventList)} />}
        
    </>)
}