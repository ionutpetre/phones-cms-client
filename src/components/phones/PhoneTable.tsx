import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  Theme,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  withStyles,
  createStyles,
  makeStyles
} from "@material-ui/core";
import { Edit as IconUpdate, Delete as IconDelete } from "@material-ui/icons";

import ConfirmDialog from "../common/ConfirmDialog";
import { prettifyJson } from "../../utils/jsonUtils";
import Phone from "../../types/phone";

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
      fontSize: 18
    },
    body: {
      fontSize: 16
    }
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.background.default
      }
    }
  })
)(TableRow);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: { float: "left" },
    root: {
      width: "100%",
      marginTop: theme.spacing(3),
      overflowX: "auto"
    },
    table: {
      minWidth: 700
    },
    button: {
      float: "right",
      marginRight: "10%"
    }
  })
);

const PhoneTable: React.FunctionComponent<{
  data: Phone[];
  onUpdate: Function;
  onDelete: Function;
}> = props => {
  const { data, onUpdate, onDelete } = props;
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [phoneToDelete, setPhoneToDelete] = useState<Phone | null>();
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Phone ID</StyledTableCell>
            <StyledTableCell align="left">Phone type</StyledTableCell>
            <StyledTableCell align="left">Phone serial</StyledTableCell>
            <StyledTableCell align="left">Phone color</StyledTableCell>
            <StyledTableCell align="left">Phone metadata</StyledTableCell>
            <StyledTableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(phone => (
            <StyledTableRow key={phone.id}>
              <StyledTableCell>{phone.id}</StyledTableCell>
              <StyledTableCell align="left">{phone.type}</StyledTableCell>
              <StyledTableCell align="left">{phone.serial}</StyledTableCell>
              <StyledTableCell align="left">{phone.color}</StyledTableCell>
              <StyledTableCell align="left">
                {prettifyJson(phone.metadata)}
              </StyledTableCell>
              <StyledTableCell align="left">
                <IconButton
                  color="primary"
                  onClick={() => {
                    onUpdate(phone);
                  }}
                >
                  <IconUpdate />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => {
                    setPhoneToDelete(phone);
                    setOpenDeleteDialog(true);
                  }}
                >
                  <IconDelete />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      {phoneToDelete && (
        <ConfirmDialog
          title={`Confirm delete phone #${phoneToDelete.id}`}
          descrition={`Are you sure you want to delete ${
            phoneToDelete.type
          } phone?`}
          open={openDeleteDialog}
          onSuccess={() => {
            onDelete(phoneToDelete);
            setPhoneToDelete(null);
            setOpenDeleteDialog(false);
          }}
          onCancel={() => {
            setPhoneToDelete(null);
            setOpenDeleteDialog(false);
          }}
        />
      )}
    </Paper>
  );
};

export default PhoneTable;
