
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ExtendedLink from '../../components/ExtendedLink';
import { userService } from '../../services/user.service';
import { getAllDietitians } from '../../store/reducers/api.allDietitians';

const styles = theme => ({
  root: {
    // maxWidth: 400,
    overflow: 'hidden',
    flexGrow: 1,
    backgroundColor: 'white'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: theme.spacing(8),
    width: theme.spacing(8),
    // marginRight: '16px'
    // maxWidth: 400,
    // overflow: 'hidden',
    // display: 'block',
    // width: '100%',
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    margin: theme.spacing(0.25)
  },
  dietitanList: {
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
  },
  rootLoading: {
      height: "inherit",
      display: "flex",
      justifyContent: "center",
      width: '100%',
      alignItems: "center",
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2),
      //textAlign: 'center',
  },
});

function renderLoadingButton(classes) {
  return (
    <div className={classes.rootLoading}>
      <CircularProgress size={24} className={classes.buttonProgress} />
    </div>
  )
} 

class DietianList extends React.Component {

  constructor(props) {
    super(props)

    this.isLoaded = this.isLoaded.bind(this);

    this.state = {
      openDialog: false
    }

    this.timer = undefined;
  }

  isLoaded() {
    var loaded = this.props.apiAllDietitians != undefined &&
      this.props.apiAllDietitians.isGetLoading != true &&
      this.props.apiAllDietitians.data != undefined;

      return loaded;
  }

  componentDidMount() {
    if (!this.isLoaded()) {
      // this.timer = setTimeout(() => {
        this.props.getAllDietitians()
      // }, 5000)
    }
  }

  componentWillUnmount() {
    if (this.timer != undefined) {
      clearTimeout(this.timer);
    }
  }

  render() {
    const { classes } = this.props;
    const showLoader = !this.isLoaded();
    const dietitians = showLoader ? undefined : this.props.apiAllDietitians.data;

    return (
      <Fragment>
        { showLoader && renderLoadingButton(classes) }
        { !showLoader && (
          <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            {dietitians.map((step, index) => (
              <Fragment key={index}>
                <Avatar 
                  component={ExtendedLink} 
                  to={`/${dietitians[index].username}`} 
                  className={classes.avatar} 
                  src={userService.getStaticFileUri(dietitians[index].url64)} 
                  alt={dietitians[index].name} 
                />
              </Fragment>
            ))}
          </div>
        )}
      </Fragment>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    apiAllDietitians: state.apiAllDietitians,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getAllDietitians: () => getAllDietitians(),
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(DietianList));