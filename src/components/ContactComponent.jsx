import React from "react";
import { BiEdit, BiTrash, } from "react-icons/bi";
import { deleteUser, setShow } from "../redux/ContactsSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addFavouriteUser, } from "../redux/FavouriteSlice";
import { toast } from "react-toastify";




const ContactComponent = ({ users,index }) => {
  const { name, email, img_url,id } = users;
  const { users: contacts } = useSelector((state) => state.contacts);
  const { isFavourite } = useSelector((state) => state.FavouriteContacts);
const dispatch = useDispatch()


const handleDelete = (id) =>{
     dispatch(deleteUser(id))
     toast('Contact Deleted !')
}

const handleShow = (id) => {
     
  dispatch(setShow(id))
};


const handleFavourite = (id) =>{
  

  const user = contacts.filter((user)=>user.id === id)
    dispatch(addFavouriteUser(...user))
    toast('Added To Favourites !')
    dispatch(deleteUser(id)) 
   
}

  return (   

    <li class="flex items-center flex-wrap py-4 px-6 ">
    
     <div className="flex items-center">
      <span class="text-gray-700 text-lg font-medium mr-4">{index + 1}.</span>
    
      <img
        class="w-12 h-12 rounded-full object-cover mr-4 "
        src={img_url}
        onError={(e)=>{e.target.src = "https://randomuser.me/api/portraits/women/72.jpg"}}
        alt="User avatar"
      />
      </div>

      <div class="flex-1">
        <h3 class="text-lg  font-medium text-gray-800">{name}</h3>
        <p class="text-gray-600 ext-sm">{email}</p>
      </div>
      <div className="btn flex items-center gap-3">
      <i onClick={()=>handleFavourite(id)} class={`${isFavourite ? 'text-red-600': ''} fa-regular fa-star cursor-pointer`}></i>
      <div>
      <NavLink to={`users/${id}`}><button  className="mt-2"  ><BiEdit fontSize={22}/></button></NavLink>
      </div>
      <button onClick={()=>handleDelete(id)}><BiTrash fontSize={20}/></button>
      
      <button
       onClick={()=>handleShow(id)}
       class="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100">
        Details
      </button>
      </div>
    </li>
  );
};

export default ContactComponent;
