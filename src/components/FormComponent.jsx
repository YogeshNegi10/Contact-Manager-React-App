import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  createUser,} from "../redux/ContactsSlice";
import { toast } from "react-toastify";

const FormComponent = () => {

const navigate = useNavigate();
const dispatch = useDispatch();

const [user,setUser] = useState({
  img_url:'',
  name:'',
  email:'',
  phone:''
})


const handleChange = (e) =>{
    const Name = e.target.name
    const value = e.target.value
    setUser((prev)=>({...prev,[Name]:value,
    }))
     
}

  const handleAdd = () => {

    if(user.email  === '' || user.img_url === '' || user.name === "" || user.phone === ''){
       alert('Fill all the Details First')
       return;
    }
    
    toast('Contact Added !')
    dispatch(createUser(user))
    setUser('')
    navigate("/")
 
  
  };
  return (
    <div className="container mx-auto h-[700px] px-10 flex flex-col items-center mt-2 ">
     
    <div class="max-w-md mx-auto m-6 w-full  bg-white shadow-lg rounded-lg overflow-hidden">
      <div class="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
        Add Contact
      </div>
      <div class="py-4 px-6">
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="name">
            Contact Pic Url
          </label>
          <input
            class="shadow text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="img_url"
            type='url'
            required
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
            placeholder="Enter your phone number"
            onChange={handleChange}
          />
        </div>

        <div class="flex items-center justify-center m-6">
          <button
            class="bg-gray-900 text-white py-1 px-8 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default FormComponent;
