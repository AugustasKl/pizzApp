import classes from './Home.module.css'
import background from '../../assets/homePagePizza.jpg'
import PopularPizzas from '../pizzas/PopulaPizzas'
import React from 'react'
import Footer from '../layout/Footer'
import { Link } from 'react-router-dom'
const Home=()=>{

    return(
        <React.Fragment>
        <section className={classes.section}  >
        
            <div className={classes.text}>
                <h2>It's not just Food, it's an Experience</h2>
                <button>
                    <Link className={classes.view} to='pizzas'> View Pizzas</Link>
                </button>
            </div>
            <div className={classes['main-image']}>
            <img src={background} alt='Home page pizza picture'/>

            </div>
        </section>
        <PopularPizzas/>
        <Footer/>
        </React.Fragment>
    )
}

export default Home