import React, {Component} from 'react'
import classes from './Models.css'
import Aux from '../../../Hoc/Auxilary'
import BackDrop from '../Backdrop/backDrop'
class Models extends Component{
    shouldComponentUpdate(nextprops,prevprops){
        return nextprops.show !== this.props.show || nextprops.children!==this.props.children;
    }
    componentDidUpdate(){
        console.log("[Model]Updates");
    }
    render() {
        return (
            <Aux>
            <BackDrop show={this.props.show} />   
            <div
                className={classes.Modal}
                style={{
                    transform:this.props.show ? 'translateY(0)':'translateY(-100vh)',
                    opacity: this.props.show ? '1':'0'
                }}
                onClick={this.props.clicked}
                >
                {this.props.children}
            </div> 
           </Aux>  
        );
    }
}
export default Models