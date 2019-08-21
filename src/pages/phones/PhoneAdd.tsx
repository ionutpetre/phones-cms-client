import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Typography,
  Theme,
  makeStyles,
  createStyles
} from "@material-ui/core";
import PageHeader from "../../components/common/PageHeader";
import PhoneForm from "../../components/phones/PhoneForm";
import Phone from "../../types/phone";
import { phonesActions } from "../../redux/phones/phones.actions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2)
    }
  })
);

const PhoneAddPage: React.FunctionComponent<{
  history: any;
  dispatch: Function;
}> = props => {
  const classes = useStyles();

  const handleSave = (phone: Phone) => {
    const { dispatch, history } = props;
    dispatch(phonesActions.add(phone));
    history.push("/phones/");
  };

  const handleCancel = () => {
    const { history } = props;
    history.push("/phones/");
  };

  return (
    <>
      <PageHeader title="Phone add" />
      <Container className={classes.container}>
        <Typography variant="h4" gutterBottom>
          Add phone
        </Typography>
        <PhoneForm onSave={handleSave} onCancel={handleCancel} />
      </Container>
    </>
  );
};

export default connect()(PhoneAddPage);
