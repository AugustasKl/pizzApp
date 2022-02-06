import { apiActions } from "../redux/api-slice";
import { uiActions } from "../redux/ui-slice";

const FIREBASE_DOMAIN =
  "https://reactproject-e302f-default-rtdb.europe-west1.firebasedatabase.app";


// fetch pizza with specific Id
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
        alert(err.message);
      dispatch(
        uiActions.errorNotification({
          status: "error",
        })
      );
    }
  };
};

// fetch data based on requestedData(pizzas or drinks)
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
      const transformedData = [];
      for (const key in data) {
        const dataObj = {
          id: key,
          ...data[key],
        };
        transformedData.push(dataObj);
      }
      return transformedData;
    };
    try {
      const loadedData = await fetchData();
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
      alert(err.message);
      dispatch(
        uiActions.errorNotification({
          status: "error",
        })
      );
    }
  };
};
