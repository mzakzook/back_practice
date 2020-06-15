import React, { Component } from 'react'

export default class PatientCard extends Component {
  render() {
    return (
      
      <div>
        {this.props.patient.name}
        <br/>
        {this.props.patient.dob}
        <br/>
        {this.props.patient.email}
        <button onClick={() => this.props.editPatient(this.props.patient)}>Edit Patient</button>
        <button onClick={() => this.props.deletePatient(this.props.patient.id)}>Delete Patient</button>
      </div>
    )
  }
}
