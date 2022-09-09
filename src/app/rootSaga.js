import { all } from "redux-saga/effects";
import authSaga from "../features/auth/authSaga";
import chatSaga from "../features/chats/chatSaga";

export default function* rootSaga() {
  yield all([authSaga(), chatSaga()]);
}
