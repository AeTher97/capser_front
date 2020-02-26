import React from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {makeStyles} from "@material-ui/core";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';


const ParametersComponent = (props) => {
    const classes = useStyles();

    const rows = props.parameters.toIndexedSeq().map((parameter) => (
        <TableRow key={parameter.id}>

            <TableCell>{parameter.displayName}</TableCell>
            <TableCell>
                <span style={{backgroundColor: props.colors.get(parameter.entityTypeDisplayName)}}>
                    {parameter.entityTypeDisplayName}
                </span>
            </TableCell>
            <TableCell>{getCheckboxIcon(parameter.mandatory)}</TableCell>
            <TableCell>{getCheckboxIcon(parameter.list)}</TableCell>
        </TableRow>
    ));

    return (
        <div>
            <TableContainer>
                <Table className={classes.table} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Parameter name</TableCell>
                            <TableCell>Entity</TableCell>
                            <TableCell>Required?</TableCell>
                            <TableCell>Is List?</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

const getCheckboxIcon = (condition) => (condition ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon/>);

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default ParametersComponent;