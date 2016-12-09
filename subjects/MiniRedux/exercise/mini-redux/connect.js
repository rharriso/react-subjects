import React, {PropTypes} from 'react'

const connect = (mapStateToProps) => {
  return (Component) => {
    return class Connected extends React.Component {

      static contextTypes = {
        store: PropTypes.object.isRequired
      }

      state = {}

      componentDidMount () {
        const {store} = this.context;
        this.setState({counter: store.getState()})

        store.subscribe(() => {
          this.setState({counter: store.getState()})
        })
      }

      render () {
        return (
          <Component
            dispatch={this.context.store.dispatch}
            counter={this.state.counter}
            />
        )
      }
    }
  }
}

export default connect
