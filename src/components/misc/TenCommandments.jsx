import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import React from "react";
import useTheme from "@material-ui/core/styles/useTheme";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";

export default () => {

    const theme = useTheme()

    return (<div>
        <ListItem>
            <Typography variant={"h5"}>10 Commandments of a good caps player</Typography>
        </ListItem>
        <div style={{backgroundColor: theme.palette.background.paper}}>

            <Table>
                <TableBody>
                    <TableRow variant={"body1"}><TableCell>Games Played</TableCell>
                        <TableCell>A good caps player can hit any target.</TableCell></TableRow>
                    <TableRow variant={"body1"}><TableCell>Games Won</TableCell>
                        <TableCell>A good caps player can play on any side.</TableCell></TableRow>
                    <TableRow variant={"body1"}><TableCell>Games Lost</TableCell>
                        <TableCell>A good caps player can play in any venue.</TableCell></TableRow>
                    <TableRow variant={"body1"}><TableCell>Win To Loss Ratio</TableCell>
                        <TableCell>A good caps player plays better when drunk.</TableCell></TableRow>
                    <TableRow variant={"body1"}><TableCell>Average Rebuttals</TableCell>
                        <TableCell>A good caps player rebuttles.</TableCell></TableRow>
                    <TableRow variant={"body1"}><TableCell>Total Points Made</TableCell>
                        <TableCell>A good caps player is not afraid of drinking beer.</TableCell></TableRow>
                    <TableRow variant={"body1"}><TableCell>Total Points Lost</TableCell>
                        <TableCell>A good caps player celebrates after scoring.</TableCell></TableRow>
                    <TableRow variant={"body1"}><TableCell>Total Sinks Made</TableCell>
                        <TableCell>A good caps player is a gentleman.</TableCell></TableRow>
                    <TableRow variant={"body1"}><TableCell>Total Sinks Lost</TableCell>
                        <TableCell>A good caps player loves the game of caps.</TableCell></TableRow>
                    <TableRow variant={"body1"}><TableCell>Sinks Made To Lost Ratio</TableCell>
                        <TableCell>This is a game of caps we play with 3 beers.</TableCell></TableRow>
                </TableBody>
            </Table>
        </div>
    </div>)

}