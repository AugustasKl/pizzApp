import classes from "./PopularPizzas.module.css";
import PizzaItem from "./PizzaItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllData } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import {motion} from 'framer-motion'

//framer motion animations
const containerVariants={
  hidden:{
    opacity:0,

    translateY:-50
  },
  visible:{
    opacity:1,
    translateY:0,
    transition:{
      duration:1.3,
    }
  }
}


const PopularPizzas = () => {
  const dispatch = useDispatch();
  const pizzaData = useSelector((state) => state.api.items);
  const status=useSelector((state)=>state.ui.status)

  //fetching pizzas from an API
  useEffect(() => {
    dispatch(fetchAllData("pizzas"));
  }, [dispatch]);

  //Loading data spinner
  if(status==='pending'){
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if(status === 'error'){
    return <p class='centered'style={{color:"yellow"}}>Unable to fetch data from server</p>
  }
  //show random pizzas from received pizzas
  const shuffled = [...pizzaData].sort(() => 0.5 - Math.random());
  let selected = shuffled.slice(0, 4);

  return (
    <section className={classes.pizza}>
      <h1 className={classes.text}>Our Recommendations to You</h1>
      <motion.ul className={classes.list}
         variants={containerVariants}
            initial="hidden"
            animate="visible">
        {selected.map((pizza) => {
          return (
              <PizzaItem
              id={pizza.id}
              key={pizza.id}
              title={pizza.title}
              ingredients={pizza.ingredients}
              image={pizza.image}
              price={pizza.price}
              hot={pizza.hot}
              />
          );
        })}
      </motion.ul>
    </section>
  );
};

export default PopularPizzas;

