import { createSlice } from "@reduxjs/toolkit";


export const STATUS = Object.freeze(

  {

    Loading:'Loading',
    Success:'Success',
    Error:'An Error accured. . .',
   
  }

)
const ContactSlice = createSlice({
  name: "contacts",
  initialState: {
    users: [],
    isLoading:STATUS.Loading,
    searchUser: [],
    userDetail:[],
    show:false
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },

    showUser: (state, action) => {
      state.users = action.payload;
    },

    remove: (state, action) => {
      state.users = state.users.filter((user) => user.id != action.payload);
    },
    editUser: (state,action) =>{
        state.users =  state.users.map((user)=>(
              user.id === action.payload.id ? action.payload : user
        ))
    },
    
    setStatus: (state,action) =>{
          state.isLoading = action.payload
    },
    setShow: (state,action) =>{
          state.userDetail = state.users.filter((user)=>user.id === action.payload)
          state.show = !state.show
    },
    
    setSearch: (state,action) =>{
          state.searchUser = action.payload
         
    }
  },
});

export const { addUser, remove,showUser,editUser,setStatus ,setSearch ,setShow} = ContactSlice.actions;

export default ContactSlice.reducer;



export function fetchUsers() {
 
  return async function fetchUsersThunk(dispatch) {
     
    dispatch(setStatus(STATUS.Loading))

    try {
       
      const response = await fetch(
        `https://67f0b7fe2a80b06b8898713e.mockapi.io/contacts/users`
      );
      const data = await response.json();
      dispatch(setStatus(STATUS.Success))
      dispatch(showUser(data))
    
    } catch (error) {
       console.log(error)
       dispatch(setStatus(STATUS.Error))

    }
  };
}


export function createUser(user) {
  return async function deleteUserThunk(dispatch) {
    dispatch(setStatus(STATUS.Loading))
      
      const response = await fetch(
        `https://67f0b7fe2a80b06b8898713e.mockapi.io/contacts/users`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(user),
        }
      );
      try {
        const data = await response.json()
        dispatch(addUser(data))
        dispatch(setStatus(STATUS.Success))
      } catch (error) {
        console.log(error);
      }
   
    
  };
}


export function deleteUser(id) {

  return async function deleteUserThunk(dispatch) {
    dispatch(setStatus(STATUS.Loading))
    try {
      await fetch(
        `https://67f0b7fe2a80b06b8898713e.mockapi.io/contacts/users/${id}`,
        {
          method: "DELETE",
        }
      );
      dispatch(remove(id));
      dispatch(setStatus(STATUS.Success))
    } catch (error) {
      console.log(error);
    }
  };
}

export function UpdateUser(id,user) {
  return async function updateUserThunk(dispatch) {
    dispatch(setStatus(STATUS.Loading))
    const response = await fetch(
      `https://67f0b7fe2a80b06b8898713e.mockapi.io/contacts/users/${id}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(user),
      }
    );
    try {
      const data = await response.json()
      dispatch(editUser(data))
      dispatch(setStatus(STATUS.Success))
      
    } catch (error) {
      console.log(error);
    }
  };
}
