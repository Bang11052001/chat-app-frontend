import { call, put, takeLatest } from "redux-saga/effects";
import chatApi from "../../api/chatApi";
import { chatActions } from "./chatSlice";

function* handleAccessChat(action) {
  yield call(chatApi.accessChat, action.payload);
}

function* handleFetchAllChat(action) {
  try {
    const res = yield call(chatApi.fetchAllChat, { config: action.payload });
    yield put(chatActions.fetchAllChatSuccess(res.data));
  } catch (error) {
    yield put(chatActions.fetchAllChatFailed());
  }
}

function* chatSaga() {
  yield takeLatest(chatActions.accessChat.type, handleAccessChat);
  yield takeLatest(chatActions.fetchAllChatRequest.type, handleFetchAllChat);
}

export default chatSaga;
