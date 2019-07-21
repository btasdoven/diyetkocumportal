import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { getMaterial } from '../store/reducers/api.materials';
import { allFieldItemsFetchData } from '../store/reducers/api.allFieldList';

import { withStyles } from '@material-ui/core/styles';

import UserDataExpensionPanel from '../components/UserDataExpansionPanel'
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { userService } from "../services";

import MenuItem from '@material-ui/core/MenuItem';

import { Field } from "redux-form";

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    verticalAlign: 'middle',
  },
  table: {
    align: 'left'
  },
});

const renderTextField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <TextField
      label={label}
      {...input}
      {...custom}
      margin="dense"
      fullWidth
    />
)



function getFieldRefValue(self, fieldId) {
  var parts = fieldId && fieldId.split('/');
  if (!parts || parts.length < 2) {
    return {
      refId: fieldId,
      refValue: ''
    };
  }

  var groupId = parts[0];

  if (self.props.apiFields &&
    self.props.apiFields[groupId] && 
    self.props.apiFields[groupId].items &&
    self.props.apiFields[groupId].items.data[fieldId]) {
      var refField = self.props.apiFields[groupId].items.data[fieldId];
      if (refField.type === "link") {
        return getFieldRefValue(self, refField.link);
      } else {
        return {
          refId: fieldId,
          refValue: refField.value
        };
      }
  } else {
    if (!self.props.apiFields ||
      !self.props.apiFields[groupId] ||
      !self.props.apiFields[groupId].isGetLoading) {
      self.props.getMaterial(self.props.userId, groupId);
    }
    return {
      refId: fieldId,
      refValue: ''
    };
  }
}

class LinkField extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      refId: '',
      refValue: ''
    };

    this.handleOnChange = this.handleOnChange.bind(this);
  }
  
renderTextFieldOption = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => {
  var opts = 
    <MenuItem key={this.props.fieldId} value={this.props.fieldId}>
      {this.props.fieldId}
  </MenuItem>;
  
  var self = this;
  var items = custom.itemlist;
  if (items) {
    var opts = Object.keys(items).map(fieldId => {
      if (fieldId === this.props.fieldId) {
        return;
      }

      if (!self.props.apiFields) {
        return;
      }
      
      console.log(this.props.fieldId)
      console.log(fieldId)
      console.log(items[fieldId])
      console.log(self.props.apiFields)
      var groupId = this.props.fieldId.split('/')[0];

      if (items[fieldId] != true &&
        self.props.apiFields[groupId] &&
        self.props.apiFields[groupId].items &&
        self.props.apiFields[groupId].items.data[this.props.fieldId] &&
        self.props.apiFields[groupId].items.data[this.props.fieldId].link_type !== items[fieldId]) {
          console.log(self.props.apiFields[groupId].items.data[this.props.fieldId].link_type)
          console.log(items[fieldId])
          return;
      }

      return (
        <MenuItem key={fieldId} value={fieldId}>
            {fieldId}
        </MenuItem>
      );
    })
  } else if (!this.props.apiAllFieldList.isGetLoading) {
    this.props.allFieldItemsFetchData(this.props.userId);
  }

  return (
    <TextField
      select
      label={label}
      {...input}
      {...custom}
      margin="dense"
      fullWidth
      children={opts}
    />
  )
}

  componentWillMount() {
    if (this.props.fieldRef) {
      getFieldRefValue(this, this.props.fieldRef);
    } else if (this.props.fieldId && this.props.form && this.props.form[this.props.fieldId]) {
      getFieldRefValue(this, this.props.form[this.props.fieldId].values.link);
    }
  }

  handleOnChange(event) {
    if (this.props.fieldRef) {
      return;
    }

    this.setState(getFieldRefValue(this, event.target.value));
  }

  render() {
    var key = this.props.fieldId
    var refValue = this.state.refValue;

    if (!refValue) {
      refValue = getFieldRefValue(this, key).refValue;
    }
    // if (!refValue && parts.length >= 2) {
    //   var groupId = parts[0];
    //   if (this.props.apiFields &&
    //     this.props.apiFields[groupId] && 
    //     this.props.apiFields[groupId].items &&
    //     this.props.apiFields[groupId].items.data[this.state.refId]) {
    //       var refField = this.props.apiFields[groupId].items.data[this.state.refId];
    //       if (refField.type === "link") {
    //         var { refValue } = getFieldRefValue(this, refField.link);
    //       } else {
    //         refValue = this.props.apiFields[groupId].items.data[this.state.refId].value;
    //       }
    //   }
    // }

    if (this.props.fieldRef) {
      var {fieldId, fieldRef, inputProps, className, disabled, multiline, id, name, label, helperText} = this.props;
      return <TextField
            disabled={disabled}
            key={key}
            name={name}
            id={id}
            inputProps={inputProps}
            multiline={multiline}
            className={className}
            label={label}
            value={refValue}
            helperText={helperText}
      />
    } else {
      return (
        <Field
            key={key}
            name={key + '_link'}
            id={key + '_link'}
            component={this.renderTextFieldOption}
            label={label}
            onChange={this.handleOnChange}
            helperText={refValue || ""}
            itemlist={this.props.apiAllFieldList ? this.props.apiAllFieldList.items : { [this.props.fieldId]: true }}
        />
      );
    }
  }
};

const mapStateToProps = state => {
  return {
    apiMaterials: state.apiMaterials,
    apiAllFieldList: state.apiAllFieldList,
    form: state.form,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getMaterial: (userId, groupId) => getMaterial(userId, groupId),
      allFieldItemsFetchData: (userId) => allFieldItemsFetchData(userId)
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LinkField));
