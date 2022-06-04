import React from "react";
import './App.css';
import NavigationBar from "./components/NavigationBar";
import {Container, Row, Col} from "react-bootstrap";
import Welcome from "./components/Welcome";
//import Footer from "./components/Footer";
import Task from "./components/Task/Task";
import TaskList from "./components/Task/TaskList";
import UserList from "./components/User/UserList";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import TrainerProfile from "./components/User/TrainerProfile";
import UpdateProfile from "./components/User/UpdateProfile";
import DogRegister from "./components/Dog/DogRegister";
import DogList from "./components/Dog/DogList";
import Home from "./components/Home";
import Reservations from "./components/Reservations/Reservations";

//import AuthProvider from "../src/services/user/auth/authContext.js";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import DogProfile from "./components/Dog/DogProfile";

const App = () => {
  window.onbeforeunload = (event) => {
    const e = event || window.event;
    e.preventDefault();
    if (e) {
      e.returnValue = '';
    }
    return '';
  }
  return (
    <Router>
      <NavigationBar/>
        <Container>
            <Row>
              <Col lg={12} className="marginTop">
                <Switch>
                  <Route path="/" exact component={Welcome}/>
                  <Route path="/home" exact component={Home}/>
                  <Route path="/add" exact component={Task}/>
                  <Route path="/edit/:id" exact component={UpdateProfile}/>
                  <Route path="/list" exact component={TaskList}/>
                  <Route path="/users" exact component={UserList}/>
                  <Route path="/users/:id" exact component={TrainerProfile}/>
                  <Route path="/users/:id/reservations" exact component={Reservations}/>
                  <Route path="/register" exact component={Register}/>
                  <Route path="/login" exact component={Login}/>
                  <Route path="/dogs" exact component={DogList}/>
                  <Route path="/dogs/:id" exact component={DogProfile}/>
                  <Route path="/dogs/register" exact component={DogRegister}/>
                  <Route path="/logout" exact component={() => <Login message = "Wylogowano pomyślnie."/>}/>
                </Switch>
              </Col>
            </Row>
        </Container>
        {/* <Footer/> */}
    </Router>
  );
}

export default App;