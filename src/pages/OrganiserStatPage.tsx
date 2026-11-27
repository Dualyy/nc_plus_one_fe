import { useParams } from "react-router";
import useOrganiserStats from "../hooks/useOrganiserStats";
import { useUserEventList } from "../hooks/useUserEventsList";
import { useEventList } from "../hooks/useEventsList";

export default function OrganiserStatPage() {

    const { id } = useParams();
    const { organiserStatState } = useOrganiserStats(Number(id))

    if (organiserStatState.status === "loading") return <p>Loading...</p>
    if (organiserStatState.status === "error") return <p>{organiserStatState.msg}</p>

    const organiser = organiserStatState.stats

    return (<>
        <h2>Organiser stats</h2>
        <h3 className="organiser-stats__name-header">{organiser.name}</h3>
        <hr></hr>
        <p>Organiser rank: {organiser.organiser_rank}</p>
        <p>Average attendance: {organiser.avg_attendance}</p>
        <p>Total events: {organiser.total_events}</p>
        <p>Best attendend count: {organiser.best_attended_count}</p>

    </>)
}