import Phone from "../../types/phone";
import { AppState } from "../index";

export const isLoadingPhones = (state: AppState): boolean =>
  state.phones.loadingList;

export const isLoadingPhone = (state: AppState): boolean =>
  state.phones.loadingItem;

export const getAllPhones = (state: AppState): Phone[] => state.phones.list;
export const getPhone = (state: AppState): Phone => state.phones.item;
