import { createSlice } from "@reduxjs/toolkit";

export const STATUS = Object.freeze({
  Loading: "Loading",
  Success: "Success",
  Error: "An Error accured. . .",
});
const FavouriteSlice = createSlice({
  name: "FavouriteContacts",
  initialState: {
    favouriteUsers: [],
    isLoading: STATUS.Loading,
    show: false,
    singleFavUser: [],
  },
  reducers: {
    addFavourite: (state, action) => {
      console.log(action.payload);
      state.favouriteUsers.push(action.payload);
    },

    showFavouriteUsers: (state, action) => {
      state.favouriteUsers = action.payload;
    },

    removeFavourite: (state, action) => {
      state.favouriteUsers = state.favouriteUsers.filter(
        (user) => user.id != action.payload
      );
    },

    editFavourite: (state, action) => {
      state.favouriteUsers = state.favouriteUsers.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
    },

    setStatus: (state, action) => {
      state.isLoading = action.payload;
    },
    setshow: (state, action) => {
      state.singleFavUser = state.favouriteUsers.filter(
        (user) => user.id === action.payload
      );
      state.show = !state.show;
    },
  },
});

export const {
  addFavourite,
  removeFavourite,
  showFavouriteUsers,
  editFavourite,
  setStatus,
  setshow,
} = FavouriteSlice.actions;

export default FavouriteSlice.reducer;

export function fetchFavouriteUsers() {
  return async function fetchFavouriteUsersThunk(dispatch) {
    dispatch(setStatus(STATUS.Loading));

    try {
      const response = await fetch(
        `https://663124bbc92f351c03dc5072.mockapi.io/contacts/favourites`
      );
      const data = await response.json();
      dispatch(setStatus(STATUS.Success));
      dispatch(showFavouriteUsers(data));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUS.Error));
    }
  };
}

export function addFavouriteUser(user) {
  return async function deleteUserThunk(dispatch) {
    dispatch(setStatus(STATUS.Loading));

    const response = await fetch(
      `https://663124bbc92f351c03dc5072.mockapi.io/contacts/favourites`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(user),
      }
    );
    try {
      const data = await response.json();
      console.log(data);
      dispatch(addFavourite(data));
      dispatch(setStatus(STATUS.Success));
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteFavouriteUser(id) {
  return async function deleteUserThunk(dispatch) {
    dispatch(setStatus(STATUS.Loading));
    try {
      await fetch(
        `https://663124bbc92f351c03dc5072.mockapi.io/contacts/favourites/${id}`,
        {
          method: "DELETE",
        }
      );
      dispatch(removeFavourite(id));
      dispatch(setStatus(STATUS.Success));
    } catch (error) {
      console.log(error);
    }
  };
}

export function UpdateFavouriteUser(id, user) {
  return async function updateUserThunk(dispatch) {
    dispatch(setStatus(STATUS.Loading));
    const response = await fetch(
      `https://663124bbc92f351c03dc5072.mockapi.io/contacts/favourites/${id}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(user),
      }
    );
    try {
      const data = await response.json();
      dispatch(editFavourite(data));
      dispatch(setStatus(STATUS.Success));
    } catch (error) {
      console.log(error);
    }
  };
}
