import React from 'react';
import {makeStyles} from "@material-ui/core";
import AutosizeInput from "react-input-autosize/lib/AutosizeInput";

const TrainingPhraseEditComponent = (props) => {
    const style = useStyle();

    const handleParameterClicked = (currentTarget, index) => {
        props.onParameterClicked(currentTarget, props.trainingPhrase, index);
    };

    const partialInputs = props.trainingPhrase.parts.map((part, index) => {

        let color = props.colors.get(part.entityType);
        if (!part.entityType) {
            return (<AutosizeInput
                onMouseUp={() => {
                    let selection = getSelection();
                    props.onTextSelected({
                        ...selection,
                        trainingPhrase: props.trainingPhrase,
                        part: part,
                        partIndex: index
                    })
                }}
                key={index}
                name="form-field-name"
                value={part.text}
                inputStyle={{border: 0, padding: 0, fontSize: 14, outline: 'none', outlineWidth: 0}}
                onChange={event => {
                    props.onTextEdit(props.trainingPhrase, index, event.target.value)
                }}
            />);
        } else {
            return (
                <div key={index}
                     style={{backgroundColor: color}}
                     onClick={(event) => handleParameterClicked(event.currentTarget, index)}
                >
                    {part.text}
                </div>
            )
        }

    });

    return (
        <div className={style.row}>
            {partialInputs}
        </div>
    );
};

const useStyle = makeStyles(theme => ({
    row: {
        display: 'flex',
    },
    paper: {
        border: '1px solid',
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
    },
}));


function getSelection() {
    let text = "";
    let activeEl = document.activeElement;
    let activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if (
        (activeElTagName === "textarea") || (activeElTagName === "input" &&
        /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
        (typeof activeEl.selectionStart == "number")
    ) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);

        return {
            selectionStart: activeEl.selectionStart,
            selectionEnd: activeEl.selectionEnd,
            element: activeEl,
            text,
        }
    } else {
        return null;
    }
}

export default TrainingPhraseEditComponent;

