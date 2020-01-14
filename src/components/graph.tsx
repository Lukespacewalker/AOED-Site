import * as React from "react";
import JXGBoard from "jsxgraph-react-js";

interface IGraphProp {
  logic: string;
  boundingbox: Array<number>;
}

export default class Graph extends React.Component<IGraphProp, any> {

  state = {
    hasError: false,
    isMounted : false
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error);
  }

  componentDidMount(){
    this.setState({isMounted:true});
  }

  render() {
    if (this.state.isMounted) {
      // You can render any custom fallback UI
      return (
        <JXGBoard
          logic={this.props.logic}
          boardAttributes={{ axis: true, boundingbox: this.props.boundingbox }}
        />
      );
    }

    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h3>Something went wrong.</h3>;
    }
    return ("")
  }
}
