import React, {useContext, useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import EditIntentComponentView from "./EditIntentComponentView";
import axios from "axios";
import {Map} from "immutable";
import {v1 as uuidv1} from 'uuid';
import {AgentLanguageContext} from "../../utils/AgentLanguageContext";


export default function () {

    const [isLoading, setIsLoading] = useState(true);
    const [trainingPhrases, setTrainingPhrases] = useState(new Map());
    const [intentDisplayName, setIntentDisplayName] = useState("");
    const [error, setError] = useState(null);
    const [parameters, setParameters] = useState(new Map());
    const [originalIntent, setOriginalIntent] = useState(null);
    const history = useHistory();
    const {agentLanguage} = useContext(AgentLanguageContext);
    const {id} = useParams();

    useEffect(() => {
        if (!!agentLanguage) {
            const url = `${process.env.REACT_APP_MANAGER_URL}/intents/${id}?languageCode=${agentLanguage}`;

            axios.get(url)
                .then((res) => {
                    let intent = res.data;

                    setIntentDisplayName(intent.displayName);
                    setTrainingPhrases(asImmutableMap(intent.trainingPhrases));
                    setParameters(asImmutableMap(intent.parameters));
                    setIsLoading(false);
                    setOriginalIntent(intent)
                })
                .catch(err => {
                    console.log(err.message);
                    setError(err);
                    setIsLoading(false)
                });
        }

    }, [id, agentLanguage]);

    const handleTrainingPhraseTextEdit = (editedPhrase, partIndex, value) => {
        let updatedPhrase = trainingPhrases.get(editedPhrase.id);
        updatedPhrase.parts[partIndex].text = value;
        setTrainingPhrases(trainingPhrases.set(editedPhrase.id, {...updatedPhrase}))
    };

    const handleDeleteParameterFromPhrase = (updatedPhrase, partIndex) => {
        const phraseParts = updatedPhrase.parts;
        phraseParts[partIndex] = {text: updatedPhrase.parts[partIndex].text};


        let reducedParts = phraseParts.reduce((previousValue, currentValue) => {
            if (!Array.isArray(previousValue)) {
                if (previousValue.entityType || currentValue.entityType) {
                    return [previousValue, currentValue]
                } else {

                    let text = previousValue.text + currentValue.text;
                    return [{text: text}]
                }
            } else {
                let lastPart = previousValue[previousValue.length - 1];
                if (lastPart.entityType || currentValue.entityType) {
                    return [...previousValue, currentValue]
                } else {

                    let withoutLast = previousValue.slice(0, previousValue.length - 1);
                    let text = lastPart.text + currentValue.text;
                    return [...withoutLast, {text: text}]
                }
            }
        });

        if (!Array.isArray(reducedParts)) {
            reducedParts = [reducedParts]
        }

        setTrainingPhrases(trainingPhrases.set(updatedPhrase.id, {...updatedPhrase, parts: reducedParts}))

    };

    const handleParameterAdded = (selection, parameter) => {
        const {trainingPhrase, partIndex} = selection;
        const phraseParts = trainingPhrase.parts;

        const originalPart = trainingPhrase.parts[partIndex];

        let firstPartText = originalPart.text.slice(0, selection.selectionStart);
        let middlePartText = originalPart.text.slice(selection.selectionStart, selection.selectionEnd);
        let lastPartText = originalPart.text.slice(selection.selectionEnd);

        let newParts = [];

        if (firstPartText.length > 0) {
            newParts.push({text: firstPartText})
        }

        if (middlePartText.length > 0) {
            newParts.push(
                {
                    text: middlePartText,
                    entityType: parameter.entityTypeDisplayName,
                    alias: parameter.displayName,
                    userDefined: true
                })
        }

        if (lastPartText.length > 0) {
            newParts.push({text: lastPartText})
        }

        let allParts = [...phraseParts.slice(0, partIndex), ...newParts, ...phraseParts.slice(partIndex + 1)];
        setTrainingPhrases(trainingPhrases.set(selection.trainingPhrase.id, {...trainingPhrase, parts: allParts}))
    };

    const handleParameterEntityChanged = (updatedPhrase, partIndex, parameter) => {
        const phraseParts = updatedPhrase.parts;
        phraseParts[partIndex] = {
            text: updatedPhrase.parts[partIndex].text,
            entityType: parameter.entityTypeDisplayName,
            alias: parameter.displayName,
            userDefined: true
        };

        setTrainingPhrases(trainingPhrases.set(updatedPhrase.id, {...updatedPhrase, parts: phraseParts}))
    };

    const handleNewTrainingPhrase = (newPhraseText) => {
        const newPhraseId = uuidv1();
        const newPhrase = {
            id: newPhraseId,
            type: "EXAMPLE",
            parts: [
                {text: newPhraseText}
            ]
        };

        setTrainingPhrases(trainingPhrases.set(newPhraseId, newPhrase))
    };

    const updateIntent = () => {
        setIsLoading(true);
        const url = `${process.env.REACT_APP_MANAGER_URL}/intents?languageCode=${agentLanguage}`;

        let trainingPhraseList = [];

        trainingPhrases.toIndexedSeq().forEach(value => {
            trainingPhraseList.push(value)
        });

        console.log('phrase list', trainingPhraseList);

        const intent = {
            ...originalIntent,
            trainingPhrases: trainingPhraseList
        };

        const body = {
            intent,
            updateMask: ['training_phrases']
        };

        axios.post(url, body)
            .then((res) => {
                let intent = res.data;

                setIntentDisplayName(intent.displayName);
                setTrainingPhrases(asImmutableMap(intent.trainingPhrases));
                setParameters(asImmutableMap(intent.parameters));
                setIsLoading(false);
                setOriginalIntent(intent)
            })
            .catch(err => {
                console.log(err);
                console.log(err.message);
                setError(err);
                setIsLoading(false)
            });
    };

    const handleTrainingPhraseDeleted = (trainingPhrase) => {
        setTrainingPhrases(trainingPhrases.delete(trainingPhrase.id))
    };

    const handleEditCancel = () => {
        history.push('/intents')
    };

    return (<EditIntentComponentView intentName={intentDisplayName}
                                     trainingPhrases={trainingPhrases}
                                     onTrainingPhraseTextEdit={handleTrainingPhraseTextEdit}
                                     parameters={parameters}
                                     onParameterDelete={handleDeleteParameterFromPhrase}
                                     onParameterAdd={handleParameterAdded}
                                     onParameterEntityChange={handleParameterEntityChanged}
                                     onNewTrainingPhrase={handleNewTrainingPhrase}
                                     onTrainingPhraseDeleted={handleTrainingPhraseDeleted}
                                     onIntentSaved={updateIntent}
                                     onEditCancel={handleEditCancel}
                                     isLoading={isLoading}
                                     error={error}
    />)

}


const asImmutableMap = (itemsWithId) => {
    let map = new Map();
    itemsWithId.forEach(item => {
        map = map.set(item.id, item)
    });
    return map;
};