import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import AuthPage from "./pages/Auth";
import Bookings from "./pages/Bookings";
import Events from "./pages/Events";
import MainNavigation from "./components/navigation/MainNavigation";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <MainNavigation/>
                    <main className="main-content">
                        <Switch>
                            <Redirect from="/" to="/auth" exact/>
                            <Route path="/auth" component={AuthPage}/>
                            <Route path="/events" component={Events}/>
                            <Route path="/bookings" component={Bookings}/>
                        </Switch>
                    </main>
                </React.Fragment>
            </BrowserRouter>
        );
    }
}

export default App;
