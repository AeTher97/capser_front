import React from 'react';
import Card from "@material-ui/core/Card";
import useTileStyle from "../styles/TileStyles";
import SignInFormContainer from "../components/auth/SignInFormContainer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const SignInScreen = () => {
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const tileStyles = useTileStyle();

    const styles = useStyles();

    return (
        <div className={tileStyles.centeredRow}>
            <Card className={smallScreen ? styles.fullWidthCard : styles.card}>
                <SignInFormContainer/>
            </Card>

        </div>
    );
};

const useStyles = makeStyles(theme => ({
    card: {
        padding: theme.spacing(2),
        width: 500,
    },

    fullWidthCard: {
        padding: theme.spacing(2),
        width: '100%',
    }
}));

export default SignInScreen;