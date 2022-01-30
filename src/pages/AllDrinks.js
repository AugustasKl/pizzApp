import { useEffect } from "react";
import DrinksList from "../components/drinks/DrinksList";
import useHttp from "../customHook/httpHook";
import { fetchAllData, fetchAllDrinks } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoPizzaFound from "../components/pizzas/NoPizzaFound";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Drinks = () => {
  
  const dispatch=useDispatch()
  const drinksData=useSelector((state)=>state.api.drinks)
  const notifications=useSelector((state)=>state.ui.status)
  console.log(drinksData)
  useEffect(()=>{
    dispatch(fetchAllData('drinks'))
  },[dispatch])

  if (notifications === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if(notifications === 'error'){
    return <p class='centered'style={{color:"yellow"}}>Unable to fetch data from server</p>
  }

  if(notifications==='success' && (!drinksData || drinksData.length===0)){
    return <NoPizzaFound/>
  }
  
  
  return <DrinksList drinks={drinksData} />;
};
export default Drinks;

// const DUMMY_DRINKS = [
//   {
//     id: "d1",
//     title: "7Up",
//     image:
//       "https://www.noriupicos.lt/wp-content/uploads/2021/10/7Up1200-300x1111.png",
//     price: 1.99,
//   },
//   {
//     id: "d2",
//     title: "Pepsi",
//     image:
//       "https://www.noriupicos.lt/wp-content/uploads/2021/10/7Up1200-300x1111.png",
//     price: 1.99,
//   },
//   {
//     id: "d3",
//     title: "Coca-cola",
//     image:
//       "https://www.noriupicos.lt/wp-content/uploads/2021/10/7Up1200-300x1111.png",
//     price: 1.99,
//   },
//   {
//     id: "d4",
//     title: "Sprite",
//     image:
//       "https://www.noriupicos.lt/wp-content/uploads/2021/10/7Up1200-300x1111.png",
//     price: 1.99,
//   },
//   {
//     id: "d5",
//     title: "Fanta",
//     image:
//       "https://www.noriupicos.lt/wp-content/uploads/2021/10/7Up1200-300x1111.png",
//     price: 1.99,
//   },
// ];