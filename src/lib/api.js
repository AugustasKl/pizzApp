import Pizzas from "../pages/AllPizzas";
import { apiActions } from "../redux/api-slice";

const FIREBASE_DOMAIN =
  "https://reactproject-e302f-default-rtdb.europe-west1.firebasedatabase.app";

export async function getAllPizzas() {
  const response = await fetch(`${FIREBASE_DOMAIN}/pizzas.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch pizzas.");
  }

  const transformedPizzas = [];

  for (const key in data) {
    const pizzaObj = {
      id: key,
      ...data[key],
    };

    transformedPizzas.push(pizzaObj);
  }

  return transformedPizzas;
}
export async function getAllDrinks() {
  const response = await fetch(`${FIREBASE_DOMAIN}/drinks.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch drinks.");
  }

  const transformedDrinks = [];

  for (const key in data) {
    const DrinksObj = {
      id: key,
      ...data[key],
    };

    transformedDrinks.push(DrinksObj);
  }

  return transformedDrinks;
}

export async function getSpecificPizza(pizzaId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/pizzas/${pizzaId}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch pizza.");
  }

  const loadedQuote = {
    id: pizzaId,
    ...data,
  };

  return loadedQuote;
}

export const fetchAllData = () => {
 
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${FIREBASE_DOMAIN}/pizzas.json`);
      if (!response.ok) {
        throw new Error("Could not fetch requested data");
      }
      const data = await response.json();
      // console.log(data);
      const transformedData=[]
      for(const key in data){
        const dataObj={
          id:key,
          ...data[key]
        }
        transformedData.push(dataObj)
      }
      // console.log(transformedData)
      return transformedData;
     
    };
    try {
      const loadedData = await fetchData();
      // console.log(loadedData)
      dispatch(
        apiActions.loadItems({
          items:loadedData
        })
      )
    } catch (err) {
      alert(err.message);
    }
  };
};

export const fetchAllDrinks = () => {
 
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${FIREBASE_DOMAIN}/drinks.json`);
      if (!response.ok) {
        throw new Error("Could not fetch requested data");
      }
      const data = await response.json();
      // console.log(data);
      const transformedData=[]
      for(const key in data){
        const dataObj={
          id:key,
          ...data[key]
        }
        transformedData.push(dataObj)
      }
      // console.log(transformedData)
      return transformedData;
     
    };
    try {
      const loadedData = await fetchData();
      // console.log(loadedData)
      dispatch(
        apiActions.loadDrinks({
          drinks:loadedData
        })
      )
    } catch (err) {
      alert(err.message);
    }
  };
};