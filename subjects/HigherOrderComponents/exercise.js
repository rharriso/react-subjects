////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make `withMousePosition` a "higher-order component" that sends the mouse
// position to the component as props.
//
// Hint: use `event.clientX` and `event.clientY`
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'

const withMousePosition = (Component) => {

  return class MousePosition extends React.Component {
    state = {}

    render () {
      return <Component {...this.state} onMouseMove={(e)=> {
        this.setState({
          mouse: {
            x: e.clientX, y: e.clientY
          }
      })}} />
    }
  }
}

class App extends React.Component {
  static propTypes = {
    mouse: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    })
  }

  render() {
    const { mouse, onMouseMove } = this.props

    return (
      <div onMouseMove={onMouseMove} style={{ height: '100%' }}>
        {mouse ? (
          <h1>The mouse position is ({mouse.x}, {mouse.y})</h1>
        ) : (
          <h1>We don't know the mouse position yet :(</h1>
        )}
      </div>
    )
  }
}

const AppWithMouse = withMousePosition(App)

ReactDOM.render(<AppWithMouse/>, document.getElementById('app'))
