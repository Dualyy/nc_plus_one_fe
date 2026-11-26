import { Route, Routes } from "react-router";
import { Layout } from "./pages/Layout";
import EventPage from "./pages/EventPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import EventDetailPage from "./pages/EventDetailPage";
import UserEventsPage from "./pages/UserEventsPage";
import EventFormPage from "./pages/EventFormPage";
import AttendeesPage from "./pages/AttendeesPage";

export default function AppRoutes() {

    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<h2>HelloWorld</h2>} />
                <Route path="/events" element={<EventPage />} />
                <Route path="/events/:id" element={<EventDetailPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/user/me/events" element={<UserEventsPage />} />
                <Route path="/events/create" element={<EventFormPage />} />
                <Route path="/events/:id/attendees" element={<AttendeesPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    )

}