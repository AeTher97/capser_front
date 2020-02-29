import {makeStyles} from "@material-ui/core/styles";

const drawerWidth = 240;

const useMainStyle = makeStyles(theme => ({
    root: {
        display: 'flex',
    },


    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },

    '@global': {
        '*::-webkit-scrollbar': {
            width: '0'
        },
        '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '1px solid slategrey'
        }
    },

    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },

    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },

    name: {
        fontFamily: 'BankGothicRegular',
        flexGrow: 1,
    },

    drawerPaper: {
        width: drawerWidth,
    },

    selector: {
        justifyContent: 'right'
    },

    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },

    toolbar: theme.mixins.toolbar,

    logo: {
        maxWidth: 50,
    },
}));

export default useMainStyle;
