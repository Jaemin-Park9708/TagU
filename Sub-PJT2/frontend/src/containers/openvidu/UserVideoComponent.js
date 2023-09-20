import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
import './UserVideo.css';

export default class UserVideoComponent extends Component {

    getNicknameTag() {
        try {
            const clientData = JSON.parse(this.props.streamManager.stream.connection.data);
            return clientData.clientData || 'Unknown';
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return 'Unknown';
        }
    }    

    render() {
        return (
            <div>
                {this.props.streamManager !== undefined ? (
                    <div>
                        <OpenViduVideoComponent streamManager={this.props.streamManager} />
                        <div><p>{this.getNicknameTag()}</p></div>
                    </div>
                ) : null}
            </div>
        );
    }
}
