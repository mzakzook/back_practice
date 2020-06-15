import React, { Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import Patients from "./Patients"
import NewPatient from "./NewPatient"


class App extends React.Component {
  
  state = {
    patients: [],
    show: false
  };




  fetchPatients = () => {
    fetch(`http://localhost:3001/patients`)
      .then(res => res.json())
      .then(patients => {
        this.setState({
          patients
          
        })
        
      })
  }

  deletePatient = (id) => {
    fetch(`http://localhost:3001/patients/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json'
      }
    })
      .then(res => {
        let newPatients = this.state.patients.filter(x => x.id !== id);
        this.setState({
          patients: newPatients
        })
      })
  }




  componentDidMount() {
    this.fetchPatients()
  }

  saveNew = (e, patient) => {
    e.preventDefault()
    
        fetch('http://localhost:3001/patients', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify(
                patient
            )
        })
            .then(res => res.json())
            .then(data => {
                if (data.id) {
                  this.setState({
                      show: false
                  })
                  this.addPatient(data)
                } else {
                  let errors = []
                  for (let key in data) {
                    errors.push(`${key}: ${data[key]}`)
                  }
                  alert(errors) 
                
                }
                
            })
   
}

addPatient = (patient) => {
  const newArr = [...this.state.patients, patient]
  this.setState({
    patients: newArr
  })
  this.props.history.push('/patients')
}

updatePatient = (patient) => {
  let newArr = [...this.state.patients.filter(x => x.id !== patient.id), patient]
  this.setState({
    patients: newArr
  })
}

onClose = () => {
  this.setState({
      show: false
  })
}




render() {

  const { patients } = this.state

  return (
    <Fragment>
      



      <Switch>
      <Route
        path="/patients"
        render={() => {
          return (
            <Fragment>
              <Patients updatePatient={this.updatePatient} deletePatient={this.deletePatient} patients={patients} goHome={() => this.props.history.push('/')}/>
            </Fragment>
          );
        }}
      />
      <Route
        path="/"
        render={() => {
          return (
            <Fragment>
            <h1>Hello</h1>
            <button onClick={() => this.props.history.push(`/patients`)}>
              View Patients                
            </button> 
            <button onClick={() => this.setState({show: true})}>New Patient</button>
            <NewPatient show={this.state.show} saveNew={this.saveNew} onClose={this.onClose} />
            </Fragment>
          )
        }}
      />
       

      </Switch>

    </Fragment>


  );
}

}


export default withRouter(App);

