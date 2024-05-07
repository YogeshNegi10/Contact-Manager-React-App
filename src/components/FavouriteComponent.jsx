import React from "react";
import { BiTrash } from "react-icons/bi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavouriteUser, setshow } from "../redux/FavouriteSlice";

const FavouriteComponent = ({ users, index }) => {
  const { name, email, img_url, id } = users;

  const { isFavourite } = useSelector((state) => state.FavouriteContacts);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteFavouriteUser(id));
    toast("Contact Deleted");
  };

  
const handleShow = (id) => {
     
  dispatch(setshow(id))
};


  return (
    <li class="flex items-center flex-wrap py-4 px-6 ">
      <span class="text-gray-700 text-lg font-medium mr-4">{index + 1}.</span>
      <img
        class="w-12 h-12 rounded-full object-cover mr-4"
        src={img_url}
        onError={(e) => {
          e.target.src = "https://randomuser.me/api/portraits/women/72.jpg";
        }}
        alt="User avatar"
      />
      <div class="flex-1">
        <h3 class="text-lg  font-medium text-gray-800">{name}</h3>
        <p class="text-gray-600 ext-sm">{email}</p>
      </div>
      <div className="btn flex items-center gap-3">
        <i
          class={`${
            isFavourite ? "text-red-600" : ""
          } fa-regular fa-star cursor-pointer`}
        ></i>

        <button onClick={() => handleDelete(id)}>
          <BiTrash fontSize={20} />
        </button>

        <button onClick={()=>handleShow(id)} class="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100">
          Details
        </button>
      </div>
    </li>
  );
};

export default FavouriteComponent;
