import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Image from 'material-ui-image'

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  card: {
    width: '100%',
    maxWidth: 400,
    borderRadius: spacing(1),
    color: 'rgba(0,0,0,.54)',
    transition: 'box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)',
    position: 'relative',
    overflow: 'initial',
    // display: 'flex',
    // flexDirection: 'column',
    alignItems: 'center',
    // textAlign: 'center',
    // paddingLeft: 8,
    // paddingRight: 8,
    margin: 'auto',
    // background:
    //   'linear-gradient(34deg, rgba(55,16,83,1) 0%, rgba(162,73,190,1) 29%, rgba(33,16,83,1) 92%)',
    // [breakpoints.up('sm')]: {
    //   textAlign: 'left',
    //   flexDirection: 'row-reverse',
    // },
  },
  img: {
    borderRadius: '8px',
    borderBottom: '1px solid rgba(255,255,255,.2)',
    width: '100%',
    height: 'auto',
  },
  media: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  overline: {
    // lineHeight: 2,
    // fontWeight: 'bold',
    // fontSize: '0.625rem',
    // opacity: 0.7,
  },
  heading: {
    // fontWeight: '900',
    // letterSpacing: 0.5,
    textAlign: 'center',
    fontWeight: 500,
    textShadow: '1px 1px rgba(0,0,0,.1)',
  },
  // button: {
  //   backgroundColor: 'rgba(255, 255, 255, 0.15)',
  //   borderRadius: 100,
  //   paddingLeft: 32,
  //   paddingRight: 32,
  //   color: '#ffffff',
  //   textTransform: 'none',
  //   width: '100%',
  //   '&:hover': {
  //     backgroundColor: 'rgba(255, 255, 255, 0.32)',
  //   },
  //   [breakpoints.up('sm')]: {
  //     width: 'auto',
  //   },
  // },
}));

const RewardCard = (props) => {
  const styles = useStyles();
  return (
    <Card className={styles.card} style={props.styles}>
      <img className={styles.img} src={props.img} />
      <CardContent className={styles.content}>
        <Typography component="div" className={styles.overline} variant={'overline'} gutterBottom>
          {props.title}
        </Typography>
        <Typography component="div" className={styles.heading} variant={'h4'}>
          {props.value}
        </Typography>
        <Typography component="div" className={styles.heading} variant={'subtitle1'}>
          {props.unit}
        </Typography>
        {/* <Button className={styles.button}>Kazananları Gör</Button> */}
      </CardContent>
    </Card>
  );
};


export default RewardCard;