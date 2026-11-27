import { useParams } from "react-router";
import { useEvent } from "../hooks/useEvent";
import useAttendees from "../hooks/useAttendees";




export default function AttendeesPage() {

    const { id } = useParams();
    const { event, isLoading} = useEvent(id);
    const {attendeesState} = useAttendees(id!);

    if(attendeesState.status==="loading" || isLoading) return <p>Loading...</p>
    if(attendeesState.status==="error") return <p>{attendeesState.msg} attendees</p>

    if(attendeesState.attendees.length === 0) return <p>No attendees</p>

    return (<>
        <section>
            <h2>{event?.title}</h2>
            <p>{!isLoading ? event?.location : "Loading..."}</p>
        </section>
        <section>
            <table className="user-tabe">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">email</th>
                    </tr>
                </thead>
                <tbody>
                    {attendeesState.attendees.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </section>
    </>
    )

}