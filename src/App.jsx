import React, {useEffect, useState} from 'react';
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import {BrowserRouter as Router} from "react-router-dom";
import MainNavigation from "./routes/MainNavigation";
import useMainStyle from "./styles/MainStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Games, LockOpen, SupervisorAccount} from "@material-ui/icons";
import {AuthenticationContext} from "./utils/AuthenticationContext";
import axios from 'axios';
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";

function App() {

    const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

    const darkTheme = createMuiTheme({
        palette: {
            type: "dark",
            primary: {main: 'rgb(255,0,0)'},
            secondary: green,
        },
        status: {
            danger: 'orange',
        },
    });

    const lightTheme = createMuiTheme({
        palette: {
            primary: {main: 'rgb(201,8,24)'},
            secondary: green,
        },
        status: {
            danger: 'orange',
        },
    });
    const [theme, setTheme] = useState(darkTheme);
    const [themeName, setThemeName] = useState('dark');


    const changeTheme = (event) => {
        const innerTheme = event.target.value;
        setThemeName(innerTheme);
        if (innerTheme === 'dark') {
            setTheme(darkTheme)
        }
        if (innerTheme === 'light') {
            setTheme(lightTheme)
        }
    };

    const [user, setUser] = useState(() => {
        let localData = localStorage.getItem('user');
        if (!localData) {
            return null;
        }
        localData = JSON.parse(localData);

        return localData;

    });

    const classes = useMainStyle();


    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            axios.interceptors.request.use(function (config) {
                config.headers.Authorization = user.token;
                return config;
            });
        }
    }, [user]);


    const handleDrawerButton = () => {
        setIsMobileDrawerOpen(!isMobileDrawerOpen);
    };

    const menuItems = [
        {
            "name": "Login",
            "icon": <LockOpen/>,
            "path": "/login"
        },
        {
            "name": "Games",
            "icon": <Games/>,
            "path": "/games"
        },
        {
            "name": "Players",
            "icon": <SupervisorAccount/>,
            "path": "/players"
        }

    ];

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <AuthenticationContext.Provider value={{user, setUser}}>

                    <CssBaseline/>
                    <TopBar onDrawerToggle={handleDrawerButton}
                            isDrawerOpen={isMobileDrawerOpen}
                            theme={themeName}
                            changeTheme={changeTheme}
                    />

                    <Router basename={process.env.PUBLIC_URL}>
                        <SideBar menuItems={menuItems}
                                 isMobileDrawerOpen={isMobileDrawerOpen}
                                 onMobileDrawerClose={() => {
                                     setIsMobileDrawerOpen(false)
                                 }}
                                 logout={() => {
                                     console.log("logging out");
                                     localStorage.removeItem('user');
                                     setUser(null);
                                 }}
                        />

                        <MainNavigation items={menuItems}/>


                    </Router>
                </AuthenticationContext.Provider>

            </div>
        </ThemeProvider>
    );
}

export default App;
