import {createSelector} from 'reselect';

export const chat = state => state.chat;

export const chatRoomsSelector = createSelector(
  chat,
  data => data.chatRooms,
);