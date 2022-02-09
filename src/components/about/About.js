import classes from './About.module.css'
import pizzaRestaurant from '../../assets/pizzaRestaurant.jpg'
import React, {useEffect} from 'react'
import {motion} from 'framer-motion'
import Footer from '../layout/Footer'

//Framer motion animations
const containerVariants = {
    hidden: {
      opacity: 0,
      translateX: -100,
    },
    visible: {
      opacity: 1,
      translateX: 0,
  
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };
  const textVariants = {
    hidden: {
      opacity: 0,
      translateX: 100,
    },
    visible: {
      opacity: 1,
      translateX: 0,
  
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };


const About =()=>{
  //show top of the page when the page renders
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
      
    return(
        <React.Fragment>
       <motion.section className={classes.about} variants={containerVariants}
       initial="hidden"
       animate="visible">
           <img src={pizzaRestaurant} alt='cover page- pizza restaurant'/>
           <motion.div className={classes.text} variants={textVariants} initial="hidden" animate="visible">
           <h2>About Us</h2>
            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
            </motion.div>
       </motion.section>
       <Footer/>
       </React.Fragment>
    )
}

export default About