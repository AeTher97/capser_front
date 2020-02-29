import React, {useEffect, useState} from 'react';
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import {BrowserRouter as Router} from "react-router-dom";
import MainNavigation from "./routes/MainNavigation";
import useMainStyle from "./styles/MainStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {AccountCircle, Add, FavoriteBorder, Games, SupervisorAccount} from "@material-ui/icons";
import {AuthenticationContext} from "./utils/AuthenticationContext";
import axios from 'axios';
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import FloatingActionButton from "./components/misc/FloatingActionButton";


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
            "name": "Sign In",
            "icon": <AccountCircle/>,
            "path": "/profile"
        },

            {
                "name": "Players",
                "icon": <SupervisorAccount/>,
                "path": "/players"
            }, {
                "name": "Games",
                "icon": <Games/>,
                "path": "/games"
            },
            {
                "name": "10 Commandments",
                "icon": <FavoriteBorder/>,
                "path": "/ten_commandments"
            }] :
        [{
            "name": user.username,
            "icon": <AccountCircle/>,
            "path": "/profile?id=" + user.id
        },
            {
                "name": "Add Game",
                "icon": <Add/>,
                "path": "/add"
            },
            {
                "name": "Players",
                "icon": <SupervisorAccount/>,
                "path": "/players"
            },
            {
                "name": "Games",
                "icon": <Games/>,
                "path": "/games"
            },

            {
                "name": "10 Commandments",
                "icon": <FavoriteBorder/>,
                "path": "/ten_commandments"
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

                        {user !== null ? <FloatingActionButton/> : ''}

                        <SideBar menuItems={menuItems}
                                 isMobileDrawerOpen={isMobileDrawerOpen}
                                 onMobileDrawerClose={() => {
                                     setIsMobileDrawerOpen(false)
                                 }}
                                 user={user}
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
