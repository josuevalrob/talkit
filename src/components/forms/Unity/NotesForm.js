import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import 'react-mde/lib/styles/css/react-mde-all.css';
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import * as Showdown from "showdown";
import Button from '@material-ui/core/Button';

const NotesForm = ({data, handler}) => {   
  const [value, setValue] = React.useState("**Hello world!!!**");
  const [selectedTab, setSelectedTab] = React.useState("write");
  const {body, errors} = data;

  const handleChange = (v) => {
    setValue(v)
    handler('markDown')({target: {value : v}})
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Note {body.notesTitle && `: ${body.notesTitle}`}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField required id="notesTitle" label="Note Title" fullWidth 
            onChange={handler('notesTitle')}
            value={body.notesTitle}
            error={errors.notesTitle ? true : false }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ReactMde
            value={value}
            onChange={handleChange}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={markdown =>
              Promise.resolve(converter.makeHtml(markdown))
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="secondary" >
            Add more Notes
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
// * ReactMde
const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

export default NotesForm;