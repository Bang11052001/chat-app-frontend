import { call, put, takeLatest } from "redux-saga/effects";
import chatApi from "../../api/chatApi";
import { chatActions } from "./chatSlice";

function* handleAccessChat(action) {
  yield call(chatApi.accessChat, action.payload);
}

function* handleFetchAllChat(action) {
  try {
    const { data } = yield call(chatApi.fetchAllChat, action.payload);
    yield put(chatActions.fetchAllChatSuccess(data));
  } catch (error) {
    yield put(chatActions.fetchAllChatFailed());
  }
}

function* chatSaga() {
  yield takeLatest(chatActions.accessChat.type, handleAccessChat);
  yield takeLatest(chatActions.fetchAllChatRequest.type, handleFetchAllChat);
}

export default chatSaga;
