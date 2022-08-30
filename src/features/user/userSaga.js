import { call, put, takeLatest } from "redux-saga/effects";
import userApi from "../../api/userApi";
import { userActions } from "./userSlice";

function* handleFetchUserById(action) {
  try {
    const res = yield call(userApi.getUserById, action.payload);
    yield put(userActions.fetchUserByIdSuccess(res.data));
  } catch (error) {
    yield put(userActions.fetchUserByIdFailed());
  }
}

function* userSaga() {
  yield takeLatest(userActions.fetchUserByIdRequest.type, handleFetchUserById);
}

export default userSaga;
