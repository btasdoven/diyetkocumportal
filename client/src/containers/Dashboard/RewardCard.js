
import ExtendedLink from '../../components/ExtendedLink'
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    paddingLeft: 8,
    paddingRight: 8,
    margin: 'auto',
    background:
      'linear-gradient(34deg, rgba(95,46,123,1) 0%, rgba(162,73,190,1) 29%, rgba(53,36,103,1) 92%)',
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
    lineHeight: 2,
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: '0.625rem',
    opacity: 0.8,
    fontWeight: 500,
    textShadow: '1px 1px rgba(0,0,0,.1)',
  },
  heading: {
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 0.5,
    fontWeight: 500,
    textShadow: '1px 1px rgba(0,0,0,.1)',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 100,
    paddingLeft: 32,
    paddingRight: 32,
    color: '#ffffff',
    textTransform: 'none',
    width: '100%',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.32)',
    },
    [breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
}));

const RewardCard = (props) => {
  const styles = useStyles();
  return (
    <Card className={styles.card}>
      {/* <CardMedia className={styles.media} image={'https://jkkm.info/ui/images/awards/victory.png'} /> */}
      <CardContent className={styles.content}>
        {/* <Typography className={styles.overline} variant={'overline'}>
          25 NİSAN 2020 - 2 MAYIS 2020
        </Typography> */}
        <Typography className={styles.heading} variant={'h6'} gutterBottom>
          Haftanın Enleri
        </Typography>
        <Button className={styles.button} 
            component={ExtendedLink} 
            onClick={props.onClick}
            to={props.to}
        >KAZANANLARI GÖR</Button>
      </CardContent>
    </Card>
  );
};


export default RewardCard;