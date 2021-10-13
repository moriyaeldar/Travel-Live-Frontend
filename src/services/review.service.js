//
import Axios from 'axios';
import { httpService } from './http.service';
import { storageService } from './async-storage.service';
import { userService } from './user.service';
import { utilService } from './util.service';
import { socketService, SOCKET_EVENT_REVIEW_ADDED } from './socket.service';

const listeners = [];
const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? '/api/stay/'
    : 'http://localhost:3030/api/stay/';

const axios = Axios.create({
  withCredentials: true,
});

export const reviewService = {
  add,
  query,
  remove,
};

// More ways to send query params:
// return axios.get('api/toy/?id=1223&balance=13')
// return axios.get('api/toy/?', {params: {id: 1223, balanse:13}})

function query(filterBy = null) {
  // var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
  // return httpService.get(`review${queryStr}`)
  return storageService.query('review', { params: filterBy }); // ככה?
}

function remove(reviewId) {
  // return httpService.delete(`review/${reviewId}`)
  return storageService.remove('review', reviewId);
}
async function add(stay, review) {
  // const addedReview = await httpService.post(`review`, review);

  const user = await userService.getLoggedinUser();
  // review.user = userService.getLoggedinUser()
  // review.aboutUser = await userService.getById(review.aboutUserId)//don't need because its in the stay?

  const { ratings } = review;

  var sum =
    ratings.cleanliness +
    ratings.communication +
    ratings.checkIn +
    ratings.accuracy +
    ratings.location +
    ratings.value;
  var average = sum / 6;
  ratings.avg = average;

  const newReview = {
    id: utilService.makeId(),
    txt: review.txt,
    date: review.date,
    // rate: review.rating,
    ratings: review.ratings,
    by: review.by,
  };
  stay.reviews.push(newReview);
  // const addedReview = storageService.post('review', review);
  // const addedReview = storageService.put('stayDB', stay);
  return axios
    .put('http://localhost:3030/api/stay', stay)
    .then((res) => res.data);
  // return addedReview;
}

// This IIFE functions for Dev purposes
// It allows testing of real time updates (such as sockets) by listening to storage events
(async () => {
  var reviews = await storageService.query('review');

  // Dev Helper: Listens to when localStorage changes in OTHER browser
  window.addEventListener('storage', async () => {
    console.log('Storage updated');
    const freshReviews = await storageService.query('review');
    if (freshReviews.length === reviews.length + 1) {
      console.log('Review Added - localStorage updated from another browser');
      socketService.emit(
        SOCKET_EVENT_REVIEW_ADDED,
        freshReviews[freshReviews.length - 1]
      );
    }
    reviews = freshReviews;
  });
})();
