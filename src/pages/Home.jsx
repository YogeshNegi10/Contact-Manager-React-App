import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ContactComponent from "../components/ContactComponent";
import { useDispatch, useSelector } from "react-redux";
import { STATUS, fetchUsers, setSearch } from "../redux/ContactsSlice";
import { BiSolidContact } from "react-icons/bi";
import { ClipLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SingleUser from "../components/SingleUser";






const Home = () => {
  const dispatch = useDispatch();
  const { users,searchUser, isLoading } = useSelector((state) => state.contacts);

  const [searchData,setSearchData] = useState('')

  useEffect(() => {
    dispatch(fetchUsers());
 
  }, []);

 useEffect(()=>{
    dispatch(setSearch(searchData))
 },[searchData])
  
  return (
    <>

<ToastContainer autoClose={1000} />
    <div class="bg-white shadow-md rounded-md overflow-hidden  mx-auto bg-transparent ">

      <div
        className={` w-2/3 mx-auto   bg-white shadow-md rounded-md mb-10   md:p-4`}
      >
        <div class="bg-gray-100 mt-2 py-6 md:py-4 px-4 flex justify-between items-center   md:flex-row ">
          <div className="lg:flex items-center p-4 hidden">
            <h2 class="text-2xl font-semibold text-gray-800 text-center md:text-left">
              Contacts
            </h2>
            <span className="ml-3">
              <BiSolidContact size={30} />
            </span>
          </div>
          <div className="searchbar flex-1 relative">

            <input type="text" 
            className="  w-full h-8 border-none outline-none px-8 rounded-xl text-sm" placeholder="Search Contacts..." 
            value={searchData}
            onChange={(e)=>setSearchData(e.target.value)}
            />
            <i class="fa-solid fa-magnifying-glass absolute top-2 left-2  "></i>
          </div>
          <NavLink to="contacts">
            <button class=" ml-3 hidden md:inline-block  h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100">
              Add Contacts +
            </button>
          </NavLink>

          <NavLink to="contacts" className="md:hidden">
            <button class=" ml-3  h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100">
              Add +
            </button>
          </NavLink>
        </div>

        {STATUS.Error === isLoading ? (
          <div className=" flex justify-center flex-col items-center h-[400px] ">
            <h3 className="text-1xl md:text-2xl text-center">
              An Error Accoured....Please Refresh or Check Your Connection !
            </h3>
          </div>
        ) : (
          " "
        )}

        {STATUS.Success === isLoading && users.length === 0 ? (
          <div className=" flex justify-center flex-col items-center h-[400px] ">
            <i class="fa-regular fa-address-book text-6xl mb-2 "></i>
            <h1 className="text-2xl md:text-3xl">No Contacts Yet !</h1>

            <NavLink to="contacts">
              <button class=" mt-6 md:hidden h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100">
                Add One
              </button>
            </NavLink>
          </div>
        ) : (
          ""
        )}

        {STATUS.Loading === isLoading ? (
          <div className=" flex justify-center flex-col items-center h-[400px] ">
            <h1 className="text-2xl md:text-3xl">
              <ClipLoader
                loading={isLoading}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </h1>
          </div>
        ) : (
          <div class="divide-y  divide-gray-200 mb-2 h-[550px]  md:h-screen overflow-y-auto">
            

            {  users.filter((user)=>{
                   if(searchUser.length === 0 ){
                       return user;
                   }else{
                     return user.name.toLowerCase().includes(searchUser.toLowerCase()) ||  user.email.toLowerCase().includes(searchUser.toLowerCase()) || user.phone.includes(searchUser)
                   }
            })
              .map((users, index) => (
              <ContactComponent key={users.id} users={users} index={index} />
            ))}
          </div>
        )}


        {/* ------------------------------------------------ Menu for Mobile --------------------------------- */}
        <div class="md:hidden bg-gray-100 py-2 px-4 flex justify-between items-center  md:flex-row ">
        
            <div className=" text-center cursor-pointer">
             <Link to={'/favourite'}><i class="fa-regular fa-star"></i></Link> 
              <h4 className=" text-sm font-semibold text-gray-800 text-center md:text-left>Favourties">
                Favourties
              </h4>
            </div>

            <div className=" text-center cursor-pointer">
            <i class="fa-regular fa-clock"></i>
              <h4 className=" text-sm font-semibold text-gray-800 text-center md:text-left>Favourties">
                Recent
              </h4>
            </div>
            <div className=" text-center cursor-pointer">
            <Link to={'/'}><i class="fa-regular fa-user"></i></Link>
              <h4 className=" text-sm font-semibold text-gray-800 text-center md:text-left>Favourties">
                Contacts
              </h4>
            </div>


          </div>
        </div>
      </div>
      <SingleUser/>
      </>
  );
};

export default Home;
