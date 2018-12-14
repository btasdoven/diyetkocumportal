import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { increment, decrement } from "../store/reducers/stepCounter";
import { itemsFetchData } from '../store/reducers/api';

class Home extends React.Component {

  constructor(props) {
      super(props);

      console.log(props);
  }

  componentDidMount() {
    console.log(this);

    this.props.itemsFetchData('http://localhost:4000/api/v1/civil');
  }

  render() {

    console.log(this.props);

    return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="headline">
                Redux Example
              </Typography>
              <Typography
                align="center"
                variant="subheading"
              >
                Counter: {this.props.stepCounter.counter}
              </Typography> <br/>
            </CardContent>
            <CardActions>
              <Button color="primary" variant="contained" onClick={this.props.increment}>
                Increment
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={this.props.decrement}
              >
                Decrement
              </Button>
            </CardActions>
          </Card>
        </div>
      );
    }
};

const mapStateToProps = state => {
  return {
    stepCounter: state.stepCounter,
    items: state.api.items,
    api: state.api,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      increment: () => increment(),
      decrement: () => decrement(),
      itemsFetchData: (url) => itemsFetchData(url)
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
