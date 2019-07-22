import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import AdapterLink from './LinkTalkit';

const Actions = (props) => (
  <React.Fragment>
  {props.isStudent() 
    &&  <Button size="small" color="primary">
          Enjoy
        </Button>}
  <Tooltip title="CheckWhat is going on" placement="top">
    <Button component={AdapterLink} to={props.editLink} size="small">Review</Button>
  </Tooltip>
  { props.isOwner(props.e) 
    &&  <Button size="small" component={AdapterLink} color="primary" 
          to={props.enlace}>
          Edit
        </Button>}
  { props.isOwner(props.e) && props.handleDelete
    &&  <Button size="small" color="secondary" 
          onClick={()=>props.handleDelete(props.id)} >
          Delete
        </Button>}
  </React.Fragment>
)
export default Actions