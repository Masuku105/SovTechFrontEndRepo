import React,{Component} from 'react';
import {Modal,Button,Spinner} from 'react-bootstrap';


export class GetJokeModal extends Component{
    constructor(props){
        super(props); 
                           
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
                    <h3>Random Joke</h3>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="d-flex justify-content-center">
                  <img src={process.env.PUBLIC_URL + "/assets/chuck-norris.jpg"} alt="Image" width="192" />
                </div>
                <div className="d-flex justify-content-center">
                 {this.props.loading ?(<p style={{fontWeight:'bold'}}>{this.props.catJoke.value}</p>):(<Spinner animation="grow" />)}
                  
                </div>
                
                
                
              </Modal.Body>
              <Modal.Footer>
                <Button variant="outline-primary" onClick={this.props.onHide}>Close</Button>
              </Modal.Footer>
            </Modal>
          )
    }

}