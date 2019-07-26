import React, { Component } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  card: {
    display: "flex"
  },
});

class CameraWrapper extends Component {

  constructor(props) {
    super(props);

    this.state = {}

    this.onTakePhoto = this.onTakePhoto.bind(this);
  }

  onTakePhoto() {
    this.props.onTakePhoto(this.state.url)
  }

  render () {
    return (
      <span>
        { this.state.url == undefined && 
          <Camera
            className={this.props.classes.card}
            idealFacingMode="environment"
            isFullscreen={false}
            onTakePhoto = { (dataUri) => { this.setState({url: dataUri}) } }
          />
        }

        { this.state.url && 
          (
            <div>
              <img src={this.state.url} /> 
              <Button onClick={this.onTakePhoto.bind(this)}>OK</Button>
              <Button onClick={() => this.setState({url: undefined})}>Retry</Button>
            </div>
          )
        }
      </span>
    );
  }
}

export default withStyles(styles)(CameraWrapper);