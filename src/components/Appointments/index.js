import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    userTitle: '',
    userDate: '',
    appointmentsList: [],
    isStarred: false,
  }

  onEnterTitle = event => {
    this.setState({userTitle: event.target.value})
  }

  onEnterDate = event => {
    this.setState({userDate: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {userTitle, userDate, appointmentsList} = this.state
    const newObj = {
      id: uuidv4(),
      userTitleValue: userTitle,
      userDateValue: userDate,
      isFavorite: false,
    }
    this.setState({
      userTitle: '',
      userDate: '',
      appointmentsList: [...appointmentsList, newObj],
    })
  }

  onSelectStar = id => {
    const {appointmentsList} = this.state
    const objectIndex = appointmentsList.findIndex(eachObj => eachObj.id === id)
    const object = appointmentsList[objectIndex]

    const newObject = {
      id: object.id,
      userTitleValue: object.userTitleValue,
      userDateValue: object.userDateValue,
      isFavorite: !object.isFavorite,
    }

    console.log(newObject)

    appointmentsList.splice(objectIndex, 1, newObject)

    this.setState({
      appointmentsList,
    })
  }

  onFilterList = () => {
    const {appointmentsList, isStarred} = this.state
    const appointmentListCopy = [...appointmentsList]
    console.log(appointmentListCopy === appointmentsList)
    const filteredList = appointmentListCopy.filter(
      eachAppointment => eachAppointment.isFavorite === true,
    )

    if (isStarred === false) {
      this.setState({
        appointmentsList: filteredList,
        isStarred: !isStarred,
      })
    } else {
      this.setState({
        appointmentsList,
        isStarred: !isStarred,
      })
    }
  }

  render() {
    const {userTitle, userDate, appointmentsList, isStarred} = this.state
    return (
      <div className="bg-container">
        <div className="card">
          <div className="top-section">
            <form className="form-element">
              <h1 className="appointment-heading">Add Appointment</h1>
              <label htmlFor="addTitle" className="title-label">
                TITLE
              </label>
              <input
                placeholder="TITLE"
                id="addTitle"
                type="text"
                className="user-title"
                onChange={this.onEnterTitle}
                value={userTitle}
              />
              <label htmlFor="addDate" className="date-label">
                DATE
              </label>
              <input
                id="addDate"
                type="date"
                className="user-date"
                onChange={this.onEnterDate}
                value={userDate}
              />
              <button
                type="submit"
                className="add-button"
                onClick={this.onAddAppointment}
              >
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="appointments-image"
              alt="appointments"
            />
          </div>
          <hr />
          <div className="bottom-section">
            <h1 className="appointment-list-heading">Appointments</h1>
            {isStarred ? (
              <button
                type="button"
                className="true-starred-button"
                onClick={this.onFilterList}
              >
                Starred
              </button>
            ) : (
              <button
                type="button"
                className="starred-button"
                onClick={this.onFilterList}
              >
                Starred
              </button>
            )}
          </div>
          <ul className="list-container">
            {appointmentsList.map(eachAppointment => (
              <AppointmentItem
                objectDetails={eachAppointment}
                onSelectStar={this.onSelectStar}
                key={eachAppointment.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
