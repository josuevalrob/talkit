
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  progress: {
    margin: theme.spacing(2),
  },
  typo:{display:'flex', justifyContent:'space-between', margin:'0 0.5em'},
  center: {
    width: '80%',
    marginRight: '10%',
    marginLeft: '10%',
    textAlign: 'center'
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
}));

export default useStyles