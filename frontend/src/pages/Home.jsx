import Navbar from "../components/Navbar";
import ListRestaurant from "../components/ListRestaurant";
import { useState, useEffect } from "react";
import LocRestaurant from "../components/LocRestaurant";
import { useNavigate } from "react-router-dom";
import { MdImageSearch } from "react-icons/md";

const Home = () => {
    const navigate = useNavigate();
    
    const imsearch = () => {
        navigate(`/imgsearch`);
    };

    const [pg, setpg] = useState(1);
    const [latitude, setlatitude] = useState(0);
    const [longitude, setlongitude] = useState(0);
    const [getdata, setgetdata] = useState(0);
    const [locsearch, setlocsearch] = useState(false);

    useEffect(() => {
        if (getdata === 1) {
            setpg(1);
            setlocsearch(true);
            setgetdata((getdata + 1) % 2);
        }
    }, [getdata]);

    return (
        <>
           
            <header className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center py-6 shadow-md">
                <h1 className="text-3xl font-bold tracking-wide">Find Your Favorite Restaurants</h1>
                <p className="text-lg text-gray-200 mt-1">Discover the best places to eat near you</p>
            </header>

            <Navbar 
                locsearch={locsearch} 
                setlocsearch={setlocsearch} 
                latitude={latitude} 
                setlatitude={setlatitude} 
                longitude={longitude} 
                setlongitude={setlongitude} 
                getdata={getdata} 
                setgetdata={setgetdata} 
            />

            <div className="flex flex-col items-center p-4">
                {!locsearch ? (
                    <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-4">
                        <ListRestaurant pg={pg} setpg={setpg} />
                    </div>
                ) : (
                    <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-4">
                        <LocRestaurant getdata={getdata} latitude={latitude} longitude={longitude} pg={pg} setpg={setpg} />
                    </div>
                )}
            </div>

            
            <button 
                className="p-4 fixed w-14 h-14 bottom-12 right-10 bg-blue-600 text-white hover:bg-blue-700 cursor-pointer rounded-full shadow-lg transition-transform transform hover:scale-110"
                onClick={() => imsearch()}
            >
                <MdImageSearch size="25px" />
            </button>
        </>
    );
};

export default Home;
