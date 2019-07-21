import React from 'react';
import ClassRoomForm from '../../components/forms/ClassRoomForm'
import useStyles from '../../components/styles/signUp.style'
// * Material design
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import ClassIcon from '@material-ui/icons/Class';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AdapterLink from './../../components/misc/LinkTalkit';
function ClassRoomCRUD(props) {
  const classes = useStyles()

  return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <ClassIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create a ClassRoom. 
          </Typography>
        </div>

        <ClassRoomForm {...props}/>
        
        <Grid container justify="flex-end">
          <Grid item>
            <Link to="/dashboard/classrooms" component={AdapterLink} variant="body2">
              All ClassRooms
            </Link>
          </Grid>
        </Grid>
    </Container>
  );
}

export default ClassRoomCRUD;
