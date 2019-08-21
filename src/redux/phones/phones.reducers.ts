import { Reducer } from "redux";

import Phone from "../../types/phone";
import { phonesConstants as constants } from "./phones.constants";

export interface PhonesState {
  loadingList: boolean;
  loadingItem: boolean;
  list: Phone[];
  item: Phone;
  error: any;
}

const initialState: PhonesState = {
  loadingList: false,
  loadingItem: false,
  list: [],
  item: {
    id: 0,
    type: "",
    serial: "",
    color: "",
    metadata: {}
  },
  error: null
};

const phonesReducer: Reducer<PhonesState, any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case constants.GET_ALL_REQUEST:
      return {
        ...state,
        ...{ loadingList: true }
      };
    case constants.GET_ALL_SUCCESS:
      return {
        ...state,
        ...{ loadingList: false },
        ...{ list: action.phones }
      };
    case constants.GET_ALL_ERROR:
      return {
        ...state,
        ...{ loadingList: false },
        ...{ error: action.error }
      };
    case constants.GET_ONE_REQUEST:
      return {
        ...state,
        ...{ loadingItem: true }
      };
    case constants.GET_ONE_SUCCESS:
      return {
        ...state,
        ...{ loadingItem: false },
        ...{ item: action.phone }
      };
    case constants.GET_ONE_ERROR:
      return {
        ...state,
        ...{ loadingItem: false },
        ...{ error: action.error }
      };
    case constants.ADD_SUCCESS:
      return {
        ...state,
        ...{ list: [...state.list, action.phone] }
      };
    case constants.ADD_ERROR:
      return {
        ...state,
        ...{ error: action.error }
      };

    case constants.UPDATE_SUCCESS:
      return {
        ...state,
        ...{
          list: state.list.map(item => {
            if (item.id === action.phone.id) {
              return {
                ...item,
                ...action.phone
              };
            }
            return item;
          })
        }
      };
    case constants.UPDATE_ERROR:
      return {
        ...state,
        ...{ error: action.error }
      };

    case constants.DELETE_SUCCESS:
      return {
        ...state,
        ...{
          list: state.list.filter(item => {
            return item.id !== action.phone.id;
          })
        }
      };
    case constants.DELETE_ERROR:
      return {
        ...state,
        ...{ error: action.error }
      };
    default:
      return state;
  }
};

export default phonesReducer;
