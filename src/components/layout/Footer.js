import classes from './Footer.module.css'
import logo from '../../assets/PizzaLogo.svg'
import { Link } from 'react-router-dom'
import Pizzas from '../../pages/AllPizzas'
import facebookLogo from '../../assets/Facebook.svg'
import instagramLogo from '../../assets/Instagram.svg'
import visaLogo from '../../assets/Visa.svg'
import mastercardLogo from '../../assets/Mastercard.svg'



const Footer=()=>{
    return(
        <footer className={classes.footer}>
            <div className={classes.up}>
                <h3>Pizza App</h3>
                <img className={classes.logo} src={logo} alt='Pizza App Logo'/>
            </div>
            <div className={classes.seperator}/>
            <div className={classes.down}>
            <div className={classes.about}>
                <h4>Pizza App</h4>
                <div className={classes.pizza}>
                <Link to='/about-us'>
                    About Us
                </Link>
                <Link to='/pizzas'>
                    Pizzas
                </Link>
                <Link to='/'>
                    Restaurants
                </Link>
                </div>
            </div>
            <div>
                <h4>CONTACT US</h4>
                <div> 
                <a href="mailto:1111@example.com">info@pizzaapp.com</a>
                <p><a href="tel:1234">1234</a></p>
                </div>
            </div>
            <div>
                <h4>FOLLOW</h4>
                <div className={classes.social}>
                    <div className={classes.facebook}>
                    <a href="https://www.facebook.com/" target="_blank" rel="nofollow noreferrer">
                        <img src={facebookLogo} alt="Facebook site of Pizza's App"/>
                        </a>   
                    </div>
                    <div className={classes.instagram}>
                    <a href="https://www.instagram.com/" target="_blank" rel="nofollow noreferrer">
                        <img src={instagramLogo} alt="Instagram site of Pizza's App"/>
                        </a>   
                    </div>
                </div>
            </div>
            <div>
                <h4>SUPPORTED PAYMENTS</h4>
                <div className={classes.payments}>
                    <div className={classes.visa}>
                <a href="https://usa.visa.com/pay-with-visa/find-card/" target="_blank" rel="nofollow noreferrer">
                    <img src={visaLogo} alt="Visa payment choice"/>
                    </a>
                    </div>
                    <div>
                    <a href="https://www.mastercard.com/" target="_blank" rel="nofollow noreferrer">
                    <img className={classes.master} src={mastercardLogo} alt="Mastercard payment choice"/>
                    </a>
                    </div>
                </div>
            </div>
            </div>

        </footer>

    )
}

export default Footer