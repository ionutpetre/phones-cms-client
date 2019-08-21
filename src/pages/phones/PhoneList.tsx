import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Container,
  Fab,
  LinearProgress,
  styled,
  Typography
} from "@material-ui/core";
import { Add as IconAdd } from "@material-ui/icons";
import PageHeader from "../../components/common/PageHeader";
import PhoneTable from "../../components/phones/PhoneTable";
import { phonesActions } from "../../redux/phones/phones.actions";
import {
  isLoadingPhones,
  getAllPhones
} from "../../redux/phones/phones.selectors";
import { AppState } from "../../redux";
import Phone from "../../types/phone";

const StyledFab = styled(Fab)({
  position: "absolute",
  bottom: "15%",
  right: "15%"
});

class PhoneListPage extends React.Component<{
  history: any;
  dispatch: Function;
  isLoading: boolean;
  phones: Phone[];
}> {
  constructor(props: any) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {
    let { dispatch } = this.props;
    dispatch(phonesActions.getAll());
  }

  handleUpdate(phone: Phone) {
    let { history } = this.props;
    history.push(`/phones/update/${phone.id}`);
  }

  handleDelete(phone: Phone) {
    let { dispatch } = this.props;
    dispatch(phonesActions.deleteOne(phone));
  }

  render() {
    let { isLoading, phones } = this.props;
    return (
      <>
        <PageHeader title="Phone list" />
        <Container>
          {isLoading ? (
            <LinearProgress />
          ) : phones.length > 0 ? (
            <PhoneTable
              data={phones}
              onUpdate={this.handleUpdate}
              onDelete={this.handleDelete}
            />
          ) : (
            <Typography variant="h3" component="h3">
              No phones to display for now :(
            </Typography>
          )}
          <Link to="/phones/add">
            <StyledFab color="primary" aria-label="add">
              <IconAdd />
            </StyledFab>
          </Link>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    isLoading: isLoadingPhones(state),
    phones: getAllPhones(state)
  };
};

export default connect(mapStateToProps)(PhoneListPage);
