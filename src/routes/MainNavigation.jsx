import React from "react";
import {Route, Switch,} from "react-router-dom";

import useMainStyle from "../styles/MainStyles";
import PrivateRoute from "./PrivateRoute";
import SignInScreen from "../screen/SignInScreen";
import GamesScreen from "../screen/GamesScreen";


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

                <PrivateRoute path='/games'>
                    <GamesScreen/>
                </PrivateRoute>

                <PrivateRoute path='/players'>
                    <GamesScreen/>
                </PrivateRoute>


            </Switch>
        </main>)

}
