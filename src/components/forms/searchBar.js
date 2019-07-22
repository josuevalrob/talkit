import React, { Component } from 'react';
// import { queryString } from 'query-string';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AdapterLink from './../misc/LinkTalkit';

class SearchBar extends Component {
  state = {
    searchText: this.props.querySearch.name || '',
    error: true,
    touch: false
  }

  handleChange = (e) => {
    // long version:
    // ---------------------
    // const name = e.target.name
    // const newState = {}
    //
    // newState[name] = e.target.value
    //
    // newState.error = e.target.length <=5
    //
    // this.setState(newState)

    this.setState({
      [e.target.name]: e.target.value,
      error: (e.target.value.length <= 3)
    })
  }

  handleBlur = (e) => {
    this.setState({ touch: true })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.props.onSearch(this.state.searchText)
  }

  componentDidMount() {
    const { searchText } = this.state;
    if (searchText) {
      this.props.onSearch(searchText)
    }
  }

  render() {
    return (
      <React.Fragment>
      <form onSubmit={this.handleSubmit}  >
      <Paper style={{margin:'1em'}} align="center">
          <Grid container spacing={3} align="center">
            <Grid item xs={12} sm={6} align="center">
              <TextField
                required
                id="search"
                name="searchText"
                label="Search ClassRooms"
                fullWidth
                style={{margin:'1em', width:'100%'}}
                onChange={this.handleChange}
                value={this.state.searchText}
              />
            </Grid>
          </Grid>
      </Paper>
      <div className={this.props.classes.heroButtons}>
        <Grid container spacing={2} justify="center">
          <Grid item>
            <Button variant="contained" color="primary" onClick={this.handleSubmit}>
              Main call to action
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="primary" component={AdapterLink} to={'/dashboard/classrooms'}>
              Go to my ClassRooms
            </Button>
          </Grid>
        </Grid>
      </div>
      </form>
    </React.Fragment>
    );
  }
}

export default SearchBar;
