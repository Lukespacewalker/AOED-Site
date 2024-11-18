import * as React from "react";
import * as PropTypes from "prop-types";
import {code} from "./code.module.scss";
import { Highlight, Prism, Language, themes} from "prism-react-renderer";

(typeof global !== "undefined" ? global : window as any).Prism = Prism;

Prism.languages["stata-out"] = {
  'function' : {
    pattern: /(\.\s*\S+\s*.*\,).*:(\s*\S*)|(\. \S+)/g
  },
	'number': /-?\d+\.?\d*(?:e[+-]?\d+)?/i,
};

export class Pre extends React.Component<{children:any},{}>{
  constructor(props) {
    super(props);
  }

  public static propTypes = {
    children: PropTypes.node.isRequired
  };

  render(){
    const { children } = this.props.children.props; // Because Pre Element from MDX is nested like this
    let className = this.props.children.props.className || "";
    if(className===""){
      // Just a pre-formatted text
      return (<div className={code}>
        <pre>{children}</pre>
      </div>)
    }else{
      let language = className.replace(/language-/, '') as Language;
      return(
      <Code2 language={language}>
        {children}
      </Code2>
      )
    }
  }
}

class Code2 extends React.Component<{children:any, language:Language},{}>{
  constructor(props) {
    super(props);
  }

  public static propTypes = {
    children: PropTypes.node.isRequired
  };

  render(){
    const { children, language } = this.props;
    return(
    <Highlight theme={themes.vsDark}  code={children} language={language}>
      {({className, style, tokens, getLineProps, getTokenProps}) => (
        <pre className={className} style={{...style, padding: '20px'}}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({line, key: i})}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({token, key})} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
    )
  }

}