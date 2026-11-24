import { Route, Routes } from "react-router";
import { Layout } from "./pages/Layout";
import EventPage from "./pages/EventPage";
import EventDetail from "./components/event-components/EventDetail";
import LoginPage from "./pages/LoginPage";

export default function AppRoutes() {

    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<h2>HelloWorld</h2>} />
                <Route path="/events" element={<EventPage />} />
                <Route path="/events/:id" element={<EventDetail />} />
                {/* <Route path="/pokedex/:id" element={<PokemonPage />} /> */}
                <Route path="/login" element={<LoginPage />} />
                {/* <Route path="*" element={<NotFoundPage />} /> */}
            </Route>
        </Routes>
    )

}