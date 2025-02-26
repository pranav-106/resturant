
import { useState } from 'react';
import { FaHome } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { IoIosSend } from 'react-icons/io';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import axios from 'axios';
import Restaurant from '../components/Restaurant';
import { FaSearch } from 'react-icons/fa';
import { MdImageSearch } from 'react-icons/md';
const DescriptionSearch = () => {
    const [searchparams, setsearchparams] = useSearchParams();
    const [desc, setdesc] = useState("")
    const [page, setpage] = useState(1)
    const [send, setsend] = useState(false)
    const [restaurants, setrestaurants] = useState([])
    const navigate = useNavigate();
    const back = ()=>{
        navigate(`/`);
    }
    const imsearch = () =>{
        navigate(`/imgsearch`);
    }
    const fetchRestaurants = async () => {
            try {
                if(!desc){
                    setdesc(searchparams.get("desc"));
                }
                else{
                    searchparams.set("desc",desc);
                    setsearchparams(searchparams);
                }
              const response = await axios.get(`https://resturant-1-irer.onrender.com/getDatabykeywords?page=${page}&desc=${searchparams.get("desc")}`);
              console.log(response)
              setrestaurants(response.data);
            } catch (error) {
              console.error("Error fetching restaurants:", error);
            }
    };
    useEffect(() => {
        fetchRestaurants();
    }, [page,send])
    
    
    
  return (
    <>
    <div className=" flex w-full justify-center bg-slate-300 text-black">
        <div className="flex justify-between items-center max-w-2xl ">
          <div className="text-xl p-5">
            Restaurant data
          </div>
          <div className="flex justify-around gap-2">
            <input className="p-2 text-center rounded-full w-1/5" type="text" placeholder="search" value={desc} onChange={(e)=>{setdesc(e.target.value);}}/>
            <button className="bg-slate-50 p-2 h-10 w-10 rounded-full " onClick={()=>{setsend(!send)}}><FaSearch size="25px"/></button>
            <button className="bg-slate-50 p-2 h-10 w-10 rounded-full " onClick={()=>{back();}}><FaHome size="25px"/></button>
          </div>
        </div>
        </div>
        <div className="flex-row">
      <div>
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <Restaurant key={restaurant._id} data={restaurant} />
          ))
        ) : (
          <p>restaurants Notfound...</p>
        )}
      </div>
      <div className="flex justify-center gap-3 text-xl">
      <button onClick={() => setpage(Math.max(1, page - 1))}>Previous</button>
      <button onClick={() => setpage(page + 1)}>Next</button>
      </div>
      
    </div>
    <button className="p-4 fixed w-14 h-14 bottom-12 right-10 bg-slate-600 text-white hover:bg-slate-700 cursor-pointer rounded-full" onClick={()=>{imsearch()}}><MdImageSearch size="25px" /></button>
    </>
  )
}

export default DescriptionSearch
