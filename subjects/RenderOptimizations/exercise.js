////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Write a <ListView> that only shows the elements in the view.
//
// Got extra time?
//
// - Render fewer rows as the size of the window changes (Hint: Listen
//   for the window's "resize" event)
// - Try rendering a few rows above and beneath the visible area to
//   prevent tearing when scrolling quickly
// - Remember scroll position when you refresh the page
////////////////////////////////////////////////////////////////////////////////
import React, { PropTypes } from 'react'
import { render, findDOMNode } from 'react-dom'
import * as RainbowListDelegate from './RainbowListDelegate'
import './styles'

class RainbowList extends React.Component {
  static propTypes = {
    numRows: PropTypes.number.isRequired,
    rowHeight: PropTypes.number.isRequired,
    renderRowAtIndex: PropTypes.func.isRequired
  }

  state = {
    scrollTop: 0,
    availableHeight: 500
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize)
    this.onResize()
  }

  onResize() {
    this.setState({ availableHeight: window.innerHeight })
  }

  onScroll() {
    this.setState({ scrollTop: this.scrollArea.scrollTop })
  }


  render() {
    const { numRows, rowHeight, renderRowAtIndex } = this.props
    const { scrollTop, availableHeight } = this.state
    const totalHeight = numRows * rowHeight

    const firstItemDisp = Math.floor(scrollTop / rowHeight)
    const itemDispCount = Math.floor(availableHeight/ rowHeight)

    const items = []

    let index = firstItemDisp

    while (index < firstItemDisp + itemDispCount) {
      items.push(<li key={index}>{renderRowAtIndex(index)}</li>)
      index++
    }

    return (
      <div style={{ height: '100%', overflowY: 'scroll'}}
        ref={(scrollArea)=> { this.scrollArea = scrollArea }}
        onScroll={this.onScroll.bind(this)}>

        <ol style={{ height: totalHeight, paddingTop: firstItemDisp*rowHeight, boxSizing: 'border-box'  }}>
          {items}
        </ol>
      </div>
    )
  }
}

render(
  <RainbowList
    numRows={500000}
    rowHeight={RainbowListDelegate.rowHeight}
    renderRowAtIndex={RainbowListDelegate.renderRowAtIndex}
  />,
  document.getElementById('app')
)
