import React, {useEffect, useState} from 'react';
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import TrainingPhraseEditComponent from "./TrainingPhraseEditComponent";
import ParameterDetailsPopoverComponent from "./ParameterDetailsPopoverComponent";
import NewTrainingPhraseForm from "./NewTrainingPhraseForm";
import {makeStyles} from "@material-ui/core/styles";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';

const TrainingPhrasesListComponent = (props) => {
    const styles = useStyles();
    const [editParamPopoverAnchorEl, setEditParamPopoverAnchorEl] = useState(null);
    const [focusedPartIndex, setFocusedPartIndex] = useState(null);
    const [focusedPhrase, setFocusedPhrase] = useState(null);
    const [newParamPopoverAnchorEl, setNewParamPopoverAnchorEl] = useState(null);
    const isEditParamPopoverOpen = editParamPopoverAnchorEl != null;
    const isNewParamPopoverOpen = newParamPopoverAnchorEl != null;
    const [entityToParam, setEntityToParam] = useState(new Map());
    const [parameterSelection, setParameterSelection] = useState(null);

    useEffect(() => {
        setFocusedPartIndex(null)
    }, [props.trainingPhrases]);

    useEffect(() => {
        let map = new Map();
        props.parameters.toIndexedSeq().forEach((param) => {
            map = map.set(param.entityTypeDisplayName, param)
        });

        setEntityToParam(map)
    }, [props.parameters]);

    useEffect(() => {
        if (editParamPopoverAnchorEl == null) {
            setFocusedPartIndex(null);
            setFocusedPhrase(null)
        }
    }, [editParamPopoverAnchorEl]);

    const handleParameterClicked = (currentTarget, trainingPhrase, partIndex) => {
        setEditParamPopoverAnchorEl(editParamPopoverAnchorEl ? null : currentTarget);
        setFocusedPhrase(trainingPhrase);
        setFocusedPartIndex(partIndex)
    };

    const handleParameterDeleted = () => {
        setEditParamPopoverAnchorEl(null);
        props.onParameterDelete(focusedPhrase, focusedPartIndex)
    };


    const handleTextSelected = (selection) => {
        if (selection.text.length > 0) {
            setNewParamPopoverAnchorEl(selection.element);
            setParameterSelection(selection)
        }
    };

    const getParamByPartIndex = (partIndex) => {
        if (!focusedPhrase) {
            return null;
        }
        const part = focusedPhrase.parts[partIndex];
        if (part === undefined) {
            return undefined;
        }
        return entityToParam.get(part.entityType);
    };

    const formattedTrainingPhrases = props.trainingPhrases.toIndexedSeq().map((item, index) => {
        return <div key={index}>
            {index !== 0 ? <Divider/> : null}
            <ListItem>
                <TrainingPhraseEditComponent trainingPhrase={item}
                                             parameters={props.parameters}
                                             colors={props.parameterColors}
                                             onTextEdit={props.onTrainingPhraseTextEdit}
                                             onParameterDelete={props.onParameterDelete}
                                             onParameterClicked={handleParameterClicked}
                                             onTextSelected={handleTextSelected}
                />

                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="comments" onClick={() => props.onTrainingPhraseDeleted(item)}>
                        <DeleteIcon fontSize="small"/>
                    </IconButton>
                </ListItemSecondaryAction>

            </ListItem>
        </div>
    });

    const handleParameterAdded = (parameter) => {
        setNewParamPopoverAnchorEl(null);
        return props.onParameterAdd(parameterSelection, parameter)
    };

    const handleParameterChanged = (parameter) => {
        setEditParamPopoverAnchorEl(null);
        return props.onParameterEntityChange(focusedPhrase, focusedPartIndex, parameter)
    };

    return (
        <div className={styles.root}>
            <List>
                {formattedTrainingPhrases}
            </List>

            <NewTrainingPhraseForm onSubmit={props.onNewTrainingPhrase}/>

            <ParameterDetailsPopoverComponent open={isEditParamPopoverOpen}
                                              anchorEl={editParamPopoverAnchorEl}
                                              onClose={() => setEditParamPopoverAnchorEl(null)}
                                              parameter={getParamByPartIndex(focusedPartIndex)}
                                              parameters={props.parameters}
                                              onDelete={handleParameterDeleted}
                                              onParameterSelected={handleParameterChanged}
            />

            <ParameterDetailsPopoverComponent open={isNewParamPopoverOpen}
                                              anchorEl={newParamPopoverAnchorEl}
                                              onClose={() => setNewParamPopoverAnchorEl(null)}
                                              parameters={props.parameters}
                                              onParameterSelected={handleParameterAdded}
            />

        </div>
    );
};

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
    },
}));

export default TrainingPhrasesListComponent;