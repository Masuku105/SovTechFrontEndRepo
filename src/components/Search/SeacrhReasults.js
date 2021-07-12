import React, {Component} from 'react';
import {Modal,Table,Button} from 'react-bootstrap';


export class SearchResults extends Component{
    constructor(props){
        super(props);
        this.state={loading:false}                
    }
    myResults(){
        const stars = this.props.stars;
        const jokes = this.props.jokes;            
        if(jokes.total>0 || stars.count>0){
            return([
                this.starsResults(),
                this.jokesReults()
            ])
        }
        else{
            return(
                <p>No Results Found!</p>
            )
        }
    }
    
    starsResults(){
        const stars = this.props.stars;
        if(stars.count>0){
            return(
                <div className="table-responsive">
                    <h4 className="d-flex justify-content-center">Results from Star Wars People API</h4>

                    <Table responsive variant="dark" className="mt-4" striped bordered hover size="sm">
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
                </div>
            )
        }
    }

    jokesReults(){
        const jokes = this.props.jokes;
        if(jokes.total>0){
            return(
                <div>
                    <h4 className="d-flex reverse justify-content-center">Results from Chuck Norris API</h4>

                    <Table responsive variant="dark" className="mt-4" striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Date Created</th>
                                    <th>Date Updated</th>
                                    <th>Joke</th>                                                           
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.jokes.result.map((joke,index)=>
                                    <tr key={index}>
                                        <td>{joke.categories}</td>
                                        <td>{joke.created_At}</td>
                                        <td>{joke.updated_At}</td>
                                        <td>{joke.value}</td>                                                                
                                    </tr>)} 
                            </tbody>  
                    </Table>
                </div>
            )
        }

    }

    render(){
        
        return (
          
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                  <h3 className="d-flex justify-content-left">Search Results</h3>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="container">
               {this.myResults()}       
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        )
    }
}