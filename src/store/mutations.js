// https://vuex.vuejs.org/en/mutations.html

export default {
  //
  setUserInfo(state, payload){
    state.userInfo.ID = payload.ID;
    state.userInfo.name = payload.name;
    state.userInfo.phone = payload.phone;
    state.userInfo.email = payload.email;
    state.userInfo.live = payload.live;
    state.isUserInfoGetted = true;
  }
}
