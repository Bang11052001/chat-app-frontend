import { toast } from "react-toastify";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import authService from "../../api/authApi";
import { setCookie } from "../../utils/cookie";
import { history } from "../../utils/history";
import { authActions } from "./authSlice";

function* LoginRequest(action) {
  try {
    const res = yield call(authService.login, action.payload);
    yield delay(1000);
    setCookie("access_token", res.data.token, 60 * 20);
    toast.success("Login success!");
    yield put(authActions.loginSuccess(res.data.token));
    history.push("/chats");
  } catch (error) {
    console.log(error);
    toast.error("Ivalid password or email!");
    yield put(authActions.loginFailed());
  }
}

function* logoutRequest() {
  document.cookie =
    "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  yield history.push("/");
}

function* authSaga() {
  yield takeLatest(authActions.loginRequest.type, LoginRequest);
  yield takeLatest(authActions.logoutRequest.type, logoutRequest);
}

export default authSaga;
