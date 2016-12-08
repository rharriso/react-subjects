import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import './styles.css'

const { func, any, bool } = PropTypes


////////////////////////////////////////////////////////////////////////////////
// Requirements
//
// Make this work like a normal <select><option/></select>

class Select extends React.Component {
  static propTypes = {
    onChange: func,
    value: any,
    defaultValue: any
  }

  state = {
    isOpen: false,
    value: this.props.value || this.props.defaultValue
  }

  componentDidUpdate (nextProps) {
    if (nextProps.value && nextProps.value !== this.props.value) {
      this.setState({ value: this.props.value });
    }
  }

  render() {
    let label = '';

    const children = React.Children.map(this.props.children, (child) => {
      if (child.type === Option) {
        if(this.state.value === child.props.value) {
          label = child.props.children;
        }

        return React.cloneElement(child, {
          onClick: () => {
            if(this.props.value) {
              this.props.onChange && this.props.onChange(child.props.value)
            } else {
              this.setState({
                value: child.props.value
              })
            }
          }
        });
      }

      return child
    });

    return (
      <div className="select" onClick={() => { this.setState({isOpen: !this.state.isOpen}) }}>
        <div className="label">{label}<span className="arrow">▾</span></div>
        <div className="options">
          {this.state.isOpen && children}
        </div>
      </div>
    )
  }
}


class Option extends React.Component {
  render() {
    return (
      <div onClick={this.props.onClick} className="option">{this.props.children}</div>
    )
  }
}

class App extends React.Component {
  state = {
    selectValue: 'dosa'
  }

  setToMintChutney() {
    this.setState({selectValue: 'mint-chutney'})
  }

  render() {
    return (
      <div>
        <h1>Select/Option</h1>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>

        <h2>Controlled</h2>
        <p>
          <button onClick={this.setToMintChutney.bind(this)}>Set to Mint Chutney</button>
        </p>

        <Select
          value={this.state.selectValue}
          onChange={(selectValue) => this.setState({ selectValue })}
        >
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select>

        <h2>Uncontrolled</h2>
        <Select defaultValue="tikka-masala">
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'))
