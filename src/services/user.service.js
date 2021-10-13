import Axios from 'axios';

import { storageService } from './async-storage.service';
import { httpService } from './http.service';
import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service';
// import Users from '../data/user.js';
import { utilService } from './util.service';
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser';
var gWatchedUser = null;
// let gusers = Users;
export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  getById,
  update
};

const STORAGE_KEY_LOGGEDIN = 'loggedinUser';

const BASE_USER_URL =
  process.env.NODE_ENV === 'production'
    ? '/api/auth/'
    : 'http://localhost:3030/api/auth/';

// async function getUsers() {
//   var users = await storageService.query('user');
//   users = !users || !users.length ? gusers : users;
//   return users;
//   // return httpService.get(`user`)
// }

async function getById(userId) {
  const user = await httpService.get(`user/${userId}`);
  gWatchedUser = user;
  return user;
}
// function remove(userId) {
//   return storageService.remove('user', userId);
//   // return httpService.delete(`user/${userId}`)
// }

async function update(user) {
  console.log('this is user storage***********');
  user = await httpService.put(`user/${user._id}`, user);
  // Handle case in which admin updates other user's details
  if (getLoggedinUser()._id === user._id) _saveLocalUser(user);
  return user;
}

async function login(userCred = {}) {
  const user = await httpService.post('auth/login', userCred);
  // socketService.emit('set-user-socket', user._id);
  if (user) return _saveLocalUser(user);
}

async function signup(userCred) {
  // const user = await storageService.post('user', userCred);
  // userCred.imgUrl
  // const user = await storageService.post('user', userObj);
  // var randomNum = utilService.getRandomIntInclusive(1, 100);
  // var gender = randomNum > 50 ? 'men' : 'women';

  // userCred.imgUrl = `https://randomuser.me/api/portraits/${gender}/${randomNum}.jpg`;
  const user = await httpService.post('auth/signup', userCred);
  // socketService.emit('set-user-socket', user._id);
  return _saveLocalUser(user);
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
  // socketService.emit('unset-user-socket');
  return await httpService.post('auth/logout');
}

function _saveLocalUser(user) {
  if (!user) return;
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
  return user;
}

function getLoggedinUser() {
  return JSON.parse(
    sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null'
  );
}

(async () => {
  var user = getLoggedinUser();
  // Dev Helper: Listens to when localStorage changes in OTHER browser
  // Here we are listening to changes for the watched user (comming from other browsers)
  window.addEventListener('storage', async () => {
    if (!gWatchedUser) return;
    const freshUsers = await storageService.query('user');
    const watchedUser = freshUsers.find((u) => u._id === gWatchedUser._id);
    if (!watchedUser) return;
    if (gWatchedUser.score !== watchedUser.score) {
      console.log(
        'Watched user score changed - localStorage updated from another browser'
      );
      socketService.emit(SOCKET_EVENT_USER_UPDATED, watchedUser);
    }
    gWatchedUser = watchedUser;
  });
})();
