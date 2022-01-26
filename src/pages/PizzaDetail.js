import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import PizzaId from "../components/pizzas/PizzaId";
import useHttp from "../customHook/httpHook";
import { getSpecificPizza } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

// const DUMMY_PIZZAS = [
//   {
//     id: "p1",
//     title: "Mexican",
//     description:
//       "Kvietinių miltų pagrindas, pomidorų padažas, „Mozzarella“, karštai rūkyti vištienos kumpeliai, marinuoti kelmučiai, „Cherry“ pomidorai, svogūnų laiškai, BBQ padažas, augalinis aliejus su česnaku",
//     image:
//       "https://www.noriupicos.lt/wp-content/uploads/2021/10/09adca10-8ccc-4518-b490-f2cb84af72a1-1-700x465.png",
//     price: 9.99,
//   },
//   {
//     id: "p2",
//     title: "pitsza",
//     description: "pati skaniausia ptisa",
//     image:
//       "https://www.noriupicos.lt/wp-content/uploads/2021/10/09adca10-8ccc-4518-b490-f2cb84af72a1-1-700x465.png",
//     price: 8.99,
//   },
// ];

const PizzaDetail = () => {
  const params = useParams();
  const {
    sendRequest,
    status,
    data: pizzaData,
    error,
  } = useHttp(getSpecificPizza, true);

  console.log(pizzaData)

  //   console.log(DUMMY_PIZZAS);
  //   const hello = "hello";
  //   console.log(hello);
  //   console.log(params);
  //   console.log(params.pizzaId);
  //   const pizza = DUMMY_PIZZAS.find((pizza) => pizza.id === params.pizzaId);
  //   console.log(pizza);
  //   if (!pizza) {
  //     <p>no pizzas found</p>;
  //   }
  useEffect(() => {
    sendRequest(params.pizzaId);
  }, [sendRequest]);
  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (!pizzaData) {
    return <p>No such pizza was found</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <React.Fragment>
      <PizzaId
        title={pizzaData.title}
        ingredients={pizzaData.ingredients}
        image={pizzaData.image}
        price={pizzaData.price}
      />
      {/* <Route path={`/pizzas/:pizzaId`}>
                lod
            </Route> */}
    </React.Fragment>
  );
};

export default PizzaDetail;
