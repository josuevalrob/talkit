import React from 'react';
// This function takes a component...
function FetchFormHoc(WrappedComponent, getData, params) {
  // ...and returns another component...
  return class extends React.Component { //? can i use hooks? 
    state = {
      data: {}
    };

    componentDidMount() {
      const {id, uid} = this.props.match.params
      if ( uid !== 'add' && uid && id) //chapuza
        getData(id, uid)
          .then(data => this.setState({data}))
    }


    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}

export default FetchFormHoc