import { call, takeLatest, put } from "redux-saga/effects";
import messageApi from "../../api/messageApi";
import { messageActions } from "./messageSlice";

function* handleFetchAllMessage(action) {
  try {
    const { data } = yield call(messageApi.fetchAllMessage, action.payload);
    yield put(messageActions.fetchAllMessageSuccess(data));
  } catch (error) {
    yield put(messageActions.fetchAllMessageFailed());
  }
}

function* messageSaga() {
  yield takeLatest(
    messageActions.fetchAllMessageRequest,
    handleFetchAllMessage
  );
}

export default messageSaga;
