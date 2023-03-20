import './index.css'

const AppointmentItem = props => {
  const {objectDetails, onSelectStar} = props
  const {id, userTitleValue, userDateValue, isFavorite} = objectDetails

  const dateValue = new Date(`${userDateValue}`)

  const newDateValue = dateValue.toDateString()

  const onChangeFavorite = () => {
    onSelectStar(id)
  }

  return (
    <li className="list-item">
      <div className="title-star-container">
        <p className="title">{userTitleValue}</p>
        <button
          data-testid="star"
          type="button"
          className="star-button"
          onClick={onChangeFavorite}
        >
          {isFavorite ? (
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
              className="star-image"
              alt="star"
            />
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png"
              className="star-image"
              alt="star"
            />
          )}
        </button>
      </div>
      <p className="date">Date: {newDateValue}</p>
    </li>
  )
}

export default AppointmentItem
