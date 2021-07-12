import React, {Component} from 'react';
import { GetJokeModal } from '../Chuck/GetJokeModal';
import {Button, Row, Form,Col,ButtonToolbar,Spinner} from 'react-bootstrap';
import axios from 'axios';


export class Chuck extends Component{
    constructor(props){
        super(props);
        this.state={
            cats:[],
            modalShow:false, 
            setModalShow:false,
            value:"",
            joke:{},
            loading:false            
        };       
    }

    categoryList(){
        const headers = {
            'Accept':'application/json',
            "Content-Type": "application/json",              
            "mode":"cors",
            "Access-Control-Allow-Headers":"Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"           
             };
        axios.get(process.env.REACT_APP_API+'chuck/categories',{headers})
        .then(response => {
            this.setState({ cats: response.data });
          });
    }
    getRandomJoke=(category)=>{
        const headers = {
            'Accept':'application/json',
            "Content-Type": "application/json",              
            "mode":"cors",
            "Access-Control-Allow-Headers":"Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"           
             };
        axios.get(process.env.REACT_APP_API+'chuck/random-category-joke?category='
        +this.state.value,{headers})
        .then(response => {
            this.setState({loading:true});
            this.setState({ joke: response.data });
        });
    }
    
    componentDidMount(){
        this.categoryList();
    }
    handleChange=(event)=> {        
        this.getRandomJoke();
        this.setState({setModalShow:true})        
    }
    change=(event)=>{
        this.setState({value: event.target.value});
    }
     

    render(){  
        const {cats,value,setModalShow,joke} = this.state;       

        return (
            <div>
                <div className="mt-3">
                    <h3 className="d-flex justify-content-center">Chucknorris Jokes</h3>                        
                    <Row >
                        <Col sm={12} >                  
                            <Form >
                                <Form.Group controlId="Categories">                                    
                                    <Form.Control as="select" placeholder="Select Category..." onChange={this.change} >
                                    {cats.map(cat=>                                        
                                        <option key={cat}  >{cat}</option>)}
                                    </Form.Control>
                                </Form.Group>                                           
                            </Form>
                        </Col>
                    </Row>
                    <ButtonToolbar>
                        <Button variant="outline-primary" onClick={this.handleChange}>
                                         Random Joke
                        </Button>

                        <GetJokeModal
                            show={setModalShow}
                            onHide={() => this.setState({setModalShow:false})}
                            category ={value}
                            catJoke = {joke}
                            loading={this.state.loading}
                        />
                    </ButtonToolbar> 

                </div>

            </div>

        )
    }
}