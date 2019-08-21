import React, { useState } from "react";

import {
  Grid,
  TextField,
  Button,
  Theme,
  makeStyles,
  createStyles,
  ButtonGroup
} from "@material-ui/core";

import { isJson } from "../../utils/jsonUtils";
import Phone from "../../types/phone";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      width: "50%"
    },
    buttonGroup: {
      float: "right",
      boxShadow: "none"
    },
    buttonCancel: {
      marginRight: theme.spacing(1)
    }
  })
);

const PhoneForm: React.FunctionComponent<{
  onSave: Function;
  onCancel: Function;
  data?: Phone;
}> = props => {
  const { onSave, onCancel, data } = props;
  const [phone, setPhone] = useState(data);
  const classes = useStyles();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave(phone);
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;
    if (name === "metadata") {
      if (!isJson(value)) {
        event.target.setCustomValidity("Invalid JSON format");
      } else {
        value = JSON.parse(value);
        event.target.setCustomValidity("");
      }
    }
    setPhone((phone: any) => ({ ...phone, [name]: value }));
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="type"
            label="Phone type"
            defaultValue={phone ? phone.type : ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="serial"
            label="Phone serial"
            defaultValue={phone ? phone.serial : ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="color"
            label="Phone color"
            defaultValue={phone ? phone.color : ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            multiline={true}
            rows={4}
            rowsMax={4}
            name="metadata"
            label="Phone metadata"
            defaultValue={phone ? JSON.stringify(phone.metadata) : ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <ButtonGroup
            className={classes.buttonGroup}
            variant="contained"
            size="large"
            aria-label="large contained secondary button group"
          >
            <Button
              className={classes.buttonCancel}
              variant="contained"
              color="primary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {data ? "Update" : "Add"}
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </form>
  );
};

export default PhoneForm;
