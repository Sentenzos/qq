import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "fa3b8954-bbcb-4172-bf06-b3b545c95215"
  }
});

export const profileAPI = {
  getStatus: (userId) => {
    return instance.get(`profile/status/${userId}`);
  },
  sendNewStatus: (status) => {
    return instance.put("profile/status", {status});
  },
  getUserData: (userId) => {
    return instance.get(`profile/${userId}`);
  },
  saveUserData: (userData) => {
    return instance.put(`profile`, userData);
  },
  updatePhoto(photo) {
    let formData = new FormData();
    formData.append("image", photo);
    return instance.put(`profile/photo`, formData, {
      "Content-Type": "multipart/form-data"
    })
  },
};

export const authAPI = {
  getMe: () => {
    return instance.get('auth/me');
  },
  login: (userData) => {
    return instance.post('auth/login', userData);
  },
  logout: () => {
    return instance.delete('auth/login');
  },
  getCaptcha: () => {
    return instance.get("security/get-captcha-url");
  }
};

export const usersAPI = {
  getUsers: (params) => {
    const {usersOnPage, pageNumber} = params;
    return instance.get(`users?count=${usersOnPage}&page=${pageNumber}`);
  },
  searchUser: (params) => {
    const {usersOnPage, pageNumber, wantedUser} = params;
    return instance.get(`users?count=${usersOnPage}&page=${pageNumber}&term=${wantedUser}`);
  },
  subscribe: (userId) => {
    return instance.post(`follow/${userId}`);
  },
  unsubscribe: (userId) => {
    return instance.delete(`follow/${userId}`);
  }
};

export const dialogsAPI = {
  //начинает чат с человек и добавляет в список людей с которыми идет диалог (след. запрос). Возврвщает resultCode
  startChatting: (userId) => {
    return instance.put(`dialogs/${userId}`);
  },
  //возвращает объект с массивом дата содержащим объекты в которых находятся id пользователей с которыми велись диалоги, а так же есть ли от них новые сообщения (ошибку не возвр) https://i.imgur.com/OYvjvXz.png
  getAllDialogs: () => {
    return  instance.get("dialogs");
  },
  sendMessage: (userId, message) => {
    return instance.post(`dialogs/${userId}/messages`, {body: message})
  },
  //возвращает объект с массивом с объектами содержащими сообщения от пользователя и информацию о том просмотрено ли сообщение https://i.imgur.com/aRAw8Gr.png
  getMessagesList: (userId) => {
    return instance.get(`dialogs/${userId}/messages/new?newerThen=${"1-13-2019"}`);
  },
  deleteMessage: (messageId) => {
    return instance.delete(`dialogs/messages/${messageId}`)
  }
};
