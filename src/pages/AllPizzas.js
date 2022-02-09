import PizzaList from "../components/pizzas/PizzaList";
import { fetchAllData } from "../lib/api";
import { useEffect } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoPizzaFound from "../components/pizzas/NoPizzaFound";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


const Pizzas = () => {
  const dispatch=useDispatch()
  const pizzaData=useSelector((state)=>state.api.items)
  const notifications=useSelector((state)=>state.ui.status)
  
// fetch pizzasData from an API
  useEffect(()=>{
    dispatch(fetchAllData('pizzas'))
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
    return <p className='centered'style={{color:"yellow"}}>Unable to fetch data from server</p>
  }

  if(notifications==='success' && (!pizzaData || pizzaData.length===0)){
    return <NoPizzaFound/>
  }
  return( 
  <PizzaList pizzas={pizzaData} />
  )
};

export default Pizzas;

