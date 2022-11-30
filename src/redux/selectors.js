export const selectors = {
  getUserInfo: (state) => state.users.user,
  getUserId: (state) => state.users.user.id,
  getUserEmail: (state) => state.users.user.email,
  getUserName: (state) => state.users.user.name,
  getUserAvatar: (state) => state.users.user.avatar,
  getUserCity: (state) => state.users.user.city,
  getUserPhone: (state) => state.users.user.phone,
  getUserBirthday: (state) => state.users.user.birthday,
  getFavorites: (state) => state.users.user.favorites,
  getUserNotices: (state) => state.users.user.notices,
  getUserPets: (state) => state.users.user.pets,
  getToken: (state) => state.users.token,
  isLogged: (state) => state.users.isLogged,
  isLoadUser: (state) => state.users.loadUser,
  isErrorServer: (state) => state.users.errorServer,
  isErrorRegistration: (state) => state.users.errorRegistration,
  getNotices: (state) => state.notices.onFilterNotice,
  getNews: (state) => state.news.onFilterNews,
  stateUserNotices: (state) => state.notice.noticesFinded
};

