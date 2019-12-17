import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";

import { Form, Field, reduxForm } from "redux-form";
const styles = theme => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
      verticalAlign: 'middle',
      alignItems: 'center',
      display: 'inline-flex',
    },
    table: {
      align: 'left',
      width: '100%'
    },
    headerImg: {
        marginRight: theme.typography.pxToRem(5)
    },
    buttonProgress: {
      top: '50%',
      left: '50%',
    },
    rootLoading: {
        height: "inherit",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    gridLoading: {
        padding: "20px",
        display: "grid",
        gridTemplateRows: "85px 1fr 1fr 1fr",
        height: "inherit"
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
      margin="normal"
      fullWidth
    />
  )

const createTextField = (key, label, autoFocus) => (
<Field
    key={key}
    name={key}
    id={key}
    component={renderTextField}
    autoFocus={autoFocus}
    label={label}
/>)

export const reduxFormSelect = props => {
    const { input, options } = props;

    { console.log(input, options)}
  
    return (
      <Select 
        {...input} 
        onChange={value => input.onChange(value)} 
        onBlur={() => input.onBlur(input.value)} 
        value={input.value}
      >
        {options.map((val) => <MenuItem key={val.value} value={val.value}>{val.label}</MenuItem>)}
      </Select>
    )
  }

const createSelect = (key, label, autoFocus, values) => (
    <FormControl
        style={{width: '100%'}}>
        <InputLabel id={label+"_label"}>{label}</InputLabel>

        <Field
            name={key}
            options={values}
            autoFocus={autoFocus}
            component={reduxFormSelect}
        />
    </FormControl>)

class FieldDialog extends React.Component {
 
    constructor(props) {
        super(props)
        console.log(props)

        this.onSubmitInternal = this.onSubmitInternal.bind(this);
        this.state = {
        }
    }

    onSubmitInternal(formValues) {
        //RetrieveFormValuesForType(formValues)
        console.log(formValues);
        this.props.handleClose(formValues);
    }

    render() {

        if (this.props.reduxForm == undefined) {
            return <span></span>;
        }

        console.log(this.props.reduxForm);
        console.log(this.props.reduxForm.values['departman']);
        return (
            <Form
                onSubmit={this.props.handleSubmit(this.onSubmitInternal)}
                name={this.props.form}
            >
                <Dialog 
                    open={true} 
                    onClose={() => this.props.handleClose(undefined)}
                >
                    <DialogTitle id="form-dialog-title">Yeni Veri İşleme Kaydı Ekle</DialogTitle>
                    <DialogContent>
                        {/* <DialogContentText>
                            Enter the title of the synthesis you have done and share some more details below:
                        </DialogContentText> */}

                       {createSelect('departman', 'Departman', false, 
                        [
                            {
                              label: 'İnsan Kaynakları',
                              value: 'İnsan Kaynakları',
                            },
                            {
                              label: 'IT',
                              value: 'IT',
                            },
                            {
                              label: 'Satış',
                              value: 'Satış',
                            },
                        ])}
                        {createTextField('faaliyet', 'Faaliyet', true)}
                        {createTextField('veri_kategorisi', 'Veri Kategorisi', false)}
                        {createTextField('kisisel_veri', 'Kişisel Veri', false)}
                        {createTextField('ozel_nitelikli_kisisel_veri', 'Özel Nitelikli Kişisel Veri', false)}
                        {createTextField('islem_amaci', 'İşlem Amacı', false)}
                        {createTextField('veri_konusu_kisi_grubu', 'Veri Konusu Kişi Grubu', false)}
                        {createTextField('hukuki_sahibi', 'Hukuki Sebebi', false)}
                        {createSelect('saklama_suresi', 'Saklama Süresi', false, 
                        [
                            {
                              label: 'İşten ayrılmasından itibaren 2 yıl',
                              value: 'İşten ayrılmasından itibaren 2 yıl',
                            },
                            {
                              label: 'İşten ayrılmasından itibaren 5 yıl',
                              value: 'İşten ayrılmasından itibaren 5 yıl',
                            },
                            {
                              label: 'İşten ayrılmasından itibaren 10 yıl',
                              value: 'İşten ayrılmasından itibaren 10 yıl',
                            },
                        ])}
                        {createTextField('alici', 'Alıcı', false)}
                        {createTextField('yabanci_ulkelere_aktarilan_veriler', 'Yabanci Ülkelere Aktarılan Veriler', false)}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.props.handleClose(undefined)} color="secondary">
                            İPTAL
                        </Button>
                        <Button onClick={this.props.handleSubmit(this.onSubmitInternal)} color="secondary">
                            VERİ İŞLEME KAYDINI EKLE
                        </Button>
                    </DialogActions>
                </Dialog>
            </Form>
        )
    }
}

const redForm = reduxForm({
    enableReinitialize: true
})(withStyles(styles)(FieldDialog));

function mapStateToProps(state, props) {
    var val = { 
        departman: 'İnsan Kaynakları',
        saklama_suresi: "İşten ayrılmasından itibaren 10 yıl"
    };

    return {
      initialValues: val,
      reduxForm: state.form[props.form],
    }
}

export default connect(
    mapStateToProps,
    null)(redForm);