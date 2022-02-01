import classes from "./Home.module.css";
import background from "../../assets/homePagePizza.jpg";
import PopularPizzas from "../pizzas/PopulaPizzas";
import React from "react";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const buttonVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 1.5,
    },
  },
};

const Home = () => {
  return (
    <React.Fragment>
      <section className={classes.section}>
        <div className={classes.text}>
          <h2>It's not just Food, it's an Experience</h2>
          <motion.button 
          variants={buttonVariants}
          initial='hidden'
          animate='visible'>
            <Link className={classes.view} to="pizzas">
              {" "}
              View Pizzas
            </Link>
          </motion.button>
        </div>
        <div className={classes["main-image"]}>
          <img src={background} alt="Home page pizza picture" />
        </div>
      </section>
      <PopularPizzas />
      <Footer />
    </React.Fragment>
  );
};

export default Home;
