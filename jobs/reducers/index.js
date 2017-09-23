import { combineReducers } from 'redux';
import auth from './auth_reducer';
import jobs from './jobs_reducer';
import likedJobs from './likes_reducer';
import notes from './notes_reducer';

export default combineReducers({
  auth, jobs, likedJobs, notes
});
