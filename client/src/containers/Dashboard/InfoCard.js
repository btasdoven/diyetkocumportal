import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  card: {
    width: '100%',
    maxWidth: 800,
    borderRadius: spacing(1),
    color: 'rgba(0,0,0,.54)',
    transition: 'box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)',
    position: 'relative',
    overflow: 'initial',
    // display: 'flex',
    // flexDirection: 'column',
    paddingLeft: 8,
    paddingRight: 8,
    margin: 'auto',
    // [breakpoints.up('sm')]: {
    //   textAlign: 'left',
    //   flexDirection: 'row-reverse',
    // },
  },
  media: {
    flexShrink: 0,
    width: '35%',
    paddingTop: '35%',
    marginLeft: 'auto',
    marginRight: 'auto',
    [breakpoints.up('sm')]: {
      marginRight: '3%',
      width: '20%',
      paddingTop: '20%',
    },
  },
  overline: {
    color: 'rgb(50, 50, 93)',
    fontWeight: 400,
    paddingBottom: '8px',
  },
  heading: {
    // color: 'rgb(50, 50, 93)',
    fontWeight: 400,
    paddingBottom: '16px'
  },
  // button: {
  //   backgroundColor: 'rgba(255, 255, 255, 0.15)',
  //   borderRadius: 100,
  //   paddingLeft: 32,
  //   paddingRight: 32,
  //   color: 'rgb(50, 50, 93)',
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
    <Card className={styles.card}>
      {/* <CardMedia className={styles.media} image={'https://jkkm.info/ui/images/awards/victory.png'} /> */}
      <CardContent className={styles.content}>
        <Typography className={styles.overline} variant={'h6'}>
          {props.title}
        </Typography>
        <Typography className={styles.heading} variant={'subtitle2'} gutterBottom>
          {props.content}
        </Typography>
        <Button onClick={props.onClick} component={Link} to={props.to} className={styles.button}>{props.buttonText}</Button>
      </CardContent>
    </Card>
  );
};


export default RewardCard;