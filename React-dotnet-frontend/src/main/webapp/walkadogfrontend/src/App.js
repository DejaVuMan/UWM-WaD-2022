import React from "react";
import './App.css';
import NavigationBar from "./components/NavigationBar";
import {Container, Row, Col} from "react-bootstrap";
import Welcome from "./components/Welcome";
//import Footer from "./components/Footer";
import UserList from "./components/User/UserList";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import TrainerProfile from "./components/User/TrainerProfile";
import UpdateProfile from "./components/User/UpdateProfile";
import DogRegister from "./components/Dog/DogRegister";
import DogList from "./components/Dog/DogList";
import Home from "./components/Home";
import ReservationsUser from "./components/Reservations/ReservationsUser";
import ReservationsTrainer from "./components/Reservations/ReservationsTrainer";
//import AuthProvider from "../src/services/user/auth/authContext.js";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import DogProfile from "./components/Dog/DogProfile";
import TrainerList from "./components/User/TrainerList";
import UserProfile from "./components/User/UserProfile";
import UserView from "./components/Walk/UserView";

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
                  <Route path="/edit/:id" exact component={UpdateProfile}/>
                  <Route path="/users" exact component={UserList}/>
                  <Route path="/users/trainers" exact component={TrainerList}/>
                  <Route path="/trainers/:id" exact component={TrainerProfile}/>
                  <Route path="/users/:id" exact component={UserProfile}/>
                  <Route path="/users/:id/reservations" exact component={ReservationsUser}/>
                  <Route path="/register" exact component={Register}/>
                  <Route path="/login" exact component={Login}/>
                  <Route path="/dogs" exact component={DogList}/>
                  <Route exact path="/dogs/register" component={DogRegister}/>
                  <Route exact path="/dogs/:id" component={DogProfile}/>
                  <Route exact path ="/reservations/add" component={ReservationsTrainer}/>
                  <Route exact path="/reservations/:id" component={ReservationsUser}/>
                  <Route exact path="/useractive/:id" component={UserView}/>
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