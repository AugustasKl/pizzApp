import { useRef } from "react";
import Input from "../UI/Input";
import classes from "./AddItemForm.module.css";

const AddItemForm = (props) => {
  const amountInputRef=useRef()

  const submitHandler=(event)=>{
    event.preventDefault()
    const enteredAmount=amountInputRef.current.value;
    const numberEnteredAmount= +enteredAmount
    props.onAddToCart(numberEnteredAmount)
  }
 
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "20",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default AddItemForm;
