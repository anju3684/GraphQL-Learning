import "./App.css";
import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Booking from "./pages/Booking";
import Event from "./pages/Event";
import MainNavigation from "./components/Navigation/mainNavigation";
import AuthContext from "./context/auth-context";
import { Component } from "react";
class App extends Component {

  state = {
    token: null,
    userId: null
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render(){
  return (
    <BrowserRouter>
    <>
    <AuthContext.Provider value={{
      token: this.state.token,
      userId: this.state.userId,
      login: this.login,
      logout: this.logout
    }}>
    <MainNavigation/>
    <main className="main_content">
      <Routes>
        {!this.state.token && <Route path="*" element={<Navigate to="/auth"></Navigate>} exact></Route>}
        {this.state.token && <Route path="/" element={<Navigate to="/events"></Navigate>} exact></Route>}
        {this.state.token && <Route path="/auth" element={<Navigate to="/events"></Navigate>} exact></Route>}
       
        <Route path="/events" element={<Event/>}></Route>
        {this.state.token && <Route path="/bookings" element={<Booking/>}></Route>}
        {!this.state.token && <Route path="/auth" element={<Auth/>}></Route>}
      </Routes>
      </main>
      </AuthContext.Provider>
      </>
    </BrowserRouter>
  );
  }
}

export default App;
