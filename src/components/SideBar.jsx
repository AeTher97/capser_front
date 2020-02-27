import React from 'react';
import Drawer from "@material-ui/core/Drawer";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";


import useMainStyle from "../styles/MainStyles";
import {ExitToApp} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {useMediaQuery, useTheme} from "@material-ui/core";


function ListItemLink(props) {
    const {icon, name, path} = props;
    const renderLink = React.useMemo(
        () =>
            React.forwardRef((itemProps, ref) => (
                <Link to={path} {...itemProps} ref={ref}/>
            )),
        [path],
    );

    return (
        <li>
            <ListItem button component={renderLink} onClick={props.onItemClicked}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <ListItemText primary={name}/>
            </ListItem>
        </li>
    );
}

export default function (props) {
    const classes = useMainStyle();
    const theme = useTheme();
    const isSmallDevice = useMediaQuery(theme.breakpoints.down('md'));


    const drawerContent = (
        <div>
            <ListItem>
                <Typography variant={"h6"}>Menu</Typography>
            </ListItem>
            <Divider/>
            <List>
                {
                    props.menuItems.map((item, index) => {
                        return <ListItemLink {...item}
                                             key={index}
                                             onItemClicked={props.onMobileDrawerClose}
                        />
                    })
                }
            </List>
            <Divider/>

            <ListItem button key={'Sign Out'} onClick={() => {
                props.logout();
                props.onMobileDrawerClose()
            }}>
                <ListItemIcon><ExitToApp/></ListItemIcon>
                <ListItemText primary={'Sign Out'}/>
            </ListItem>
        </div>
    );

    if (isSmallDevice) {
        return (
            <Drawer
                variant="temporary"
                onClose={props.onMobileDrawerClose}
                open={props.isMobileDrawerOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
            >
                {drawerContent}
            </Drawer>
        )
    } else {
        return (
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar}/>
                {drawerContent}
            </Drawer>
        );
    }

}



