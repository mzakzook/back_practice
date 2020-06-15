import React, { Component } from 'react'

export default class editPatient extends Component {
  state = {
    name: this.props.patient.name,
    dob: this.props.patient.dob,
    email: this.props.patient.email
  }

  handleChange = (e) => {
    if (e.target.name === "patientName" && e.target.value.length < 30) {
        this.setState({
            name: e.target.value
        })
    } else if (e.target.name === "email" && e.target.value.length < 30) {
        this.setState({
            email: e.target.value
        })
    } else if (e.target.name === "dob") {
        this.setState({
            dob: e.target.value
        })
    } else {
        alert('Exceeded character limit')
    }
}

  render() {
    if (!this.props.show) {
        return null;
    }
    return (
        <div id="myModal" className="add-modal">
            <div className="add-modal-content">
                <form onSubmit={(event) => {
                    this.props.saveEdit(event, this.state, this.props.patient.id)
                }}>
                    <label htmlFor="patientName">Patient Name</label>
                    <input
                        value={this.props.patient.name}
                        type="text"
                        name="patientName"
                        onChange={this.handleChange}
                    />
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input
                        type="date"
                        name="dob"
                        value={this.props.patient.dob}
                        onChange={this.handleChange}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        defaultValue={this.props.patient.email}
                        onChange={this.handleChange}
                    />
                    <button
                        type="submit"
                        className="btn btn-primary" >Save
                    </button>
                    <span id="close" onClick={this.props.onClose}>X</span>
                </form>
            </div>
        </div>
    )
}
}

