import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {Map} from 'immutable';
import axios from 'axios';
import IntentListComponentView from "./IntentListComponentView";
import {AgentLanguageContext} from "../../../utils/AgentLanguageContext";

export default function () {

    const [intentMap, setIntentMap] = useState(new Map());
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const history = useHistory();
    const {agentLanguage} = useContext(AgentLanguageContext);

    useEffect(() => {
        console.log('update intents', agentLanguage)
        if (!!agentLanguage) {
            const url = `${process.env.REACT_APP_MANAGER_URL}/intents/all?languageCode=${agentLanguage}`;

            axios.get(url)
                .then((res) => {
                    let items = res.data.intents;
                    items.forEach((item) => {
                        item.expanded = false
                    });

                    let newMap = new Map();

                    items.forEach(item => {
                        newMap = newMap.set(item.name, item)
                    });

                    setIntentMap(newMap);
                    setIsLoading(false)
                })
                .catch(err => {
                    console.log(err.message);
                    setError(err);
                    setIsLoading(false)
                });
        }

    }, [agentLanguage]);

    const navigateToEditScreen = (intent) => {
        const intentId = intent.name.replace('projects/embedded-test-yordiy/agent/intents/', '');
        history.push(`/intents/${intentId}`)
    };


    const handleIntentExpanded = (intent) => {
        setIntentMap(intentMap.set(intent.name, {...intent, expanded: !intent.expanded}))
    };

    return <IntentListComponentView intents={intentMap}
                                    onIntentExpand={handleIntentExpanded}
                                    isLoading={isLoading}
                                    error={error}
                                    navigateToEditScreen={navigateToEditScreen}
    />
}