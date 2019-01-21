import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { itemsFetchData } from '../store/reducers/api.fields';
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
    return;
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
      self.props.itemsFetchData(JSON.parse(localStorage.getItem('user')).id, groupId);
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
  console.log('renderTextFieldOption');
  console.log(custom);
  console.log(this.props.apiAllFieldList)

  var opts = '';
  var items = custom.itemList;
  if (items) {
    var opts = Object.keys(items).map(fieldId => {
      if (fieldId === this.props.fieldId) {
        return;
      }

      return (
        <MenuItem key={fieldId} value={fieldId}>
            {fieldId}
        </MenuItem>
      );
    })
  } else if (!this.props.apiAllFieldList.isGetLoading) {
    this.props.allFieldItemsFetchData(JSON.parse(localStorage.getItem('user')).id);
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
    console.log('linkfield')
    console.log(this.props);
    console.log(this.state);

    var key = this.props.fieldId
    var refValue = this.state.refValue;

    if (!refValue) {
      refValue = getFieldRefValue(this, key).refValue;
    }
    console.log(refValue);
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
            label={label + " (linked to " + fieldRef + ")"}
            value={refValue}
            helperText={helperText}
      />
    } else {
      console.log("render field")
      return (
        <Field
            key={key}
            name={key + '_link'}
            id={key + '_link'}
            component={this.renderTextFieldOption}
            label="Link"
            onChange={this.handleOnChange}
            helperText={refValue || ""}
            itemList={this.props.apiAllFieldList ? this.props.apiAllFieldList.items : { [this.props.fieldId]: true }}
        />
      );
    }
  }
};

const mapStateToProps = state => {
  return {
    apiFields: state.apiFields,
    apiAllFieldList: state.apiAllFieldList,
    form: state.form,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      itemsFetchData: (userId, groupId) => itemsFetchData(userId, groupId),
      allFieldItemsFetchData: (userId) => allFieldItemsFetchData(userId)
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LinkField));
