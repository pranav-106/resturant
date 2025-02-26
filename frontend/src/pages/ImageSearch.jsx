import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useRef } from "react";
import Restaurant from "../components/Restaurant";
import axios from "axios";
import { useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { IoRestaurant } from "react-icons/io5";

const genAI = new GoogleGenerativeAI("AIzaSyBxsaRtTuZxat16igMqD6-vWtrHcYQrarc");
const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-pro' });
const ImageSearch = () => {
    const [pg, setpg] = useState(1);
    const [cuisines, setcuisines] = useState([])
    const [restaurants, setRestaurants] = useState([]);
    const originalArray=['Afghani', 'African', 'American', 'Andhra', 'Arabian', 'Argentine', 'Armenian', 'Asian', 'Assamese', 'Australian', 'Awadhi', 'BBQ', 'Bakery', 'Bar Food', 'Belgian', 'Bengali', 'Beverages', 'Bihari', 'Biryani', 'Brazilian', 'Breakfast', 'British', 'Bubble Tea', 'Burger', 'Burmese', 'Börek', 'Cafe', 'Cajun', 'Canadian', 'Cantonese', 'Caribbean', 'Charcoal Grill', 'Chettinad', 'Chinese', 'Coffee and Tea', 'Contemporary', 'Continental', 'Cuban', 'Curry', 'Deli', 'Desserts', 'Dim Sum', 'Diner', 'Durban', 'Döner', 'European', 'Fast Food', 'Filipino', 'Finger Food', 'Fish and Chips', 'French', 'Fresh Fish', 'Fusion', 'German', 'Goan', 'Greek', 'Grill', 'Gujarati', 'Hawaiian', 'Healthy Food', 'Hyderabadi', 'Ice Cream', 'Indian', 'Indonesian', 'International', 'Iranian', 'Italian', 'Izgara', 'Japanese', 'Juices', 'Kashmiri', 'Kerala', 'Kiwi', 'Korean', 'Latin American', 'Lebanese', 'Lucknowi', 'Maharashtrian', 'Malay', 'Malaysian', 'Mangalorean', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Mineira', 'Mithai', 'Modern Australian', 'Modern Indian', 'Moroccan', 'Mughlai', 'Naga', 'Nepalese', 'North Eastern', 'North Indian', 'Pakistani', 'Parsi', 'Patisserie', 'Persian', 'Pizza', 'Portuguese', 'Pub Food', 'Rajasthani', 'Ramen', 'Raw Meats', 'Salad', 'Sandwich', 'Scottish', 'Seafood', 'Singaporean', 'Soul Food', 'South African', 'South Indian', 'Southern', 'Southwestern', 'Spanish', 'Sri Lankan', 'Steak', 'Street Food', 'Sushi', 'Tapas', 'Tea', 'Teriyaki', 'Tex-Mex', 'Thai', 'Tibetan', 'Turkish', 'Turkish Pizza', 'Vegetarian', 'Vietnamese', 'Western', 'World Cuisine', 'Afghani', 'African', 'American', 'Andhra', 'Arabian', 'Argentine', 'Asian', 'Asian Fusion', 'Assamese', 'Australian', 'Awadhi', 'BBQ', 'Bakery', 'Bar Food', 'Bengali', 'Beverages', 'Bihari', 'Biryani', 'Brazilian', 'Breakfast', 'British', 'Burger', 'Burmese', 'Cafe', 'Cajun', 'Caribbean', 'Charcoal Grill', 'Chinese', 'Coffee and Tea', 'Contemporary', 'Continental', 'Cuban', 'Cuisine Varies', 'Desserts', 'Drinks Only', 'Döner', 'European', 'Fast Food', 'Filipino', 'Finger Food', 'French', 'German', 'Goan', 'Gourmet Fast Food', 'Greek', 'Grill', 'Gujarati', 'Hawaiian', 'Healthy Food', 'Hyderabadi', 'Ice Cream', 'Indian', 'Indonesian', 'International', 'Irish', 'Italian', 'Izgara', 'Japanese', 'Juices', 'Kashmiri', 'Kebab', 'Kerala', 'Kiwi', 'Korean', 'Latin American', 'Lebanese', 'Lucknowi', 'Maharashtrian', 'Malaysian', 'Malwani', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Mithai', 'Modern Australian', 'Modern Indian', 'Mughlai', 'Naga', 'Nepalese', 'New American', 'North Eastern', 'North Indian', 'Oriya', 'Pakistani', 'Parsi', 'Patisserie', 'Peranakan', 'Persian', 'Peruvian', 'Pizza', 'Portuguese', 'Pub Food', 'Rajasthani', 'Ramen', 'Raw Meats', 'Restaurant Cafe', 'Salad', 'Sandwich', 'Scottish', 'Seafood', 'Singaporean', 'South American', 'South Indian', 'Southern', 'Spanish', 'Sri Lankan', 'Steak', 'Street Food', 'Sunda', 'Sushi', 'Taiwanese', 'Tapas', 'Tea', 'Tex-Mex', 'Thai', 'Tibetan', 'Turkish', 'Turkish Pizza', 'Vietnamese', 'Western', 'World Cuisine'];
    const imgref = useRef()
    const navigate = useNavigate();

    const back = ()=>{
    navigate(`/`);
    }
    const getdata = async () => {
        setpg(1);
        const file = imgref.current.files[0];
        if (!file) return;

        const imageResp = await file.arrayBuffer();
        const base64String = btoa(
            new Uint8Array(imageResp).reduce((data, byte) => data + String.fromCharCode(byte), "")
        );
        
        const result = await model.generateContent([
            {
                inlineData: {
                    data: base64String,
                    mimeType: file.type,
                },
            },
            "Check if the given food image belongs to any of the following cuisines: [' Turkish', ' European', ' Mithai', ' Mediterranean', ' Malaysian', 'Arabian', ' Lucknowi', 'Rajasthani', ' Latin American', ' Kiwi', 'Tibetan', 'Awadhi', 'Irish', ' Diner', ' Southwestern', 'French', ' Vegetarian', 'Bar Food', ' Caribbean', ' Biryani', ' African', ' British', ' Teriyaki', ' Continental', ' North Indian', 'Latin American', 'Sushi', ' Nepalese', 'New American', ' Ramen', 'Brazilian', ' World Cuisine', 'Naga', 'Gourmet Fast Food', ' Southern', ' Moroccan', 'Singaporean', ' Durban', ' Charcoal Grill', 'Vietnamese', 'Drinks Only', 'Bakery', 'Peranakan', 'Modern Australian', ' North Eastern', ' Street Food', 'Healthy Food', 'International', ' Western', ' Deli', ' Pizza', 'African', ' Modern Australian', ' Bubble Tea', ' Thai', ' Singaporean', 'Mexican', ' Middle Eastern', 'Tex-Mex', 'Portuguese', ' Desserts', 'Contemporary', 'Grill', 'Burmese', ' Bihari', 'Afghani', ' Italian', 'Ramen', ' German', ' Bengali', 'Raw Meats', 'Korean', 'Juices', ' Chinese', 'Lebanese', 'Cuisine Varies', 'Sandwich', ' Izgara', 'Kiwi', ' Patisserie', ' Sandwich', 'Bengali', ' Breakfast', 'World Cuisine', ' Fast Food', ' Healthy Food', 'Pizza', 'Cajun', ' Chettinad', ' Awadhi', 'Goan', 'Mithai', ' Australian', 'Indian', ' Ice Cream', ' Kashmiri', 'Breakfast', 'Mughlai', 'Malwani', ' Cuban', ' Cantonese', 'Salad', ' Brazilian', 'Filipino', ' Assamese', 'Pakistani', ' Turkish Pizza', 'Modern Indian', ' Juices', ' Burger', 'Spanish', 'Nepalese', ' Bakery', ' Salad', 'South Indian', 'Peruvian', 'Andhra', 'Gujarati', ' Naga', 'Steak', ' Tibetan', 'Fast Food', ' Maharashtrian', 'Maharashtrian', ' Tea', ' Grill', ' Filipino', ' Argentine', ' Rajasthani', ' Greek', 'Japanese', 'Parsi', 'Argentine', 'Tapas', ' Goan', ' Tex-Mex', 'European', ' Fish and Chips', 'Persian', 'Continental', ' Melaysian', ' Mughlai', ' Burmese', 'Oriya', ' Cajun', ' Portuguese', ' Bar Food', 'BBQ', ' South Indian', ' American', ' Kerala', 'Sunda', ' Raw Meats', 'Greek', ' Seafood', ' Asian', ' Indonesian', ' Döner', 'Asian Fusion', ' Spanislaysian', ' Mughlai', ' Burmese', 'Oriya', ' Cajun', ' Portuguese', ' Bar Food', 'BBQ', ' South Indian', ' American', ' Kerala', 'Sunda', ' Raw Meats', 'Greek', ' Seafood', ' Asian', ' Indonesian', ' Döner', 'Asian Fusion', ' Spanish', ' Lebanese', ' Mineira', 'North Eastern', ' Steak', ' Coffee and Tea', 'Biryani', ' Hyderabadi', ' BBQ', ' Arabian', 'British', 'Desish', 'Coffee and Tea', 'Middle Eastern', ' Fusion', ' Börek', 'Thai', 'Seafood', 'Caribbean', 'Chinese', 'Burger', ' Dim Sum', ' Beverages'ish', 'Coffee and Tea', 'Middle Eastern', ' Fusion', ' Börek', 'Thai', 'Seafood', 'Caribbean', 'Chinese', 'Burger', ' Dim Sum', ' Beverages', ' Curry', ' Persian', ' Malay', ' Cafe', ' Pakistani', ' Modern Indian', 'Beverages', ' Sri Lankan', ' Armenian', ' Sushi', ' Hawaiian', 'Hyderabadi', 'Cafe', ' Mangalorean', 'Izgara', 'Scottish', ' Vietnamese', 'Patisserie', 'American', 'Turkish', 'Assamese', 'Kashmiri', 'Lucknowi', ' Soul Food', 'Charcoal Grill', 'Western', 'Italian', ' South African', 'Kebab', ' Scottish', 'Asian', ' International', 'South American', 'German', ' Afghani', 'Finger Food', 'Australian', ' Finger Food', 'Restaurant Cafe', ' Japanese'] . Return the relevant cuisines in csv string format."]);
        const cuisinesString = result.response.text();
        const cuisinesArray = cuisinesString.split(",");
        const matches = cuisinesArray.filter(cuisine => originalArray.includes(cuisine));
        setcuisines(matches);
        const queryString = matches.map(key => `key=${encodeURIComponent(key)}`).join("&");
        console.log(matches);
        const fetchRestaurants = async () => {
            try {
              const response = await axios.get(`http://localhost:5000/getbykeywords?${queryString}&pg=${pg}`);
              setRestaurants(response.data);
            } catch (error) {
              console.error("Error fetching restaurants:", error);
            }
          };
      
        fetchRestaurants();

    };
    useEffect(() => {
        const file = imgref.current.files[0];
        if (!file) return;

        
        const matches = cuisines;
        const queryString = matches.map(key => `key=${encodeURIComponent(key)}`).join("&");
        console.log(matches);
        const fetchRestaurants = async () => {
            try {
              const response = await axios.get(`http://localhost:5000/getbykeywords?${queryString}&pg=${pg}`);
              setRestaurants(response.data);
            } catch (error) {
              console.error("Error fetching restaurants:", error);
            }
          };
      
        fetchRestaurants();
      }, [pg]);
  return (
    <>
    <div className=" flex w-full justify-center bg-slate-300 text-black">
        <div className="flex-col justify-between items-center max-w-2xl ">
          <div className="text-xl p-5">
            Restaurant data
          </div>
          <div className="flex justify-center gap-1 p-1">
          <input ref={imgref} type="file" name="food" id="foodimg" />
      <div className="flex cursor-pointer " onClick={()=>{getdata()}}  ><IoRestaurant size="25px" /></div>
      <div className="flex cursor-pointer " onClick={()=>{back()}}  >
        <FaHome size="25px"/>
      </div>
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
          <p>Restaurants Loading...</p>
        )}
      </div>
      <div className="flex justify-center gap-3 text-xl">
      <button onClick={() => setpg(Math.max(1, pg - 1))}>Previous</button>
      <button onClick={() => setpg(pg + 1)}>Next</button>
    </div>
      
    </div>
    
    </>
  )
}

export default ImageSearch
