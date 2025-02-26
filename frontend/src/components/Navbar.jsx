import { useState } from "react"
import { IoIosSend } from "react-icons/io";
import { MdLocationOff } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import { useEffect } from "react";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Navbar = ({
  locsearch,
  setlocsearch,
  latitude,
  setlatitude,
  longitude,
  setlongitude,
  getdata,
  setgetdata,
}) => {
    const [lat, setlat] = useState("")
    const [lon, setlon] = useState("")
    const [desc, setdesc] = useState("")
    const navigate = useNavigate();
    

  return (
    <>
    <div className=" flex w-full justify-center bg-slate-300 text-black">
    <div className="flex justify-between items-center max-w-2xl ">
      <div className="text-xl p-5">
        Restaurant data
      </div>
      <div className="flex justify-around gap-2">
        <input className="p-2 text-center rounded-full w-1/5" type="text" placeholder="latitude" value={lat} onChange={(e)=>{setlat(e.target.value);setlatitude(parseFloat(e.target.value));}}/>
        <input className="p-2 text-center rounded-full w-1/5" type="text" placeholder="longitude" value={lon} onChange={(e)=>{setlon(e.target.value);setlongitude(parseFloat(e.target.value));}}/>
        <button className="bg-slate-50 p-2 h-10 w-10 rounded-full " onClick={()=>{setgetdata((getdata+1)%2)}}><IoIosSend size="25px"/></button>
        <button className="bg-slate-50 p-2 h-10 w-10 rounded-full " onClick={()=>{if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
          (position) => {
              console.log(`latitude : ${position.coords.latitude}`);
              console.log(`longitude : ${position.coords.longitude}`);
              setlat(position.coords.latitude);
              setlon(position.coords.longitude);
              setlatitude(parseFloat(position.coords.latitude));
              setlongitude(parseFloat(position.coords.longitude));
          },
          (err) => {
              alert("enter location manually")
              console.log(`error ${err.message}`);
        }
      );
  } else {
    alert("enter location manually")
    console.log("error");
  }}}><FaLocationCrosshairs size="25px"/></button>
        <button className="bg-slate-50 p-2 h-10 w-10 rounded-full " onClick={()=>{setlocsearch((locsearch+1)%2)}}>{locsearch? <MdLocationOff size="25px" /> : <MdLocationOn size="25px"/>}</button>
      </div>
    </div>
    
    </div>
    <div className="flex justify-center w-full bg-slate-300 text-black">
    <div className="flex p-2 justify-end gap-2 items-center w-full max-w-2xl ">
    <input className="p-2 text-center rounded-full w-2/3 " type="text" placeholder="search" value={desc} onChange={(e)=>{setdesc(e.target.value);}}/>
    <button className="bg-slate-50 p-2 h-10 w-10 rounded-full " onClick={()=>{navigate(`/descriptionsearch?desc=${desc}`)}}><FaSearch size="25px"/></button>

    </div>
    
    </div>

    
    </>
  )
}

export default Navbar


