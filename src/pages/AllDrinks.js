import { useEffect } from "react";
import DrinksList from "../components/drinks/DrinksList";
import { fetchAllData } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoPizzaFound from "../components/pizzas/NoPizzaFound";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Drinks = () => {
  const dispatch=useDispatch()
  const drinksData=useSelector((state)=>state.api.drinks)
  const notifications=useSelector((state)=>state.ui.status)

  //fetch drinks from an api
  useEffect(()=>{
    dispatch(fetchAllData('drinks'))
  },[dispatch])

  //while loading data showing spinner
  if (notifications === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }
  //error handler
  if(notifications === 'error'){
    return <p class='centered'style={{color:"yellow"}}>Unable to fetch data from server</p>
  }

  if(notifications==='success' && (!drinksData || drinksData.length===0)){
    return <NoPizzaFound/>
  }
  
  
  return <DrinksList drinks={drinksData} />;
};
export default Drinks;

