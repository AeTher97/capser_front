import React from "react";
import {Route, Switch,} from "react-router-dom";

import useMainStyle from "../styles/MainStyles";
import PrivateRoute from "./PrivateRoute";
import SignInScreen from "../screen/SignInScreen";
import GamesScreen from "../screen/GamesScreen";
import PlayserScreen from "../screen/PlayserScreen";
import AddGameScreen from "../screen/AddGameScreen";
import ProfileScreen from "../screen/ProfileScreen";
import RegisterScreen from "../screen/RegisterScreen";
import TenCommandments from "../components/misc/TenCommandments";


export default function (props) {
    const classes = useMainStyle();


    return (
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Switch>
                {/*{routes}*/}
                <Route path="/login">
                    <SignInScreen/>
                </Route>

                <Route path='/games'>
                    <GamesScreen/>
                </Route>

                <Route path='/players'>
                    <PlayserScreen/>
                </Route>

                <Route path='/register'>
                    <RegisterScreen/>
                </Route>

                <Route path='/ten_commandments'>
                    <TenCommandments/>
                </Route>


                <PrivateRoute path='/add'>
                    <AddGameScreen/>
                </PrivateRoute>

                <PrivateRoute path='/profile'>
                    <ProfileScreen/>
                </PrivateRoute>


            </Switch>
        </main>)

}
