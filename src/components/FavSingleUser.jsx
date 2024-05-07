import React from 'react'
import { BiPhone, BiX } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux'
import { setshow } from '../redux/FavouriteSlice';


const FavSingleUser = () => {
   const dispatch = useDispatch()
   const {show,  singleFavUser } = useSelector(
      (state) => state.FavouriteContacts
    );
  
  return (
   <div
   className={`${
     show ? "" : "hidden"
   }  absolute top-0 left-0 w-full h-[950px] backdrop-blur`}
 >
   <div className="px-4 min-h-screen md:flex md:items-center md:justify-center">
      
     { singleFavUser.map((user) => (
       <div class=" relative max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">

         <div class="rounded-t-lg h-32 overflow-hidden">
           <img
             class="object-cover object-top w-full"
             src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
             alt="Mountain"
           />
         </div>
         <div class="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
           <img
             class="object-cover object-center w-32 h-32"
             src={user.img_url}
             onError={(e)=>{e.target.src = "https://randomuser.me/api/portraits/women/72.jpg"}}
             alt="profile pic"
           />
         </div>
         <div class="text-center mt-2">
           <h2 class="font-semibold">{user.name}</h2>
           <p class="text-gray-500">{user.email}</p>
           <p class="text-gray-500">{user.phone}</p>
         </div>

         <ul class="py-4 mt-2 text-gray-700 flex items-center justify-around">
           <li class="flex flex-col items-center justify-around">
             <svg
               class="w-4 fill-current text-blue-900"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 20 20"
             >
               <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
             </svg>
             <div>2k</div>
           </li>
           <li class="flex flex-col items-center justify-between">
             <svg
               class="w-4 fill-current text-blue-900"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 20 20"
             >
               <path d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0\ 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
             </svg>
             <div>10k</div>
           </li>
           <li class="flex flex-col items-center justify-around">
             <svg
               class="w-4 fill-current text-blue-900"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 20 20"
             >
               <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
             </svg>
             <div>15</div>
           </li>
         </ul>
         <div class="p-4 border-t mx-8 mt-2">
         
           <button
            
             class=" flex justify-center items-center gap-2 cursor-pointer w-1/2  mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2"
           >
            <BiPhone/> Call
           </button>
         </div>
         <BiX  onClick={() => dispatch(setshow())} className=' cursor-pointer absolute top-2 right-2' size={40}/>
       </div>
     
     ))}
   </div>
 </div>
  )
}

export default FavSingleUser