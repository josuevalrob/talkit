import React from 'react';
// This function takes a component...
function FetchFormHoc(WrappedComponent, selectData) {
  // ...and returns another component...
  return class extends React.Component { //? can i use hooks? 
    state = {
      data: {}
    };

    componentDidMount() {
      // ... that takes care of the subscription...
      this.handleChange()
    }

    // componentWillUnmount() {
    //   DataSource.removeChangeListener(this.handleChange);
    // }

    handleChange = () => {
      this.setState({
        data: {
          name: 'React', 
          description: 'When CommentListWithSubscription and BlogPostWithSubscription are rendered, CommentList and BlogPost will be passed a data prop with the most current data retrieved from DataSource:',
          price: 20, 
          isPrivate: false, 
          notes: [
            {
              notesTitle: 'HOC: High Order Components', 
              markDown: 'A higher-order component (HOC) is an advanced technique in React for reusing component logic. HOCs are not part of the React API, per se. They are a pattern that emerges from React’s compositional nature.'
            },{
              notesTitle: 'Use HOCs For Cross-Cutting Concerns', 
              markDown: '**Note** We previously recommended mixins as a way to handle cross-cutting concerns. We’ve since realized that mixins create more trouble than they are worth. Read more about why we’ve moved away from mixins and how you can transition your existing components.'
            }
          ]
        }
      });
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}

export default FetchFormHoc