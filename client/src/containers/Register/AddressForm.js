import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

import Divider from '@material-ui/core/Divider';
import ToggleButton from '@material-ui/lab/ToggleButton';

const styles = theme => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});

function AddressForm(props) {
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        {props.question}
      </Typography>
      <Grid style={{marginTop:'24px'}} container spacing={24}>
        <Grid item xl={12} sm={12} lg={12} xs={12}>
          {props.choices.map((choice, idx) => 
            <div>
              {idx == 0 && props.response == undefined && <Divider />}
              <Button 
                variant={props.response == idx ? "contained" : ""}
                onClick={() => props.handleResponse(idx)}
                fullWidth
                disabled={props.response != undefined}
                color={props.response == idx ? "secondary" : "primary"}>
                {choice}
              </Button>
              <Divider />
            </div>
          )}
        </Grid>
      </Grid>
      
      { props.response != undefined
          &&
          <div style={{marginTop:'48px'}} >
              <Typography gutterBottom>
                CHP'nin 24 Aralik 2018 tarihinde verdigi 123456 sayili 
                FETO'nun siyasi ayaginin ortaya cikarilmasi amacli
                arastirma komisyonu kurulmasi icin partiler su sekilde
                oy kullanmistir:
              </Typography>

              <Chip 
                style={{marginTop:'24px', width: '95%', display: 'flex', justifyContent: 'left'}} 
                label="187/300 milletvekili cikartilmai oyu kullandi."
                color="primary" 
                avatar={<Avatar style={{float:'left'}} src="https://marka123blog.files.wordpress.com/2014/01/chp-eski-logo.jpg" />}
                />

              <Chip 
                style={{marginTop:'6px', width: '45%', display: 'flex', justifyContent: 'left'}} 
                label="14/450 milletvekili cikartilmai oyu kullandi."
                color="secondary" 
                avatar={<Avatar style={{float:'left'}} src="https://t5.rbxcdn.com/03b2d6f000948ba1697ea9e3d7010289" />}
                />

              <Chip 
                style={{marginTop:'6px', width: '45%', display: 'flex', justifyContent: 'left'}} 
                label="2/45 milletvekili cikartilmai oyu kullandi."
                color="secondary" 
                avatar={<Avatar style={{float:'left'}} src="https://seeklogo.com/images/M/mhp-new-logo-C532F77C38-seeklogo.com.png" />}
                />

              <Typography 
                style={{marginTop:'24px'}} 
                gutterBottom>
                Onerinin yururluge girmesi icin gereken 300 oy toplanamadigindan, 
                oneri reddedilmistir.
              </Typography>

              <div className={props.classes.buttons}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={props.handleNext}
                  className={props.classes.button}
                >
                  {'Sonraki'}
                </Button>
              </div>
          </div>
      }
    </React.Fragment>
  );
}

export default withStyles(styles)(AddressForm);