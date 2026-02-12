import {createSelector} from 'reselect';

export const job = state => state.job;

export const jobsSelector = createSelector(
  job,
  data => job.jobs,
);

export const jobInvitesSelector = createSelector(
  job,
  data => job.jobInvites,
);
