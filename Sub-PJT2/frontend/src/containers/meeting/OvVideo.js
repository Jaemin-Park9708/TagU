import React, { Component } from "react";

export default class OpenViduVideoComponent extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.streamManager && this.videoRef.current) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  }

  render() {
    return <video autoPlay={true} ref={this.videoRef} />;
  }
}
