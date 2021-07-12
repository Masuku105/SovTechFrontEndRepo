import React, {Component} from 'react';
import {Button,Form,FormControl} from 'react-bootstrap';
import { SearchResults } from './SeacrhReasults'; 
import axios from 'axios';

export class SearchBar extends Component {
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
        alert('A name was submitted: ' + this.state.value);
        
      }
    
      render() {
        const {value,setModalShow,jokes,stars} = this.state;  
        return (
            <div className="container float-right" inline>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
                </Form>
                
                <SearchResults
                                show={setModalShow}
                                onHide={() => this.setState({setModalShow:false})}
                                searchvalue ={value}
                                jokes = {jokes}
                                stars = {stars}
                />
            </div>

       
        );
      }
    
}    