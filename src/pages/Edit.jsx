import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { UpdateUser } from "../redux/ContactsSlice";
import { toast } from "react-toastify";


const Edit = () => {
  const { id } = useParams();
  const [user, setUser] = useState("");
const navigate = useNavigate();

  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.contacts);

  useEffect(() => {
    if (id) {
      const user = users.filter((user) => user.id === id);
      setUser(...user);
    }
    
  }, []);


  const handleChange = (e) => {
      setUser({...user,[e.target.name]:e.target.value})
  };
  const handleEdit = (id) => {
      dispatch(UpdateUser(id,user))
      toast('Contact Updated') 
      navigate('/')
  };
  return (
    <div className="container mx-auto h-[700px] px-10 flex flex-col items-center mt-2 ">
      <div class="max-w-md mx-auto m-6 w-full  bg-white shadow-lg rounded-lg overflow-hidden">
        <div class="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
          Edit Contact
        </div>
        <div class="py-4 px-6">
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="name">
              Contact Pic Url
            </label>
            <input
              class="shadow text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="img_url"
              type="url"
              required
              value={user && user.img_url}
              placeholder="Enter image Url"
              onChange={handleChange}
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="name">
              Name
            </label>
            <input
              class=" text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="name"
              type="text"
              value={user && user.name}
              placeholder="Enter your name"
              onChange={handleChange}
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="email">
              Email
            </label>
            <input
              class="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              type="email"
              value={user && user.email}
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="phone">
              Phone Number
            </label>
            <input
              class="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="phone"
              type="tel"
              value={user && user.phone}
              placeholder="Enter your phone number"
              onChange={handleChange}
            />
          </div>

          <div class="flex items-center justify-center m-6">
            <button
              class="bg-gray-900 text-white py-1 px-8 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
              onClick={()=>{handleEdit(id)}}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
