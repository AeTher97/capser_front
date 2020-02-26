import React, {useEffect, useState} from 'react';
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import {BrowserRouter as Router} from "react-router-dom";
import MainNavigation from "./routes/MainNavigation";
import useMainStyle from "./styles/MainStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {SupervisorAccount} from "@material-ui/icons";
import {AuthenticationContext} from "./utils/AuthenticationContext";
import {AgentLanguageContext} from "./utils/AgentLanguageContext";
import axios from 'axios';

function App() {

    const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

    const [user, setUser] = useState(null);
    const [agentLanguage, setAgentLanguage] = useState(null);
    const [supportedLanguages, setSupportedLanguages] = useState([]);

    const classes = useMainStyle();

    console.log(process.env.REACT_APP_MANAGER_URL);
    console.log(process.env.REACT_APP_LOGS_MANAGER_URL);
    useEffect(() => {
        if (user) {
            const url = `${process.env.REACT_APP_MANAGER_URL}/agent/info`;
            axios.get(url)
                .then(res => {
                    const agentInfo = res.data;
                    const allSupportedLanguages = [...agentInfo.supportedLanguageCodes, agentInfo.defaultLanguageCode];
                    setSupportedLanguages(allSupportedLanguages);
                    setAgentLanguage(agentInfo.defaultLanguageCode)
                })
                .catch(err => {
                    console.log(err.message);
                    alert(err.message)
                })
        }
    }, [user]);


    const handleDrawerButton = () => {
        setIsMobileDrawerOpen(!isMobileDrawerOpen);
    };

    const menuItems = [
        {
            "name": "Games",
            "icon": <SupervisorAccount/>,
            "path": "/games"
        },
        {
            "name": "Players",
            "icon": <SupervisorAccount/>,
            "path": "/players"
        },
    ];

    return (
        <div className={classes.root}>
            <AuthenticationContext.Provider value={{user, setUser}}>
                <AgentLanguageContext.Provider value={{agentLanguage, setAgentLanguage, supportedLanguages}}>

                    <CssBaseline/>
                    <TopBar onDrawerToggle={handleDrawerButton}
                            isDrawerOpen={isMobileDrawerOpen}

                    />

                    <Router basename={process.env.PUBLIC_URL}>
                        <SideBar menuItems={menuItems}
                                 isMobileDrawerOpen={isMobileDrawerOpen}
                                 onMobileDrawerClose={() => {
                                     setIsMobileDrawerOpen(false)
                                 }}
                        />

                        <MainNavigation items={menuItems}/>


                    </Router>
                </AgentLanguageContext.Provider>
            </AuthenticationContext.Provider>

        </div>
    );
}

export default App;
