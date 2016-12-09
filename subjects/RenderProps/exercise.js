////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Refactor App by creating a new component named `<GeoPosition>`
// - <GeoPosition> should use a child render callback that passes
//   to <App> the latitude and longitude state
// - When you're done, <App> should no longer have anything but
//   a render method
//
// Got extra time?
//
// - Now create a <GeoAddress> component that also uses a render
//   callback with the current address. You will use
//   `getAddressFromCoords(latitude, longitude)` to get the
//   address, it returns a promise.
// - You should be able to compose <GeoPosition> and <GeoAddress>
//   beneath it to naturally compose both the UI and the state
//   needed to render it
// - Make sure <GeoAddress> supports the user moving positions
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import LoadingDots from './utils/LoadingDots'
import getAddressFromCoords from './utils/getAddressFromCoords'


class Geolocation extends React.Component {

  static propTypes = {
    children: PropTypes.func
  }

  state = {
    coords: {
      latitude: null,
      longitude: null
    },
    error: null
  }

  componentDidMount() {
    this.geoId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        const lat = latitude + (Math.random() * 10 - 5)
        const lng = longitude + (Math.random() * 10 - 5)

        this.setState({
          coords: {
            latitude: lat,
            longitude: lng
          }
        })
      },
      (error) => {
        this.setState({ error })
      }
    )
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.geoId)
  }


  render () {
    return this.props.children(this.state)
  }
}


class GeoAddress extends React.Component {
  state = {};

  componentDidMount() {
    const { latitude, longitude } = this.props.coords

    getAddressFromCoords(latitude, longitude).then((address) => {
      this.setState({ address });
    });
  }

  render () {
    return this.props.children(this.state.address)
  }
}


class App extends React.Component {

  render() {
    return (
      <div>
        <h1>Geolocation</h1>
          <Geolocation>
            {({ coords, error }) => (
              error ? (
                <div>Error: {error.message}</div>
              ) : (
                <dl>
                  <dt>Latitude</dt>
                  <dd>{coords.latitude || <LoadingDots/>}</dd>
                  <dt>Longitude</dt>
                  <dd>{coords.longitude || <LoadingDots/>}</dd>
                  {coords.latitude && coords.longitude &&
                    <GeoAddress coords={coords}>
                      {(address) => (
                        <dd>{address || <LoadingDots/>}</dd>
                      )}
                    </GeoAddress>
                  }
                </dl>
              )
            )}
          </Geolocation>

      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
