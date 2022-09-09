import { toast } from "react-toastify";
import { call, delay, fork, put, takeLatest, take } from "redux-saga/effects";
import authService from "../../api/authApi";
import userApi from "../../api/userApi";
import { getCookie, setCookie } from "../../utils/cookie";
import { history } from "../../utils/history";
import { authActions } from "./authSlice";

function* handleLogin(payload) {
  try {
    const { data } = yield call(authService.login, payload);
    yield delay(1000);
    setCookie("access_token", data.token, 60 * 20);
    toast.success("Login success!");
    yield put(authActions.loginSuccess(data));
    history.push("/chats");
  } catch (error) {
    console.log(error);
    toast.error("Ivalid password or email!");
    yield put(authActions.loginFailed());
  }
}

function* handleLogout() {
  document.cookie =
    "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  yield history.push("/");
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(getCookie("access_token"));

    if (!isLoggedIn) {
      const action = yield take(authActions.loginRequest.type);
      yield fork(handleLogin, action.payload);
    }

    yield take(authActions.logoutRequest.type);
    yield call(handleLogout);
  }
}

function* handleFetchUserById(action) {
  try {
    const res = yield call(userApi.getUserById, action.payload);
    yield put(authActions.fetchUserByIdSuccess(res.data));
  } catch (error) {
    yield put(authActions.fetchUserByIdFailed());
  }
}

function* authSaga() {
  yield fork(watchLoginFlow);
  yield takeLatest(authActions.fetchUserByIdRequest.type, handleFetchUserById);
}

export default authSaga;
