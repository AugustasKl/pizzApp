import classes from "./PopularPizzas.module.css";
import PizzaItem from "./PizzaItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllData } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import {motion} from 'framer-motion'
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

  useEffect(() => {
    dispatch(fetchAllData("pizzas"));
  }, [dispatch]);

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

  const shuffled = [...pizzaData].sort(() => 0.5 - Math.random());
  let selected = shuffled.slice(0, 4);

  return (
    <section className={classes.pizza}>
      <h1 className={classes.text}>Our Recommendations to You</h1>
      <motion.ul className={classes.list}
         variants={containerVariants}
            initial="hidden"
            animate="visible">
        {selected.map((pizza, i) => {
          return (
              <PizzaItem
              id={pizza.id}
              key={pizza.id}
              title={pizza.title}
              ingredients={pizza.ingredients}
              image={pizza.image}
              price={pizza.price}
              />
          );
        })}
      </motion.ul>
    </section>
  );
};

export default PopularPizzas;

// const DUMMY_PIZZAS = [
//   {
//     id: "p1",
//     title: "Margarita",
//     image:"https://www.noriupicos.lt/wp-content/uploads/2021/10/09adca10-8ccc-4518-b490-f2cb84af72a1-1-700x465.png",
//     price: 9.99,
//     ingredients: ["Tomato sauce", "Olive oil", "Pesto", "Sliced ham"],
//     spiceLevel:0
//   },
//   {
//     id: "p2",
//     title: "Peperoni",
//     image:"https://www.noriupicos.lt/wp-content/uploads/2021/10/09adca10-8ccc-4518-b490-f2cb84af72a1-1-700x465.png",
//     price: 8.99,
//     ingredients: ["Tomato sauce", "Olive oil", "Pesto", "Sliced ham"],
//     spiceLevel:1
//   },
//   {
//     id: "p3",
//     title: "Neapoli",
//     image: "https://www.noriupicos.lt/wp-content/uploads/2021/10/09adca10-8ccc-4518-b490-f2cb84af72a1-1-700x465.png",
//     price: 10.99,
//     ingredients: ["Tomato sauce", "Olive oil", "Pesto", "Sliced ham"],
//     spiceLevel:2
//   },
//   {
//     id: "p4",
//     title: "Mexican",
//     image:"https://www.noriupicos.lt/wp-content/uploads/2021/10/09adca10-8ccc-4518-b490-f2cb84af72a1-1-700x465.png",
//     price: 9.99,
//     ingredients: ["Tomato sauce", "Olive oil", "Pesto", "Sliced ham", "Tomato sauce", "Tomato sauce","Tomato sauce"],
//     spiceLevel:3
//   },
// ];
