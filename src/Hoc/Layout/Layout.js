import React,{Component} from 'react'
import Aux from '../Auxilary'
import classes from './Layout.css'
import ToolBar from '../../Components/Navigation/ToolBar/toolBar'
import SideDrawer from '../../Components/Navigation/SideDrawer/SiderDrawer'

class Layout extends Component{

    state={
        showSideDrawer:false
    }

    openSideDrawerHandler=()=>{
        this.setState({showSideDrawer:true});
    }

    toggleSideDrawer=()=>{
        this.setState((prevState)=>{
            return {showSideDrawer:!prevState.showSideDrawer}
        })
    }

    render(){
        return(
        <Aux>
            <ToolBar  
            closed={this.toggleSideDrawer}
            />
            <SideDrawer 
            closed={this.openSideDrawerHandler}
            open={this.state.showSideDrawer}/>
            <main className={classes.content}>
                {this.props.children}
            </main>
        </Aux>
        );
    }
}

export default Layout