import { all } from "redux-saga/effects";
import authSaga from "../features/auth/authSaga";
import chatSaga from "../features/chats/chatSaga";
import messageSaga from "../features/message/messageSaga";
import userSaga from "../features/user/userSaga";

export default function* rootSaga() {
  yield all([authSaga(), userSaga(), chatSaga(), messageSaga()]);
}
