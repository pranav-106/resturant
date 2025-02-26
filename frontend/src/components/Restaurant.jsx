import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdStars } from "react-icons/md";
import { BiSolidUpvote } from "react-icons/bi";
import { TbMultiplier2X } from "react-icons/tb";
import { FaUser } from "react-icons/fa";

const Restaurant = ({data}) => {
  const navigate = useNavigate();
  const show = ()=>{
    navigate(`/restaurantdata?id=${data.restaurant.R.res_id}`);
  }
  return (
    
    <div className="flex justify-center ">
    <div className="flex max-w-2xl w-full p-2 items-center">
      <img className="w-20 h-20" src={data.restaurant.featured_image} alt="img" />
      <div className="flex-col w-full p-3">
        <div className="flex items-center justify-between">
            <div className="text-xl cursor-pointer" onClick={()=>{show()}}>{data.restaurant.name}</div>
            <div className="flex gap-1">{data.restaurant.user_rating.aggregate_rating}<MdStars size="25px"/> </div>
        </div>
        <div className="text-xl">{data.restaurant.cuisines}</div>
        <div className="flex items-center justify-between">
            <div className="flex gap-1">{data.restaurant.user_rating.votes}<BiSolidUpvote size="25px" /></div>
            <div className="flex gap-1">{data.restaurant.currency+" "+data.restaurant.average_cost_for_two}<TbMultiplier2X size="25px"/><FaUser size="20px"/></div>
        </div> 
        
      </div>
    </div>
    </div>
  )
}

export default Restaurant
