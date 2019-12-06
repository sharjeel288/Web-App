import React,{Component} from 'react'
import Aux from '../../Hoc/Auxilary'
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'
import Model from '../../Components/UI/Models/Model'
import OrderSummery from '../../Components/Burger/OrderSummery/OrderSummery'
import axios from '../../axios-order'
import Spinner from '../../Components/UI/Spinner/Spinner'
import WithErrorHandler from '../../Hoc/withErroHandler/withErrorHandler'


const INGREDIENT_PRICES={
    salad:50,
    meat:250,
    bacon:100,
    cheese:250
}

class BurgerBuilder extends Component{

    state={
        ingredients:false,
        initialPrice:50,
        purchaseable:false,
        purchasing:false,
        loading:false,
        error:false
    }
    purchaseableSetter=(ingredients)=>{
        const sum=Object.keys(ingredients)
        .map(igKeys=>{
            return ingredients[igKeys]
        }).reduce((sum,el)=>{
            return sum + el
        },0)
        this.setState({purchaseable:sum > 0});
    }
    componentDidMount(){
        axios.get("https://burger-builder-react-d12cb.firebaseio.com/Ingredients.json").then(response=>{
            this.setState({ingredients:response.data})
        }).catch(error=>{
            this.setState({error:true})
        });
    }
    addIngredients=(type)=>{
        const updatedCount=this.state.ingredients[type] + 1;
        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        const oldPrice=this.state.initialPrice;
        const newPrice=INGREDIENT_PRICES[type] + oldPrice;
        this.setState({initialPrice:newPrice,ingredients:updatedIngredients});
        this.purchaseableSetter(updatedIngredients);
    }

    removeIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount=this.state.ingredients[type] - 1;
        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        const oldPrice=this.state.initialPrice;
        const newPrice= oldPrice -INGREDIENT_PRICES[type];
        this.setState({initialPrice:newPrice,ingredients:updatedIngredients});
        this.purchaseableSetter(updatedIngredients);
    }
    purchaseHandler=()=>{
        this.setState({purchasing:true})
    }
    purchaseCanceledHandler=()=>{
        this.setState({purchasing:false})
    }
    purchaseContinueHandler=()=>{
        this.setState({loading:true})
        const order={
            Ingredients:this.state.ingredients,
            Price:this.state.initialPrice,
            Customer:{
                name:'Maz Schawrzmuller',
                email:'torasx3600@gmail.com',
                phoneNo:'03318082007',
                address:{
                    street:'TestStreet21',
                    zipCode:'2324',
                    country:'Pakistan'
                }
            }
        }
        axios.post('/orders.json',order).then(response=>{
            this.setState({loading:false,purchasing:false})
        }).catch(error=>{
            this.setState({loading:false,purchasing:false})
        })
    }
    render(){
        const disableInfo={
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
              
            disableInfo[key]=disableInfo[key] <= 0;
        }
        let burger= this.state.error ? <p style={{textAlign:"center"}}>Ingredients Can't Be Loaded</p>:<Spinner/>
        let ordersummery=null;

        if (this.state.ingredients) {
            burger=(
            <Aux>
               (<Burger ingredients={this.state.ingredients}/>
                 <BuildControls
                 ingredientAdded={this.addIngredients}
                 ingredientRemoved={this.removeIngredientHandler}
                 disable={disableInfo}
                 price={this.state.initialPrice}
                 purchaseable={this.state.purchaseable}
                 orderd={this.purchaseHandler}
                 />)
            </Aux>
            );

              ordersummery= <OrderSummery 
              ingredients={this.state.ingredients}
              purchaseCancel={this.purchaseCanceledHandler}
              purchaseContinue={this.purchaseContinueHandler}   
              price={this.state.initialPrice}           
              >
              </OrderSummery>  
        }
        if(this.state.loading){
            ordersummery=<Spinner/>;
        }

        return(
            <Aux>
                <Model show={this.state.purchasing}>
                   {ordersummery}
                </Model>
                {burger}
            </Aux>
        );
    }
}
export default WithErrorHandler(BurgerBuilder,axios);