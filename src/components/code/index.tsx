import * as React from "react";
import * as PropTypes from "prop-types";
import styles from "./code.module.scss";
import Highlight, {defaultProps, Language} from 'prism-react-renderer';
import Prism from "prism-react-renderer/prism";
import theme from "prism-react-renderer/themes/vsDark";

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
      return (<div className={styles.code}>
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
    <Highlight {...defaultProps} theme={theme}  code={children} language={language}>
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

/*
export class Code extends React.Component<{ children: any , human : boolean}, {}> {
  constructor(props) {
    super(props);
  }

  public static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    const { children } = this.props;
    const isCascadiaCode = this.props.human ? " "+styles.cascadiaCode : "";
    return (
      <div className={styles.code + isCascadiaCode}>
        <pre>{children}</pre>
      </div>
    );
  }

  componentDidMount() {
    var node = ReactDOM.findDOMNode(this);
    //if (node instanceof HTMLElement) {
    const codes = [...node.querySelectorAll<HTMLElement>("code")] as Array<
      HTMLElement
    >;
    codes.forEach(code => {
      let codelines = code.innerHTML.split("\n");
      codelines = codelines.map(line => {
        if (line.substr(0, 2) === ". ") {
          return line = "<b>" + line + "</b>";
        } else if(line.substr(0, 12) === "&gt;&gt;&gt;"){
         
          return "<em>" +line.slice(12)+ "</em>"
        }
        else return line;
      });

      code.innerHTML = codelines.join("\n");
    });
    //}
  }
}

*/