import { configureStore } from '@reduxjs/toolkit'
import contactReducer from './ContactsSlice'
import FavouriteReducer from './FavouriteSlice'
 


export const store = configureStore({
  reducer: {
   contacts: contactReducer,
   FavouriteContacts: FavouriteReducer,
  },
})