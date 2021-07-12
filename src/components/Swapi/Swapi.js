import React, {Component, useState} from 'react';
import {Table,Button,Spinner} from 'react-bootstrap';
import axios from 'axios';

export class Swapi extends Component{
    constructor(props){
        super(props);
        this.state={stars:{
            "count":"",
            "next":"",
            "previous":"",
            "results":[]
        },
        headers: {
            'Accept':'application/json',
            "Content-Type": "application/json",              
            "mode":"cors",
            "Access-Control-Allow-Headers":"Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"           
        }, 
        loading:false        
       };
               
    }
    getPeople(){
        axios.get(process.env.REACT_APP_API+'swapi/people',this.state.headers)
          .then(response => {
            this.setState({loading:true});  
            this.setState({stars: response.data });
          });
    }
    next(){
        axios.get(this.state.stars.next,this.state.headers)
          .then(response => {
            this.setState({stars: response.data });
          });
    }
    previous(){
        axios.get(this.state.stars.previous,this.state.headers)
          .then(response => {
            this.setState({stars: response.data });
          });        
    }
    componentDidMount(){
        this.getPeople()
    }
    people(){
        const {stars}=this.state;
        return(
            <div className="table-responsive-sm" >
                <h2>Star Wars People</h2>

                <Table responsive className="mt-4 table" striped bordered hover size="sm" variant="dark">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Height</th>
                            <th>Mass</th>
                            <th>Hair Color</th>
                            <th>Skin Color</th>
                            <th>Eye Color</th>
                            <th>Birth Year</th>
                            <th>Gender</th>                        
                        </tr>
                    </thead>
                    <tbody>
                        {stars.results.map((star,index)=>
                            <tr key={index}>
                                <td>{star.name}</td>
                                <td>{star.height}</td>
                                <td>{star.mass}</td>
                                <td>{star.hair_color}</td>
                                <td>{star.skin_color}</td>
                                <td>{star.eye_color}</td>
                                <td>{star.birth_year}</td>
                                <td>{star.gender}</td>                          
                            </tr>)} 
                    </tbody>  
                </Table>
                <div className="row">
                    <div className="col-6 text-left">
                        <Button variant="outline-primary" onClick={() =>this.previous()}>
                                Previous
                        </Button>
                    </div>
                    <div className="col-6 text-right">
                        <Button variant="outline-primary" onClick={() =>this.next()}>
                                Next
                        </Button>
                    </div>
                </div>                          
                                            
            
            </div>

        )
    }
    render(){      
        
        return (
            this.state.loading ?(this.people()):(<Spinner animation="grow" />)
            
        )
    }
}