class PatientsController < ApplicationController
  def create
    patient = Patient.new(patient_params)
    if patient.save
      render json: patient
    else
      render json: patient.errors.messages
    end
  end

  def index
    patients = Patient.all
    render json: patients
  end

  def show
    patient = Patient.find(params[:id])
    render json: patient
  end

  def update
    patient = Patient.find(params[:id])
    patient.update(patient_params)
    if patient.valid?
      render json: patient
    else
      render json: patient.errors.messages
    end
  end

  def destroy
    patient = Patient.find(params[:id])
    patient.destroy
    render json: { message: "Patient deleted"}
  end

  private

  def patient_params
    params.require(:patient).permit(:name, :dob, :email)
  end
end
