import React from 'react'
import { useLocation } from "react-router-dom";
import { useEffect } from 'react';
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaHome } from 'react-icons/fa';
import { RiTakeawayFill } from "react-icons/ri";
import { IoIosRestaurant } from "react-icons/io";
import { CgUnavailable } from "react-icons/cg";
import { MdStars } from "react-icons/md";
import { BiSolidUpvote } from "react-icons/bi";
import { TbMultiplier2X } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { IoMdPhotos } from "react-icons/io";
import { MdMenuBook } from "react-icons/md";
import { MdEventSeat } from "react-icons/md";

const Restaurantdata = () => {
    const navigate = useNavigate();
    const back = ()=>{
    navigate(`/`);
    }
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    const [data, setdata] = useState()
    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
              const response = await axios.get(`http://localhost:5000/restaurant/${id}`);
              setdata(response.data);
            } catch (error) {
              console.error("Error fetching restaurants:", error);
            }
          };
      
          fetchRestaurants();
    }, [])
    if(!data){
        return <><div>loading ...</div></>
    }
    
  return (
    <>

    <div className=" flex w-full justify-center bg-slate-300 text-black">
            <div className="flex justify-between items-center max-w-2xl ">
              <div className="text-xl p-5">
                Restaurant data
              </div>
              <div className="flex cursor-pointer " onClick={()=>{back()}}  >
        <FaHome size="25px"/>
      </div>
            </div>
    </div>
    <div className="flex justify-center ">
    <div className="flex-col max-w-2xl w-full p-2 items-center">
      <img className="w-full h-30" src={data.restaurant.featured_image} alt="img" />
      <div className="flex-col w-full p-3">
        <div className="flex items-center justify-end gap-3">
            <IoIosRestaurant size="25px" />
            {data.restaurant.has_online_delivery===1 && <RiTakeawayFill size="25px" />}
            {data.restaurant.has_online_delivery===0 && < CgUnavailable size="25px" />}
        </div>
        <div className="flex items-center justify-between">
            <div className="text-xl cursor-pointer" ><a href={data.restaurant.url}>{data.restaurant.name}</a></div>
            <div className="flex gap-1">{data.restaurant.user_rating.aggregate_rating}<MdStars size="25px"/> </div>
        </div>
        <div className="text-xl">{data.restaurant.cuisines}</div>
        <div className="flex items-center justify-between">
            <div className="flex gap-1">{data.restaurant.user_rating.votes}<BiSolidUpvote size="25px" /></div>
            <div className="flex gap-1">{data.restaurant.currency+" "+data.restaurant.average_cost_for_two}<TbMultiplier2X size="25px"/><FaUser size="20px"/></div>
        </div>        
      </div>
      <div className="flex w-full p-3 gap-3">
        <div className='flex-col'>
        <div className='flex items-center justify-between'>
        <div>
          {data.restaurant.location.city}
        </div>
        <div>
          {data.restaurant.location.locality}
        </div>
        </div>
      
        <div>
          {data.restaurant.location.address}
        </div>
        </div>
        <div className='flex justify-center gap-2'>
        <div className=" rounded-full bg-slate-400 h-7 p-1"> {data.restaurant.location.latitude}</div>
        <div className=" rounded-full bg-slate-400 h-7 p-1"> {data.restaurant.location.longitude}</div>
        </div>
      </div>
      <div>
      <div className='flex gap-3 p-2'>
        <a href={data.restaurant.photos_url}><IoMdPhotos size="25px"/></a>
        <a href={data.restaurant.menu_url}><MdMenuBook size="25px"/></a>
        <a href={data.restaurant.events_url}><MdEventSeat size="25px"/></a>
      </div>
        
        

      </div>
    </div>
    </div>
    </>
  )
}

export default Restaurantdata
