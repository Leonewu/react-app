
import React, { Component } from 'react';
import { Button } from 'antd'

export default class SetStateDemo extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  add= () => {
    this.setState({ count: this.state.count + 1 })
    debugger
    console.log('第一次setState时，count：', this.state.count)
    // this.setState((prevState) => ({ count: prevState.count + 1 }))
    // console.log('第二次setState时，count：', this.state.count)

    // setTimeout(() => {
    //   this.setState({ count: this.state.count + 1 })
    //   console.log('setTimeout中第一次setState时，count：', this.state.count)
    //   this.setState({ count: this.state.count + 1 })
    //   console.log('setTimeout中第二次setState时，count：', this.state.count)
    // }, 0)
  }

  componentDidMount() {
    this.setState({count: this.state.count + 1})
    console.log('第一次setState时，count：', this.state.count)
    this.setState((prevState) => ({ count: prevState.count + 1 }))
    console.log('第二次setState时，count：', this.state.count)

    setTimeout(() => {
      this.setState({ count: this.state.count + 1 })
      console.log('setTimeout中第一次setState时，count：', this.state.count)
      this.setState({ count: this.state.count + 1 })
      console.log('setTimeout中第二次setState时，count：', this.state.count)
    }, 0)

  }
  render() {
    return <React.Fragment><Button onClick={this.add}>add</Button></React.Fragment>
  }
}