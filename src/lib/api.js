import Pizzas from "../pages/AllPizzas";
import { apiActions } from "../redux/api-slice";
import { uiActions } from "../redux/ui-slice";

const FIREBASE_DOMAIN =
  "https://reactproject-e302f-default-rtdb.europe-west1.firebasedatabase.app";

// export async function getAllPizzas() {
//   const response = await fetch(`${FIREBASE_DOMAIN}/pizzas.json`);
//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || "Could not fetch pizzas.");
//   }

//   const transformedPizzas = [];

//   for (const key in data) {
//     const pizzaObj = {
//       id: key,
//       ...data[key],
//     };

//     transformedPizzas.push(pizzaObj);
//   }

//   return transformedPizzas;
// }
// export async function getAllDrinks() {
//   const response = await fetch(`${FIREBASE_DOMAIN}/drinks.json`);
//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || "Could not fetch drinks.");
//   }

//   const transformedDrinks = [];

//   for (const key in data) {
//     const DrinksObj = {
//       id: key,
//       ...data[key],
//     };

//     transformedDrinks.push(DrinksObj);
//   }

//   return transformedDrinks;
// }

// export async function getSpecificPizza(pizzaId) {
//   const response = await fetch(`${FIREBASE_DOMAIN}/pizzas/${pizzaId}.json`);
//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || "Could not fetch pizza.");
//   }

//   const loadedQuote = {
//     id: pizzaId,
//     ...data,
//   };

//   return loadedQuote;
// }

export const getDetailedPizza = (pizzaId) => {
  return async (dispatch) => {
    dispatch(
      uiActions.pendingNotification({
        status: "pending",
      })
    );
    const fetchPizza = async () => {
      const response = await fetch(`${FIREBASE_DOMAIN}/pizzas/${pizzaId}.json`);
      if (!response.ok) {
        throw new Error("Could not fetch pizza");
      }
      const data = await response.json();
      console.log(data);
      const laodedPizza = {
        id: pizzaId,
        ...data,
      };
      return laodedPizza;
    };
    try {
      const pizzaData = await fetchPizza();
      dispatch(
        uiActions.successNotification({
          status: "success",
        })
      );
      dispatch(
        apiActions.loadPizzaId({
          pizzaId: pizzaData,
        })
      );
    } catch (err) {
      dispatch(
        uiActions.errorNotification({
          status: "error",
        })
      );
    }
  };
};

export const fetchAllData = (requestedData) => {
  return async (dispatch) => {
    dispatch(
      uiActions.pendingNotification({
        status: "pending",
      })
    );
    const fetchData = async () => {
      const response = await fetch(`${FIREBASE_DOMAIN}/${requestedData}.json`);
      if (!response.ok) {
        throw new Error("Could not fetch requested data");
      }
      const data = await response.json();
      // console.log(data);
      const transformedData = [];
      for (const key in data) {
        const dataObj = {
          id: key,
          ...data[key],
        };
        transformedData.push(dataObj);
      }
      // console.log(transformedData)
      return transformedData;
    };
    try {
      const loadedData = await fetchData();
      // console.log(loadedData)
      if (requestedData === "pizzas") {
        dispatch(
          apiActions.loadItems({
            items: loadedData,
          })
        );
      } else {
        dispatch(
          apiActions.loadDrinks({
            drinks: loadedData,
          })
        );
      }
      dispatch(
        uiActions.successNotification({
          status: "success",
        })
      );
    } catch (err) {
      // alert(err.message);
      dispatch(
        uiActions.errorNotification({
          status: "error",
        })
      );
    }
  };
};

// export const fetchAllDrinks = () => {
//   return async (dispatch) => {
//     const fetchData = async () => {
//       const response = await fetch(`${FIREBASE_DOMAIN}/drinks.json`);
//       if (!response.ok) {
//         throw new Error("Could not fetch requested data");
//       }
//       const data = await response.json();
//       // console.log(data);
//       const transformedData = [];
//       for (const key in data) {
//         const dataObj = {
//           id: key,
//           ...data[key],
//         };
//         transformedData.push(dataObj);
//       }
//       // console.log(transformedData)
//       return transformedData;
//     };
//     try {
//       const loadedData = await fetchData();
//       // console.log(loadedData)
//       dispatch(
//         apiActions.loadDrinks({
//           drinks: loadedData,
//         })
//       );
//     } catch (err) {
//       alert(err.message);
//     }
//   };
// };
