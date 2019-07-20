import React from 'react'
import Typography from '@material-ui/core/Typography';
const PrintTitle = ({title, content}) => ( 
  <React.Fragment>
    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
      {title}
    </Typography>
    <Typography variant="subtitle1"  align="center" color="textSecondary" paragraph>
      {content && content}
    </Typography>
  </React.Fragment>
)

export default PrintTitle