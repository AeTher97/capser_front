import React, {useContext} from 'react';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {AgentLanguageContext} from "../../../utils/AgentLanguageContext";
import makeStyles from "@material-ui/core/styles/makeStyles";

const SelectAgentLanguageComponent = () => {
    let {agentLanguage, setAgentLanguage, supportedLanguages} = useContext(AgentLanguageContext);

    const styles = useStyles();

    const getSupportedLanguages = () => supportedLanguages
        .map(lang => <MenuItem value={lang} key={lang}>{lang}</MenuItem>);

    return (
        <div className={styles.root}>
            <FormControl className={styles.formControl} disabled={!supportedLanguages.length}>
                <InputLabel>Agent Language</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={agentLanguage ? agentLanguage : ''}
                    onChange={(event) => setAgentLanguage(event.target.value)}

                >
                    {getSupportedLanguages()}
                </Select>
            </FormControl>
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
    formControl: {
        width: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default SelectAgentLanguageComponent;