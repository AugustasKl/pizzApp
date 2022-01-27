import PizzaList from "../components/pizzas/PizzaList";
import { fetchAllData, getAllPizzas } from "../lib/api";
import useHttp from "../customHook/httpHook";
import { useEffect } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoPizzaFound from "../components/pizzas/NoPizzaFound";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const Pizzas = (props) => {
  const dispatch=useDispatch()
  const pizzaData=useSelector((state)=>state.api.items)
  // const{sendRequest, status, data:pizzasData, error}=useHttp(getAllPizzas, true)
  // const data=[...pizzaData]
  console.log(pizzaData)

  useEffect(()=>{
    dispatch(fetchAllData())
  },[dispatch])
  // useEffect(() => {
  //   sendRequest();
  // }, [sendRequest]);

  // if (status === 'pending') {
  //   return (
  //     <div className='centered'>
  //       <LoadingSpinner />
  //     </div>
  //   );
  // }

  // if(error){
  //   return <p>{error}</p>
  // }

  // if(status==='completed' && (!pizzasData || pizzasData.length===0)){
  //   return <NoPizzaFound/>
  // }
  // // props.loadedPizzas(pizzasData)
  return( 
  <PizzaList pizzas={pizzaData} />
  )
};

export default Pizzas;

// const DUMMY_PIZZAS = [
//   {
//     id: "p1",
//     title: "Margarita",
//     image:
//       "https://www.noriupicos.lt/wp-content/uploads/2021/10/09adca10-8ccc-4518-b490-f2cb84af72a1-1-700x465.png",
//     price: 9.99,
//     ingredients: ["Tomato sauce", "Olive oil", "Pesto", "Sliced ham"],
//     spiceLevel: 0,
//   },
//   {
//     id: "p2",
//     title: "Peperoni",
//     image:
//       "https://www.noriupicos.lt/wp-content/uploads/2021/10/09adca10-8ccc-4518-b490-f2cb84af72a1-1-700x465.png",
//     price: 8.99,
//     ingredients: ["Tomato sauce", "Olive oil", "Pesto", "Sliced ham"],
//     spiceLevel: 1,
//   },
//   {
//     id: "p3",
//     title: "Neapoli",
//     image:
//       "https://www.noriupicos.lt/wp-content/uploads/2021/10/09adca10-8ccc-4518-b490-f2cb84af72a1-1-700x465.png",
//     price: 10.99,
//     ingredients: ["Tomato sauce", "Olive oil", "Pesto", "Sliced ham"],
//     spiceLevel: 2,
//   },
//   {
//     id: "p4",
//     title: "Mexican",
//     image:
//       "https://www.noriupicos.lt/wp-content/uploads/2021/10/09adca10-8ccc-4518-b490-f2cb84af72a1-1-700x465.png",
//     price: 9.99,
//     ingredients: [
//       "Tomato sauce",
//       "Olive oil",
//       "Pesto",
//       "Sliced ham",
//       "Tomato sauce",
//       "Tomato sauce",
//       "Tomato sauce",
//     ],
//     spiceLevel: 3,
//   },
//   {
//     id: "p5",
//     title: "Mexican",
//     image:
//       "https://www.noriupicos.lt/wp-content/uploads/2021/10/09adca10-8ccc-4518-b490-f2cb84af72a1-1-700x465.png",
//     price: 9.99,
//     ingredients: [
//       "Tomato sauce",
//       "Olive oil",
//       "Pesto",
//       "Sliced ham",
//       "Tomato sauce",
//       "Tomato sauce",
//       "Tomato sauce",
//     ],
//     spiceLevel: 3,
//   },
//   {
//     id: "p6",
//     title: "Mexican",
//     image:
//       "https://www.noriupicos.lt/wp-content/uploads/2021/10/09adca10-8ccc-4518-b490-f2cb84af72a1-1-700x465.png",
//     price: 9.99,
//     ingredients: [
//       "Tomato sauce",
//       "Olive oil",
//       "Pesto",
//       "Sliced ham",
//       "Tomato sauce",
//       "Tomato sauce",
//       "Tomato sauce",
//     ],
//     spiceLevel: 3,
//   },
//   {
//     id: "p7",
//     title: "Mexican",
//     image:
//       "https://www.noriupicos.lt/wp-content/uploads/2021/10/09adca10-8ccc-4518-b490-f2cb84af72a1-1-700x465.png",
//     price: 9.99,
//     ingredients: [
//       "Tomato sauce",
//       "Olive oil",
//       "Pesto",
//       "Sliced ham",
//       "Tomato sauce",
//       "Tomato sauce",
//       "Tomato sauce",
//     ],
//     spiceLevel: 3,
//   },
//   {
//     id: "p8",
//     title: "Mexican",
//     image:
//       "https://www.noriupicos.lt/wp-content/uploads/2021/10/09adca10-8ccc-4518-b490-f2cb84af72a1-1-700x465.png",
//     price: 9.99,
//     ingredients: [
//       "Tomato sauce",
//       "Olive oil",
//       "Pesto",
//       "Sliced ham",
//       "Tomato sauce",
//       "Tomato sauce",
//       "Tomato sauce",
//     ],
//     spiceLevel: 3,
//   },
//   {
//     id: "p9",
//     title: "Mexican",
//     image:
//       "https://www.noriupicos.lt/wp-content/uploads/2021/10/09adca10-8ccc-4518-b490-f2cb84af72a1-1-700x465.png",
//     price: 9.99,
//     ingredients: [
//       "Tomato sauce",
//       "Olive oil",
//       "Pesto",
//       "Sliced ham",
//       "Tomato sauce",
//       "Tomato sauce",
//       "Tomato sauce",
//     ],
//     spiceLevel: 3,
//   },
//   {
//     id: "p10",
//     title: "Mexican",
//     image:
//       "https://www.noriupicos.lt/wp-content/uploads/2021/10/09adca10-8ccc-4518-b490-f2cb84af72a1-1-700x465.png",
//     price: 9.99,
//     ingredients: [
//       "Tomato sauce",
//       "Olive oil",
//       "Pesto",
//       "Sliced ham",
//       "Tomato sauce",
//       "Tomato sauce",
//       "Tomato sauce",
//     ],
//     spiceLevel: 3,
//   },
//   {
//     id: "p11",
//     title: "Mexican",
//     image:
//       "https://www.noriupicos.lt/wp-content/uploads/2021/10/09adca10-8ccc-4518-b490-f2cb84af72a1-1-700x465.png",
//     price: 9.99,
//     ingredients: [
//       "Tomato sauce",
//       "Olive oil",
//       "Pesto",
//       "Sliced ham",
//       "Tomato sauce",
//       "Tomato sauce",
//       "Tomato sauce",
//     ],
//     spiceLevel: 3,
//   },
// ];