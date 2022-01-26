import classes from "./PopularPizzas.module.css";
import PizzaItem from './PizzaItem'
const DUMMY_PIZZAS = [
  {
    id: "p1",
    title: "Margarita",
    image:"https://www.noriupicos.lt/wp-content/uploads/2021/10/09adca10-8ccc-4518-b490-f2cb84af72a1-1-700x465.png",
    price: 9.99,
    ingredients: ["Tomato sauce", "Olive oil", "Pesto", "Sliced ham"],
    spiceLevel:0
  },
  {
    id: "p2",
    title: "Peperoni",
    image:"https://www.noriupicos.lt/wp-content/uploads/2021/10/09adca10-8ccc-4518-b490-f2cb84af72a1-1-700x465.png",
    price: 8.99,
    ingredients: ["Tomato sauce", "Olive oil", "Pesto", "Sliced ham"],
    spiceLevel:1
  },
  {
    id: "p3",
    title: "Neapoli",
    image: "https://www.noriupicos.lt/wp-content/uploads/2021/10/09adca10-8ccc-4518-b490-f2cb84af72a1-1-700x465.png",
    price: 10.99,
    ingredients: ["Tomato sauce", "Olive oil", "Pesto", "Sliced ham"],
    spiceLevel:2
  },
  {
    id: "p4",
    title: "Mexican",
    image:"https://www.noriupicos.lt/wp-content/uploads/2021/10/09adca10-8ccc-4518-b490-f2cb84af72a1-1-700x465.png",
    price: 9.99,
    ingredients: ["Tomato sauce", "Olive oil", "Pesto", "Sliced ham", "Tomato sauce", "Tomato sauce","Tomato sauce"],
    spiceLevel:3
  },
];
const PopularPizzas = () => {
  return (
    <section className={classes.pizza}>
      <h1 className={classes.text}>Our Most Popular Choices</h1>
      <ul className={classes.list}>
          {DUMMY_PIZZAS.map((pizza)=>{
           return <PizzaItem
            id={pizza.id}
            key={pizza.id}
            title={pizza.title}
            ingredients={pizza.ingredients}
            image={pizza.image}
            price={pizza.price}
            />
          })}
          </ul>
    </section>
  );
};

export default PopularPizzas;
