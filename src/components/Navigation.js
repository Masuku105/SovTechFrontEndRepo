import React, {Component} from 'react';
import {Navbar, Nav,NavDropdown,Form,FormControl,Button} from 'react-bootstrap';
import { SearchResults } from './Search/SeacrhReasults';
import axios from 'axios';
import Logo from '../images/sovTechLogo.png';


export class Navigation extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            setModalShow: false,
            stars:{
                "count":"",
                "next":"",
                "previous":"",
                "results":[]
            },
            jokes:{
                "total":"",
                "result":[]
            },
            headers: {
                'Accept':'application/json',
                "Content-Type": "application/json",              
                "mode":"cors",
                "Access-Control-Allow-Headers":"Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"           
            }
        }; 
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getPeople(){
        axios.get(process.env.REACT_APP_API+'search/person?query=' + this.state.value,this.state.headers)
          .then(response => {
            this.setState({stars: response.data });
          });
    }
    getJokes(){
        axios.get(process.env.REACT_APP_API+'search/jokes?query=' + this.state.value,this.state.headers)
          .then(response => {
            this.setState({jokes: response.data });
          });
    }

    handleChange=(event)=> {
        this.setState({value: event.target.value});    
    } 
   
    handleSubmit(event) {
        this.getJokes();
        this.getPeople();
        this.setState({setModalShow:true});       
        
    }
    render(){
        const {value,setModalShow,jokes,stars} = this.state;  
        return (            
            <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/"><img src={Logo} alt="Logo"/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>                
                <NavDropdown title="Menu" id="basic-nav-dropdown">
                <NavDropdown.Item href="/components/Chuck">Chuck Norris</NavDropdown.Item>
                <NavDropdown.Item href="/components/Swapi">Star War people</NavDropdown.Item>              
                </NavDropdown>
            </Nav>
            <Form inline>
                <FormControl type="text" value={this.state.value} onChange={this.handleChange} placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-primary" onClick={this.handleSubmit}>Search</Button>
            </Form>
            <SearchResults
                        show={setModalShow}
                        onHide={() => this.setState({setModalShow:false})}
                        searchvalue ={value}
                        jokes = {jokes}
                        stars = {stars}
            />
            </Navbar.Collapse>
            </Navbar>         
        )
    }
}