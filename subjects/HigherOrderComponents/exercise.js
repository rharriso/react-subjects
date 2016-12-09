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
    state = {
      mouse: {
        x: 0,
        y: 0
      }
    }

    componentDidUnmount () {
      window.removeEventListener('mousemove')
    }

    componentDidMount () {
      window.addEventListener('mousemove', (e)=> {
        this.setState({
          mouse: {
            x: e.clientX, y: e.clientY
          }
        })
      })
    }

    render () {
      console.log(this.state, Component);
      return <Component {...this.state}/>
    }
  }
}

class App extends React.Component {
  static propTypes = {
    mouse: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }).isRequired
  }

  render() {
    const { mouse } = this.props

    return (
      <div style={{ height: '100%' }}>
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
