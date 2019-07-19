import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { withAuthConsumer } from './../../../contexts/AuthStore';
import removeMd from 'remove-markdown';

const Review = ({data, user}) => {
  const classes = useStyles();
  const {body} = data;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        New Unity Summary
      </Typography>
      <List disablePadding>
        {body.notes.map(note => (
          <ListItem className={classes.listItem}>
            <ListItemText primary={note.notesTitle} className={classes.total} />
            <Typography variant="subtitle2">
              {note.markDown && removeMd(note.markDown.substring(0, 140))}
            </Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          {body.price && <Price total={classes.total}  price={body.price} />}
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Owner:
            <Avatar alt={user.data.name} src={user.data.avatarURL} className={classes.bigAvatar} />
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography gutterBottom><b>{user.data.role}:</b></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{user.data.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom><b>{body.price ? `Price:` : 'Free Unity'}</b></Typography>
            </Grid>
            { body.price && 
              <Grid item xs={6}>
                <Typography gutterBottom>{body.price + '€'}</Typography>
              </Grid>}
          </Grid>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Unity Details
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography gutterBottom>{body.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{body.description}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const Price = ({price, total}) => (
  <React.Fragment>
    <ListItemText primary="Total" />
    <Typography variant="subtitle1" className={total}>
      {price}€
    </Typography>
  </React.Fragment>
)

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between'
  },
  bigAvatar: {
    marginLeft: 10,
    // width: 60,
    // height: 60,
  },
}));


export default withAuthConsumer(Review)