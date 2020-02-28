import React, {useEffect, useState} from 'react';
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import {BrowserRouter as Router} from "react-router-dom";
import MainNavigation from "./routes/MainNavigation";
import useMainStyle from "./styles/MainStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Add, Games, LockOpen, SupervisorAccount} from "@material-ui/icons";
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
            primary: {main: 'rgb(255,0,0)'},
            secondary: green,
        },
        status: {
            danger: 'orange',
        },
    });
    const [theme, setTheme] = useState(() => {
        let localData = localStorage.getItem('theme');
        if (!localData) {
            return darkTheme;
        }
        localData = JSON.parse(localData);

        return localData;

    });
    const [themeName, setThemeName] = useState(() => {
        let localData = localStorage.getItem('themeName');
        if (!localData) {
            setTheme(darkTheme);
            return 'dark';
        }

        if (localData === 'light') {
            setTheme(lightTheme);
        } else {
            setTheme(darkTheme);
        }
        return localData;

    });


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

    axios.interceptors.response.use((res) => {
        return Promise.resolve(res);
    }, (error) => {
        if (error != null && error.response.status === 401) {
            console.log('xdd')
            setUser(null);
            localStorage.removeItem('user');
        }
        return Promise.reject(error);
    });


    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));

        }
    }, [user]);

    useEffect(() => {
        if (theme) {
            localStorage.setItem('theme', JSON.stringify(theme));
            localStorage.setItem('themeName', themeName);
        }
    }, [theme]);


    const handleDrawerButton = () => {
        setIsMobileDrawerOpen(!isMobileDrawerOpen);
    };

    const menuItems = !user ? [{
            "name": "Login",
            "icon": <LockOpen/>,
            "path": "/login"
        }, {
            "name": "Add Game",
            "icon": <Add/>,
            "path": "/add"
        }, {
            "name": "Games",
            "icon": <Games/>,
            "path": "/games"
        },
            {
                "name": "Players",
                "icon": <SupervisorAccount/>,
                "path": "/players"
            }] :
        [{
            "name": "Add Game",
            "icon": <Add/>,
            "path": "/add"
        }, {
            "name": "Games",
            "icon": <Games/>,
            "path": "/games"
        },
            {
                "name": "Players",
                "icon": <SupervisorAccount/>,
                "path": "/players"
            }];


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
