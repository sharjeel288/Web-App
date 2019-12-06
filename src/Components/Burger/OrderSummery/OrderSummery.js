import React from 'react'
import Aux from '../../../Hoc/Auxilary'
import Button from '../../UI/Button/Button'

const orderSummery=(props)=>{
    const ingredients=Object.keys(props.ingredients)
    .map(igkeys=>{
        return ( 
        <li key={igkeys}>
            <span style={{textTransform:'capitalize'}}>{igkeys}</span>:            
             {props.ingredients[igkeys]}
        </li>
);
       
    })
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A Delicious burger with the following ingredients:</p>
            <ul>
                {ingredients}
            </ul>
            <strong>Total Price:{props.price}</strong>
            <p>Continue To CheckOut ?</p>
            <Button btnType="Danger" clicked={props.purchaseCancel}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
        </Aux>
        
    );
}
export default orderSummery