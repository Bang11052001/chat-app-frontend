import { call, takeLatest, put, delay } from "redux-saga/effects";
import authService from "../../services/authServices";
import { authActions } from "./authSlice";
import { history } from "../../utils/history";
import { setCookie } from "../../utils/cookie";
import { toast } from "react-toastify";

function* handleLogin(action) {
  try {
    const res = yield call(authService.login, action.payload);
    yield delay(1000);
    setCookie("access_token", res.data.token, 60 * 20);
    toast.success("Login success!");
    yield put(authActions.loginSuccess(res.data));
    history.push("/chats");
  } catch (error) {
    toast.error("Ivalid password or email!");
    yield put(authActions.loginFailed());
  }
}

function* authSaga() {
  yield takeLatest(authActions.loginRequest.type, handleLogin);
}

export default authSaga;
