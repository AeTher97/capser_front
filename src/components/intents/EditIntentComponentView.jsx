import React from "react";
import useTileStyle from "../../styles/TileStyles";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import TrainingPhrasesListComponent from "./TrainingPhrasesListComponent";
import ExpansionPanelComponent from "./ExpansionPanelComponent";
import ParametersComponent from "./ParametersComponent";
import Button from "@material-ui/core/Button";
import ErrorAlert from "../misc/ErrorAlert";

export default function (props) {
    const tileStyles = useTileStyle();
    const styles = useStyles();

    let {trainingPhrases, parameters} = props;

    const parameterColors = parametersWithColour(parameters);

    const expansionPanels = [
        {
            name: 'Training Phrases',
            component: <TrainingPhrasesListComponent trainingPhrases={trainingPhrases}
                                                     onTrainingPhraseTextEdit={props.onTrainingPhraseTextEdit}
                                                     parameters={parameters}
                                                     parameterColors={parameterColors}
                                                     onParameterDelete={props.onParameterDelete}
                                                     onParameterAdd={props.onParameterAdd}
                                                     onParameterEntityChange={props.onParameterEntityChange}
                                                     onNewTrainingPhrase={props.onNewTrainingPhrase}
                                                     onTrainingPhraseDeleted={props.onTrainingPhraseDeleted}
            />
        },
        {
            name: 'Parameters',
            component: <ParametersComponent parameters={parameters} colors={parameterColors}/>
        },
    ];

    const getContent = () => {
        if (props.error) {
            return null
        } else if (props.isLoading) {
            return (
                <div className={styles.centeredRow}>
                    <CircularProgress/>
                </div>)
        } else {
            return (
                <div>
                    <div className={styles.header}>
                        <Typography variant="h5" component="h2">
                            {props.intentName}
                        </Typography>
                    </div>

                    <div>
                        {expansionPanels.map((item, index) => (
                            <ExpansionPanelComponent name={item.name} key={index}>
                                {item.component}
                            </ExpansionPanelComponent>
                        ))}
                    </div>

                    <div className={styles.buttonRow}>
                        <Button variant="contained" onClick={props.onEditCancel}>
                            Cancel
                        </Button>

                        <Button variant="contained" color="primary" onClick={props.onIntentSaved}>
                            Save
                        </Button>


                    </div>

                </div>)
        }

    };


    return (
        <div>
            <Typography className={tileStyles.cardTitle} color="textSecondary" gutterBottom>
                Intent
            </Typography>

            <ErrorAlert error={props.error}/>

            {getContent()}
        </div>

    )
}


const parametersWithColour = (params) => {
    const count = params.size;
    const step = 360 / count;
    let hue = 0;
    let colorMap = new Map();
    params.forEach((param) => {
        hue = Math.floor(hue + step);
        colorMap = colorMap.set(param.entityTypeDisplayName, `hsl(${hue}, 90%, 80%)`)
    });
    return colorMap;
};


const useStyles = makeStyles(theme => ({
    header: {
        marginBottom: 20,
    },
    centeredRow: {
        display: 'flex',
        justifyContent: 'center'
    },
    buttonRow: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: 30

    },
    root: {
        width: '100%',
    },
    elementList: {
        display: 'flex',
        flexDirection: 'column'
    }
}));