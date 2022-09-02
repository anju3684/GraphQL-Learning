import "./App.css";
import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Booking from "./pages/Booking";
import Event from "./pages/Event";
import MainNavigation from "./components/Navigation/mainNavigation";
function App() {
  return (
    <BrowserRouter>
    <>
    <MainNavigation/>
    <main className="main_content">
      <Routes>
        <Route path="/" element={<Navigate to="/auth"></Navigate>} exact></Route>
        <Route path="/auth" element={<Auth/>}></Route>
        <Route path="/events" element={<Event/>}></Route>
        <Route path="/bookings" element={<Booking/>}></Route>
      </Routes>
      </main>
      </>
    </BrowserRouter>
  );
}

export default App;
