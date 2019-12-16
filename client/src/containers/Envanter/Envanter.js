import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { getEnvanter, putEnvanter } from '../../store/reducers/api.envanter';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { userService } from "../../services";

import EnvanterAddDialog from "./EnvanterAddDialog"

const styles = theme => ({
  root: {
    width: '100%',
    flexGrow: 1
  },
  card: {
      overflowX: 'auto'
  },
  rootLoading: {
      height: "inherit",
      display: "flex",
      justifyContent: "center",
      width: '100%',
      alignItems: "center",
      margin: '8px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    verticalAlign: 'middle',
  },
  table: {
    minWidth: 650,
  },
  button: {
    margin: theme.spacing(1),
  },
});

function renderLoadingButton(classes) {
  return (
    <div className={classes.rootLoading}>
      <CircularProgress size={24} className={classes.buttonProgress} />
    </div>
  )
} 

function createData(name, calories, fat, carbs, protein) {
    return { 
        name, 
        calories, 
        fat, 
        carbs, 
        protein 
    };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

class Envanter extends React.Component {
  
  constructor(props) {
    super(props);

    this.handleCloseAddEnvanter = this.handleCloseAddEnvanter.bind(this);

    this.state = { adding: undefined };
  }

  componentDidMount() {
    if (this.props.apiEnvanter == undefined ||
        this.props.apiEnvanter.items == undefined ||
        this.props.apiEnvanter.isLoaded != true)
    {
        this.props.getEnvanter(JSON.parse(localStorage.getItem('user')).id);
    }
  }

  handleCloseAddEnvanter(values) {
    console.log(values);

    if (values != undefined) {
      var currentEnvanter = this.props.apiEnvanter.items;
      console.log(currentEnvanter);
      currentEnvanter.push(values);
      console.log(currentEnvanter);
      this.props.putEnvanter(JSON.parse(localStorage.getItem('user')).id, currentEnvanter);
    }

    this.setState({adding: undefined});
  }

  render() {
    const { classes } = this.props;
    const showLoader = 
        this.props.apiEnvanter == undefined ||
        this.props.apiEnvanter.items == undefined ||
        this.props.apiEnvanter.isLoaded != true;

    return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
            { this.state.adding != undefined && (
                <EnvanterAddDialog 
                    form={this.state.adding} 
                    handleClose={this.handleCloseAddEnvanter}
                />
            )}

          <div className={classes.root}>
            { showLoader && renderLoadingButton(classes) }
            { !showLoader && 
                <span>
                    <Button
                        variant="outlined"
                        color="primary"
                        className={classes.button}
                        startIcon={<AddIcon />}
                        onClick={() => this.setState({adding: 'envanter'})}
                    >
                        Yenİ Verİ İşleme Kaydı Ekle
                    </Button>
                    <Card className={classes.card}>
                            <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                <TableCell>Departman</TableCell>
                                <TableCell align="left">Faaliyet</TableCell>
                                <TableCell align="left">Veri Kategorisi</TableCell>
                                <TableCell align="left">Kişisel Veri</TableCell>
                                <TableCell align="left">Özel Nitelikli Kişisel Veri</TableCell>
                                <TableCell align="left">İşlem Amacı</TableCell>
                                <TableCell align="left">Veri Konusu Kişi Grubu</TableCell>
                                <TableCell align="left">Hukuki Sahibi</TableCell>
                                <TableCell align="left">Saklama Süresi</TableCell>
                                <TableCell align="left">Alıcı</TableCell>
                                <TableCell align="left">Yabancı Ülkelere Aktarılan Veriler</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.apiEnvanter.items.map( (row, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell component="th" scope="row">{row.departman || '-'}</TableCell>
                                        <TableCell component="th" scope="row">{row.faaliyet || '-'}</TableCell>
                                        <TableCell component="th" scope="row">{row.veri_kategorisi || '-'}</TableCell>
                                        <TableCell component="th" scope="row">{row.kisisel_veri || '-'}</TableCell>
                                        <TableCell component="th" scope="row">{row.ozel_nitelikli_kisisel_veri || '-'}</TableCell>
                                        <TableCell component="th" scope="row">{row.islem_amaci || '-'}</TableCell>
                                        <TableCell component="th" scope="row">{row.veri_konusu_kisi_grubu || '-'}</TableCell>
                                        <TableCell component="th" scope="row">{row.hukuki_sahibi || '-'}</TableCell>
                                        <TableCell component="th" scope="row">{row.saklama_suresi || '-'}</TableCell>
                                        <TableCell component="th" scope="row">{row.alici || '-'}</TableCell>
                                        <TableCell component="th" scope="row">{row.yabanci_ulkelere_aktarilan_veriler || '-'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            </Table>
                    </Card>
                </span>
            }
          </div>
        </div>
      );
    }
};

const mapStateToProps = state => {
  return {
    apiEnvanter: state.apiEnvanter,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getEnvanter: (userId) => getEnvanter(userId),
      putEnvanter: (userId, values) => putEnvanter(userId, values),
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Envanter));
