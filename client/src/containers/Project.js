import React, { Component } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  card: {
    display: "flex"
  },
});

class CameraWrapper extends Component {
  render () {
    return (
      <Camera
        className={this.props.classes.card}
        component={<span />}
        isFullscreen={true}
        onTakePhoto = { (dataUri) => { this.props.onTakePhoto(dataUri); } }
      />
    );
  }
}

export default withStyles(styles)(CameraWrapper);