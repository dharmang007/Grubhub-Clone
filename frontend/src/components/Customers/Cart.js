import React, { Component } from 'react'

export default class Cart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            restId : this.props.restId,
            currentPage:0,
            cart:[]
        }

    }
    componentDidMount(){
        if(localStorage.userId){
            
        }
    }
    getCartItems(){

    }
    
    render() {

        const { currentPage } = this.state;
        let cart = [...this.state.cart];
        cart = cart.map((i) =>{
            return(  
                <div id="itemDetials">
                <CardTitle>{i.itemName}</CardTitle>
                <CardSubtitle></CardSubtitle>
                <CardText></CardText>
                <CardText>Price : {i.price}</CardText>
                <ButtonGroup>
                    <Button color='danger'>Left</Button>
                    <p></p>
                    <Button color="success">Right</Button>
                </ButtonGroup>
            </div>
            )
        });

        return (
            <div>
                <h3>Your Cart</h3>
                <div id = "cartItems">
                    
                </div>
                
                <div id="totalCost">
                    <Card body outline color="primary">
                    <CardTitle>{this.state.totalCost}</CardTitle>
                    </Card>
                </div>    
            </div>
        )
    }
}
