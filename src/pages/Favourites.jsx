import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { STATUS, setSearch } from "../redux/ContactsSlice";
import { BiSolidContact } from "react-icons/bi";
import { ClipLoader } from "react-spinners";
import { fetchFavouriteUsers } from "../redux/FavouriteSlice";
import FavouriteComponent from "../components/FavouriteComponent";
import { ToastContainer } from "react-toastify";
import FavSingleUser from "../components/FavSingleUser";





const Favourites = () => {
  const dispatch = useDispatch();
  const { favouriteUsers, isLoading } = useSelector((state) => state.FavouriteContacts);
  const [searchData,setSearchData] = useState('')
 

  useEffect(() => {
    dispatch(fetchFavouriteUsers());
   
  }, []);


  useEffect(()=>{
       dispatch(setSearch(searchData))
  },[searchData])
  

  return (
    <>
    <ToastContainer autoClose={1000}/>
    <div class="bg-white shadow-md rounded-md overflow-hidden  mx-auto bg-transparent ">
      <div
        className={` w-2/3 mx-auto   bg-white shadow-md rounded-md mb-10   p-4`}
      >
        <div class="bg-gray-100 mt-2 py-6 md:py-4 px-4 flex justify-between items-center   md:flex-row ">
          <div className="lg:flex items-center p-4 hidden">
            <h2 class="text-2xl font-semibold text-gray-800 text-center md:text-left">
              Fav. Contacts
            </h2>
            <span className="ml-4">
              <BiSolidContact size={25} />
            </span>
          </div>
          <div className="searchbar flex-1 relative">
            <input type="text" className="  w-full h-8 border-none outline-none px-8 rounded-xl text-sm" placeholder="Search Favourites..."
              onChange={(e)=>setSearchData(e.target.value)}
            />
            <i class="fa-solid fa-magnifying-glass absolute top-2 left-2  "></i>
          </div>
          <NavLink to="/">
            <button class="ml-3 hidden md:inline-block  h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100">
              Add Contacts +
            </button>
          </NavLink>

          <NavLink to="/" className="md:hidden">
            <button class="ml-3  h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100">
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

        {STATUS.Success === isLoading && favouriteUsers.length === 0 ? (
          <div className=" flex justify-center flex-col items-center h-[400px] ">
          <i class=" text-3xl fa-regular fa-star"></i>
            <h1 className="text-2xl md:text-3xl">No Favourites!</h1>

           
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
            {
              favouriteUsers.filter((user)=>{
                  if(searchData.length < 0){
                       return  user;
                  }else{
                       return user.name.toLowerCase().includes(searchData.toLowerCase()) || user.name.toLowerCase().includes(searchData.toLowerCase()) || user.phone.includes(searchData)
                  }
              })
              
               .map((users, index) => (
              <FavouriteComponent key={users.id} users={users} index={index} />
            ))}
          </div>
        )}
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
        <FavSingleUser/>
      </>
  );
};

export default Favourites;
