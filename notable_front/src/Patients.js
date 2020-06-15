import React, { Component } from 'react'
import PatientCard from "./PatientCard"
import EditPatient from "./EditPatient"


export default class Patients extends Component {
  state = {
    show: false,
    patient: {}
  }

  editPatient = (patient) => {
    this.setState({
      show: true,
      patient
    })
  }

  saveEdit = (e, patient, id) => {
    e.preventDefault()
        fetch(`http://localhost:3001/patients/${id}`, {
            method: "PATCH",
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
                      show: false,
                      patient: {}
                  })
                  this.props.updatePatient(data)
                } else {
                  let errors = []
                  for (let key in data) {
                    errors.push(`${key}: ${data[key]}`)
                  }
                  alert(errors) 
                
                }
                
            })
   
}

onClose = () => {
  this.setState({
    show: false,
    patient: {}
  })
}


  render() {
    const { patients } = this.props
    return (
      <div>
        <EditPatient show={this.state.show} patient={this.state.patient} onClose={this.onClose} saveEdit={this.saveEdit} />
         {patients.map(patient => {
          return <div key={patient.id}><PatientCard key={patient.id} patient={patient} deletePatient={this.props.deletePatient} editPatient={this.editPatient}/><br/></div>
        })}
        <button onClick={this.props.goHome}>Go Home</button>
      </div>
    )
  }
}
