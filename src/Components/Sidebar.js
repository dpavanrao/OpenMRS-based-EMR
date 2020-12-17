import React, { Component } from 'react'
import './Global.css'

class Sidebar extends Component {

  render() {
      console.log(this.props)
      const widgets = this.props.widgets;
      let widgetList = widgets.map((d) => <button className="SidebarList" key={d.key} onClick={() => this.props.mountWidget(d)}>{d}</button>) 
      
      return (
          <div className="Sidebar">
              {widgetList}
          </div>
      )
  }
}

export default Sidebar

