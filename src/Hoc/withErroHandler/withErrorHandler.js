import React,{Component} from 'react'
import Model from '../../Components/UI/Models/Model'
import Aux from '../Auxilary'
const withErrorHandler=((WrappedComponent,axios)=>{
    return class extends Component{
        state={
            error:null
        }

        componentWillMount(){
            this.reqInterceptors=axios.interceptors.request.use(req=>{
                this.setState({error:null})
                return req;
            })
            this.resInterceptors=axios.interceptors.response.use(res=>res,error=>{
                this.setState({error:error})
            });
        }
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
            
        }
        errorConfirmedHandler=()=>{
            this.setState({error:null})
        }

        render() {
            return (
              <Aux>
                <Model 
                show={this.state.error}
                clicked={this.errorConfirmedHandler}
                >
                    SomeThing Went Wrong !
                    {this.state.error ? this.state.error.message:null}
                </Model>
                <WrappedComponent {...this.props}/>
              </Aux>    
            );
        }
    }
});
export default withErrorHandler;