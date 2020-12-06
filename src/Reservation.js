import React from 'react';

class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2,
    };
  }

  handleInputChange = (event, wll) => {
    console.log(wll, "=======>")
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const wll = "ocean";
    return (
      <form>
        <label>
          参与:
            <input
            name="isGoing"
            type="checkbox"
            wll="isGoing"
            checked={this.state.isGoing}
            onChange={(e) => this.handleInputChange(e, wll)} />
        </label>
        <br />
        <label>
          来宾人数:
            <input
            name="numberOfGuests"
            type="number"
            wll="numberOfGuests"
            value={this.state.numberOfGuests}
            onChange={(e) => this.handleInputChange(e, wll)} />
        </label>
      </form>
    );
  }
}

export default Reservation;
