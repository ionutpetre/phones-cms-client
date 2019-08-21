import axios, { AxiosResponse } from "axios";
import Phone from "../../types/phone";
import { phonesConstants as constants } from "./phones.constants";

const SERVER_BASE_URL = "http://localhost:3000";

export const phonesActions = {
  getAll,
  getOne,
  add,
  update,
  deleteOne
};

function getAll() {
  return async (dispatch: Function) => {
    dispatch(request());
    await axios
      .get(`${SERVER_BASE_URL}/phones`)
      .then((response: AxiosResponse) => {
        dispatch(success(response.data));
      })
      .catch((error: AxiosResponse) => {
        dispatch(failure(error));
      });
  };
  function request() {
    return { type: constants.GET_ALL_REQUEST };
  }
  function success(phones: Phone[]) {
    return { type: constants.GET_ALL_SUCCESS, phones };
  }
  function failure(error: AxiosResponse) {
    return { type: constants.GET_ALL_ERROR, error };
  }
}

function getOne(id: string) {
  return async (dispatch: Function) => {
    dispatch(request());
    await axios
      .get(`${SERVER_BASE_URL}/phones/${id}`)
      .then((response: AxiosResponse) => {
        dispatch(success(response.data));
      })
      .catch((error: AxiosResponse) => {
        dispatch(failure(error));
      });
  };
  function request() {
    return { type: constants.GET_ONE_REQUEST };
  }
  function success(phone: Phone) {
    return { type: constants.GET_ONE_SUCCESS, phone };
  }
  function failure(error: AxiosResponse) {
    return { type: constants.GET_ONE_ERROR, error };
  }
}

function add(phone: Phone) {
  return async (dispatch: Function) => {
    await axios
      .post(`${SERVER_BASE_URL}/phones`, phone)
      .then((response: AxiosResponse) => {
        dispatch(success(response.data));
      })
      .catch((error: AxiosResponse) => {
        dispatch(failure(error));
      });
  };
  function success(phone: Phone) {
    return { type: constants.ADD_SUCCESS, phone };
  }
  function failure(error: AxiosResponse) {
    return { type: constants.ADD_ERROR, error };
  }
}

function update(phone: Phone) {
  return async (dispatch: Function) => {
    await axios
      .put(`${SERVER_BASE_URL}/phones/${phone.id}`, phone)
      .then((response: AxiosResponse) => {
        dispatch(success(response.data));
      })
      .catch((error: AxiosResponse) => {
        dispatch(failure(error));
      });
  };
  function success(phone: Phone) {
    return { type: constants.UPDATE_SUCCESS, phone };
  }
  function failure(error: AxiosResponse) {
    return { type: constants.UPDATE_ERROR, error };
  }
}

function deleteOne(phone: Phone) {
  return async (dispatch: Function) => {
    await axios
      .delete(`${SERVER_BASE_URL}/phones/${phone.id}`)
      .then(() => {
        dispatch(success(phone));
      })
      .catch((error: AxiosResponse) => {
        dispatch(failure(error));
      });
  };

  function success(phone: Phone) {
    return { type: constants.DELETE_SUCCESS, phone };
  }
  function failure(error: AxiosResponse) {
    return { type: constants.DELETE_ERROR, error };
  }
}
