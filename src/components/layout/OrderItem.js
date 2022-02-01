import classes from './OrderItem.module.css'

const OrderItem=(props)=>{
    const{title, price, quantity}=props.item
    const totalprice=`${price.toFixed(2)}`
    return(
        <li className={classes.data}>
            <div className={classes.info}>
                <span>{title}</span>
            <div className={classes.quantity}>
          <span>x {quantity}</span>
        </div>
        <div className={classes.price}>{totalprice} €</div>
            </div>
        </li>
    )
}

export default OrderItem