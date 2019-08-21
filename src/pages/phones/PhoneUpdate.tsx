import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Typography,
  LinearProgress,
  styled
} from "@material-ui/core";
import PageHeader from "../../components/common/PageHeader";
import PhoneForm from "../../components/phones/PhoneForm";
import { phonesActions } from "../../redux/phones/phones.actions";
import { isLoadingPhone, getPhone } from "../../redux/phones/phones.selectors";
import { AppState } from "../../redux";
import Phone from "../../types/phone";

const StyledContainer = styled(Container)({
  marginTop: "10px"
});

class PhoneUpdatePage extends React.Component<{
  match: any;
  history: any;
  dispatch: Function;
  isLoading: boolean;
  phone: Phone;
}> {
  constructor(props: any) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  async componentDidMount() {
    let { dispatch, match } = this.props;
    dispatch(phonesActions.getOne(match.params.id));
  }

  handleUpdate(phone: Phone) {
    let { history, dispatch } = this.props;
    dispatch(phonesActions.update(phone));
    history.push("/phones/");
  }

  handleCancel() {
    let { history } = this.props;
    history.push("/phones/");
  }

  render() {
    const { match, isLoading, phone } = this.props;
    return (
      <>
        <PageHeader title={"Phone update"} />
        <StyledContainer>
          <Typography variant="h4" gutterBottom>
            {`Update phone #${match.params.id}`}
          </Typography>
          {isLoading ? (
            <LinearProgress />
          ) : (
            <PhoneForm
              data={phone}
              onSave={this.handleUpdate}
              onCancel={this.handleCancel}
            />
          )}
        </StyledContainer>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    isLoading: isLoadingPhone(state),
    phone: getPhone(state)
  };
};

export default connect(mapStateToProps)(PhoneUpdatePage);
