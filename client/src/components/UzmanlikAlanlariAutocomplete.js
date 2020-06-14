import React, {Fragment} from 'react';
import Chip from '@material-ui/core/Chip';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';

import Autocomplete, { createFilterOptions }  from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const filter = createFilterOptions();

const uzmanlikAlanlari = [
    "Sporcu Beslenmesi",
    "Hastalıklarda Beslenme",
    "Anne ve Çocuk Beslenmesi",
    "Laktasyonda Beslenme",
    "Gebelikte Beslenme",
    "Obezite",
    "Kronik Hastalıklarda Beslenme",
    "Kilo Aldırma",
    "Kilo Verdirme",
    "Kilo Kontrolü",
    "Spor ve Egzersizde Beslenme",
    "Pediatride Beslenme",
    "Aralıklı Oruç",
    "Ketejonik Diyet",
    "Vegan Beslenme",
    "Emzirme Döneminde Beslenme",
    "Farkındakıkla Beslenme",
    "Ergenlik Çağında Beslenme",
    "Sezgisel Yeme",
    "Yaşlılıkta Beslenme",
    "Sağlıklı Beslenme",
    "Metabolik ve Bariatrik Cerrahi",
    "Klinik Beslenme",
    "Biyoetik",
    "Beslenme Danışmanlığı",
    "Diyabet",
    "Nutrisyon",
    "Futbolcu Beslenmesi",
    "Geriatri Beslenmesi",
    "İnsülin Direnci ve Metabolik Sendrom",
    "Vejetaryen Beslenme",
    "Gluten Enteropatisinde(Çölyak) Beslenme",
    "Peskateryan Beslenme",
    "Dönemsel Beslenme",
    "Yeme Bozukluklarında Beslenme",
    "Popüler Diyetler ile Beslenme",
]

export default ({
  label,
  input,
  meta: { touched, invalid, error },
  InputProps,
  getInputLabel,
  ...custom
}) => {
  const [open, setOpen] = React.useState(false);
  const loading = false;

  console.log(custom)
  console.log(input)

  return (
    <Autocomplete
      // {...input}
      multiple
      defaultValue={input.value != undefined && input.value != '' ? input.value : []}
      // limitTags={2}
      {...custom}
      id={custom.name}
      name={custom.name}
      getOptionSelected={(option, value) => {
        console.log(option, value)
        return option.name === value.name
      }}
      getOptionLabel={(option) => {
        console.log(option)
        if (typeof option == 'string') {
          return option
        }
        
        console.log(option)
        return option.name
      }}
      // inputValue={input.value == '' ? undefined : getInputLabel(input.value)}
      
      options={uzmanlikAlanlari.map(u => { return {name: u, value: u}})}
      loading={loading}
      autoSelect={true}
      disabled={custom.disabled}
      disableCloseOnSelect

      freeSolo
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value
        if (params.inputValue !== '') {
          filtered.push({
            name: `${params.inputValue}`,
            value: params.inputValue,
            freeSolo: true,
            freeSoloLabel: `${params.inputValue} (Listeye ekle)`,
          });
        }

        return filtered;
      }}

      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}

      loadingText="Yükleniyor..."
      label={label}
      onChange={(event, option) => {
        console.log(event, option)
        input.onChange(option == null ? '' : option)
      }}
      onBlur={() => {
        console.log(input)
        input.onBlur(input.value) 
      }}
      onFocus={() => input.onFocus()}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant="outlined"
            // color="secondary"
            label={option.name}
            size="small"
            {...getTagProps({ index })}
          />
        ))
      }
      renderOption={(option, { selected }) => (
        <React.Fragment>
          {option.freeSolo != true &&
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
          }
          {option.freeSolo ? option.freeSoloLabel : option.name}
        </React.Fragment>
      )}
      renderInput={params => (
        <TextField 
          {...params} 
          label={label} 
          margin="normal"
          fullWidth
          color="primary"
          placeholder="Uzmanlık alanı gir"
          disabled={custom.disabled}
          validate={custom.validate}
          required={custom.required}
          error={touched && error != undefined}
          helperText={touched && error ? error : undefined}
          InputLabelProps={{color: 'primary', shrink: true}}
          InputProps={{
            ...params.InputProps,
            ...InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="primary" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }} />
      )}
    />
  );
}