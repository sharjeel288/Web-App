import React from 'react'
import classes from './Burger.css'
import BurgerIngredients from './BurgerIngredients/BurgerIngredeints'

const Burger=(props)=>{
    let transformedIngredients=Object.keys(props.ingredients)
    .map(igkey=>{
        return [...Array(props.ingredients[igkey])].map((_,i)=>{
            return <BurgerIngredients key={igkey + i} type={igkey}/>
        })
    }).reduce((acc,crval)=>{
        return acc.concat(crval);
    },[]);
    if (transformedIngredients.length === 0) {
        transformedIngredients=<p>Please Add Some Ingredients</p>
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom"/>
        </div>
    );
}

export default Burger;