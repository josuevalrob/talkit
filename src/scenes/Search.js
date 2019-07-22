import React from 'react';
import AppBar from '@material-ui/core/AppBar';
// import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Navbar from './../components/misc/Navbar'
import SearchBar from './../components/forms/searchBar'
import queryString from 'query-string';
import { withAuthConsumer } from '../contexts/AuthStore';
import ClassRoomService from './../services/ClassRoomServices'
// import UnityService from './../services/UnityServices'
import Actions from '../components/misc/Actions'
function Search(props) {
  const classes = useStyles();
  const [cards, setCards] = React.useState([])

  const fetchData = async () => {
      const response = await ClassRoomService.allClass() //*filtramos data por el usuario actual
      setCards(response) // [...]    
  }

  React.useEffect(() => { fetchData() }, [])

  const handleSearchEpisodes = (text) => {
    const newCard = cards.filter(e => e.name.toLowerCase().includes(text.toLowerCase()))
    setCards(newCard)
  }

  const querySearch = queryString.parse(props.location.search)
  
  const isOwner = classRoom => classRoom.owner === props.user.data.id ? true : false
  const {id} = props.match.params

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Navbar title={`Welcome ${props.user.data.name}`} isTeacher={()=>props.isTeacher}/>
      </AppBar>
      <main>
        {/* Hero unit */}

        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Looking for a new Classroom
            </Typography>
            <SearchBar onSearch={handleSearchEpisodes} querySearch={querySearch} classes={classes} />

            
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card, i) => {
              let unityId = card.classRoom ? `unity/${card.id}/` : '';
              let enlace = `/dashboard/classrooms/${!id ? card.id : id}/${unityId}edit`
              return (
                <Grid item key={i} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image="https://source.unsplash.com/random"
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.name}
                      </Typography>
                      <Typography>
                        {card.description.substring(0, 140)}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Actions e={card} isStudent={props.isStudent} isOwner={isOwner} id={card.id} enlace={enlace} />
                    </CardActions>
                  </Card>
                </Grid>
            )})}
          </Grid>
        </Container>
      </main>

    </React.Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default withAuthConsumer(Search)