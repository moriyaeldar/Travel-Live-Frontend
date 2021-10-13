import { storageService } from './async-storage.service.js';
import { utilService } from './util.service.js';
import { userService } from './user.service.js';
import { httpService } from './http.service';
import Stays from '../data/stay.js';

//
import Axios from 'axios';

const listeners = [];
const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? '/api/stay/'
    : 'http://localhost:3030/api/stay/';

const axios = Axios.create({
  withCredentials: true,
});

const STORAGE_KEY = 'stayDB';
const STORAGE_KEY_LOGGEDIN = 'loggedinUser';
let gStays = Stays; // can add if(stays) get from storage

export const stayService = {
  query,
  getById,
  save,
  remove,
  subscribe,
  getUserStays,
  queryFront,
};
window.cs = stayService;
//LIST
async function query(filterBy = {}) {
  
  // return axios
  //   .get('http://localhost:3030/api/stay', { params: filterBy })
  //   .then((res) => res.data);
  return httpService.get('stay', filterBy)
}

async function getUserStays(user) {
  let userSavedStays = await storageService.query('user', user);
  return Promise.resolve(userSavedStays);
}

function getById(stayId) {
  // return axios
  //   .get(`http://localhost:3030/api/stay/${stayId}`)
  //   .then((res) => res.data);
  return httpService.get(`stay/${stayId}`)


}
function remove(stayId) {
  // return axios.delete(`http://localhost:3030/api/stay/${stayId}`);
  return httpService.delete(`stay/${stayId}`);
  
}
async function save(stay) {
  if (stay._id) {
    return httpService.put(`stay/${stay._id}`, stay);
    // return axios
    //   .put('http://localhost:3030/api/stay', stay)
    //   .then((res) => res.data);
  } else {
    const user = await userService.getLoggedinUser();

    stay.host = { fullname: user.fullname, _id: user._id, imgUrl: user.imgUrl };
    return httpService.post(`stay`, stay);
    // return axios
    //   .post('http://localhost:3030/api/stay', stay)
    //   .then((res) => res.data);
  }
}

// function add(stay) {
//   // const user = userService.getLoggedinUser()
//   return axios.post('http://localhost:3030/api/stay', stay).then(res => res.data)
// }
// function update(stay) {
//   return axios.put('http://localhost:3030/api/stay', stay).then(res => res.data)
//   // return axios.put(`http://localhost:3030/api/toy${toyId}`, toy).then(res => res.data)
// }

function subscribe(listener) {
  listeners.push(listener);
}

function _notifySubscribersStaysChanged(stays) {
  console.log('Notifying Listeners');
  listeners.forEach((listener) => listener(stays));
}

window.addEventListener('storage', () => {
  query().then((stays) => {
    _notifySubscribersStaysChanged(stays);
  });
});

// function login(credentials) {
//   return storageService.query(STORAGE_KEY).then((users) => {
//     const user = users.find(
//       (user) =>
//         user.username === credentials.username &&
//         user.password === credentials.password
//     );
//     if (user) {
//       sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user));
//     }
//     return user;
//   });
// }

function queryFront(stays, frontFilter) {
  // console.log('queryFront');
  // console.log('queryFront stays', stays);
  // console.log('queryFront frontFilter', frontFilter);
  // let staysToDisplay=[]
  var staysToDisplay = stays;
  //stayType: 'Entire Room,
  if (frontFilter.stayType)
    staysToDisplay = staysToDisplay.filter((stay) => {
      return stay.stayType === frontFilter.stayType;
    });
  if (frontFilter.type)
    staysToDisplay = staysToDisplay.filter((stay) => {
      return stay.type === frontFilter.type;
    });
  if (frontFilter.price.minPrice > 0 || frontFilter.price.maxPrice < Infinity)
    staysToDisplay = staysToDisplay.filter((stay) => {
      return (
        stay.price > frontFilter.price.minPrice &&
        stay.price < frontFilter.price.maxPrice
      );
    });

  staysToDisplay = staysToDisplay.filter((stay) => {
    console.log('curr stay: ', stay);
    let isStay = true;
    for (const amenity in frontFilter.amenities) {
      if (frontFilter.amenities[amenity] && !stay.amenities.includes(amenity))
        isStay = false;
    }
    // const stayAmenities = stay.amenities.filter((amenity) => {
    //   return frontFilter.amenities[amenity]
    // })
    // console.log('stayAmenities: ' , stayAmenities);
    return isStay;
  });
  console.log('staysToDisplay: ', staysToDisplay);

  if (
    !frontFilter.stayType &&
    !frontFilter.type &&
    !frontFilter.price.minPrice &&
    frontFilter.price.maxPrice > 100000 &&
    !Object.values(frontFilter.amenities).includes(true)
  )
    return stays;

  return staysToDisplay;
}
// function queryFront(stays, frontFilter){
//   console.log('queryFront');
//   console.log('queryFront stays', stays);
//   console.log('queryFront frontFilter', frontFilter);
// const staysToDisplay=[]
// //stayType: 'Entire Room,
//   if(frontFilter.stayType )
//   stays.forEach((stay)=>{
//      if (stay.stayType===frontFilter.stayType) staysToDisplay.push(stay)
//   })
//   if(frontFilter.type )
//   stays.forEach((stay)=>{
//      if (stay.type===frontFilter.type) staysToDisplay.push(stay)
//   })

// return staysToDisplay;

// }
