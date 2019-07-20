import React from 'react'
import Typography from '@material-ui/core/Typography';


const ThanksYou = ({title, subtitle}) => (
  <React.Fragment>
    <Typography variant="h5" gutterBottom>
      {title ? title : 'Thank you for your order.'}
    </Typography>
    {subtitle && <Typography variant="subtitle1">{subtitle}</Typography>}
  </React.Fragment>
)

export default ThanksYou