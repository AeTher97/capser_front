import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import React from "react";

export default (props) => {
    return (<div style={{textAlign: 'left'}}>

        <Table aria-label="simple table">
            <TableBody>
                <TableRow variant={"body1"}>
                    <TableCell>Points</TableCell>
                    <TableCell>{props.user.points}</TableCell>
                </TableRow>
                <TableRow variant={"body1"}><TableCell>Games Played</TableCell>
                    <TableCell>{props.user.gamesPlayed}</TableCell></TableRow>
                <TableRow variant={"body1"}><TableCell>Games Won</TableCell>
                    <TableCell>{props.user.gamesWon}</TableCell></TableRow>
                <TableRow variant={"body1"}><TableCell>Games Lost</TableCell>
                    <TableCell>{props.user.gamesLost}</TableCell></TableRow>
                <TableRow variant={"body1"}><TableCell>Win To Loss Ratio</TableCell>
                    <TableCell>{props.user.winLossRatio}</TableCell></TableRow>
                <TableRow variant={"body1"}><TableCell>Average Rebuttals</TableCell>
                    <TableCell>{props.user.averageRebottles}</TableCell></TableRow>
                <TableRow variant={"body1"}><TableCell>Total Points Made</TableCell>
                    <TableCell>{props.user.totalPointsMade}</TableCell></TableRow>
                <TableRow variant={"body1"}><TableCell>Total Points Lost</TableCell>
                    <TableCell>{props.user.totalPointsLost}</TableCell></TableRow>
                <TableRow variant={"body1"}><TableCell>Total Sinks Made</TableCell>
                    <TableCell>{props.user.totalSinksMade}</TableCell></TableRow>
                <TableRow variant={"body1"}><TableCell>Total Sinks Lost</TableCell>
                    <TableCell>{props.user.totalSinksLost}</TableCell></TableRow>
                <TableRow variant={"body1"}><TableCell>Sinks Made To Lost Ratio</TableCell>
                    <TableCell>{props.user.sinksMadeToLostRatio}</TableCell></TableRow>
            </TableBody>
        </Table>
    </div>)
}