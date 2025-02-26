import Restaurant from "./Restaurant"
import { useEffect } from "react"
import axios from "axios";
import { useState } from "react";
const LocRestaurant = ({ getdata,latitude,longitude,pg,setpg }) => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        console.log(latitude)
        console.log(longitude)
        console.log(pg)
        const response = await axios.get(`http://localhost:5000/locrestaurantdata?page=${parseFloat(pg)}&latitude=${parseFloat(latitude)}&longitude=${parseFloat(longitude)}`);
        console.log(response)
        setRestaurants(response.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, [getdata,pg]);
  
  return (
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
      <button onClick={() => setpg(Math.max(1, pg - 1))}>Previous</button>
      <button onClick={() => setpg(pg + 1)}>Next</button>
      </div>
      
    </div>
  )
}

export default LocRestaurant