import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Chart from './../components/Chart';
import Deposits from './../components/Desposits';
import Orders from './../components/Orders';
import Navbar from './../components/misc/Navbar'
import useStyles from './../components/styles/dashboard.style'
import { MainListItems, ClassRoomList } from '../components/DashboardRouter';
import { withAuthConsumer } from '../contexts/AuthStore';
import { Switch, Route, Redirect } from 'react-router-dom';
import ClassRoom from './CLassRoom'
import ClassRoomForm from './CRUD/CrudClassRoom'
function Dashboard(props) {  
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawer = () => setOpen(!open);
  const paperStyle = {paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),}
  
  if (!props.isTeacher) return <Redirect to={'/'} />;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute"  className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Navbar 
            open={open} handle={handleDrawer} titleClass={classes.title} 
            classes={clsx(classes.menuButton, open && classes.menuButtonHidden)}/>
      </AppBar>
      <Drawer variant="permanent" classes={paperStyle} open={open}>
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List><MainListItems/></List>
        <Divider />
        <List><ClassRoomList isOpen={open} user={props.user && props.user.data.id}/></List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Switch>
          <Route exact path="/dashboard" component={MainPage} />
          <Route exact path="/dashboard/orders" component={MainPage} />
          <Route exact path="/dashboard/students" component={MainPage} />
          <Route exact path="/dashboard/reports" component={MainPage} />
          <Route exact path="/dashboard/classrooms" component={ClassRoom} />
          <Route exact path="/dashboard/classrooms/add" component={ClassRoomForm} />
          <Route exact path="/dashboard/classrooms/:id/edit" component={ClassRoomForm} />
          <Route exact path="/dashboard/classrooms/:id" component={ClassRoom} />
        </Switch>
      </main>
    </div>
  );
}

export default withAuthConsumer(Dashboard)


const MainPage = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
  <Container maxWidth="lg" className={classes.container}>
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaper}>
          <Chart />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <Deposits />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Orders />
        </Paper>
      </Grid>
    </Grid>
  </Container>
  )
}
