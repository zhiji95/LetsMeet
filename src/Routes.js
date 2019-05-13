import React from "react";
import { Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoutes";
import Login from "./components/Login";
import Signup from "./components/Signup";
import GroupControl from "./components/GroupControl";
import Chatbot from "./components/Chatbot";
import RenderMap from "./components/Map";


export default ({childProps}) =>
    <Switch>
        <AppliedRoute path="/" exact component={Login} props={childProps} />
        <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
        <AppliedRoute path="/groupControl" exact component={GroupControl} props={childProps} />
        <AppliedRoute path="/chatBot" exact component={Chatbot} props={childProps} />
        <AppliedRoute path="/map" exact component={RenderMap} props={childProps} />
    </Switch>;
