import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PizzaId from "../components/pizzas/PizzaId";
import { getDetailedPizza } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const PizzaDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const status = useSelector((state) => state.ui.status);
  const pizzaDetailedData = useSelector((state) => state.api.pizzaId);

  //fetch data of specific pizza's id
  useEffect(() => {
    dispatch(getDetailedPizza(params.pizzaId));
  }, [dispatch]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "error") {
    return <p>Unable to fetch data from server</p>;
  }
  if (!pizzaDetailedData.title) {
    return (
      <p class="centered" style={{ color: "yellow" }}>
        No such pizza was found
      </p>
    );
  }

  return (
    <React.Fragment>
      <PizzaId
        title={pizzaDetailedData.title}
        ingredients={pizzaDetailedData.ingredients}
        image={pizzaDetailedData.image}
        price={pizzaDetailedData.price}
        hot={pizzaDetailedData.hot}
      />
    </React.Fragment>
  );
};

export default PizzaDetail;
