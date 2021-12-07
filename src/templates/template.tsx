import scrollTo from "@components/scroller";
import * as React from "react";

export interface IAuthor {
  id: number;
  unique: string;
  name: string;
  position: Array<string>;
  avatar: any;
}

export interface TOCItem {
  url: string;
  title: string;
  items: Array<TOCItem> | null;
}

export class H1 extends React.Component<{ useToc: boolean }, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const { useToc, children, ...other } = this.props;
    return (
      <>
        <h1 {...other}>
          {useToc ? (
            <a className="inline-block mr-2" href="#toc" onClick={scrollTo}>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={scrollTo}>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
              </svg>
            </a>
          ) : (
            ""
          )}
          {children}
        </h1></>
    );
  }
}

export class H2 extends React.Component<{ useToc: boolean }, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const { useToc, children, ...other } = this.props;
    return (
      <h2 {...other}>
        {useToc ? (
          <a className="inline-block mr-2" href="#toc" onClick={scrollTo}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={scrollTo}>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
            </svg>
          </a>
        ) : (
          ""
        )}
        {children}
      </h2>
    );
  }
}

export class H3 extends React.Component<{ useToc: boolean }, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const { useToc, children, ...other } = this.props;
    return (
      <h3 {...other}>
        {useToc ? (
          <a className="inline-block mr-2" href="#toc" onClick={scrollTo}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={scrollTo}>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
            </svg>
          </a>
        ) : (
          ""
        )}
        {children}
      </h3>
    );
  }
}

export class H4 extends React.Component<{ useToc: boolean }, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const { useToc, children, ...other } = this.props;
    return (
      <h4 {...other}>
        {useToc ? (
          <a className="inline-block mr-2" href="#toc" onClick={scrollTo}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={scrollTo}>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
            </svg>
          </a>
        ) : (
          ""
        )}
        {children}
      </h4>
    );
  }
}

export class DetailTocItem extends React.Component<
  { title: any; url: string; children: any },
  {}
> {
  private detailRef = React.createRef<HTMLElement>();

  constructor(props) {
    super(props);
  }

  private handleClick(
    mouseEvent: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) {
    mouseEvent.bubbles = false;
    mouseEvent.preventDefault();
    let elem = this.detailRef.current as HTMLDetailsElement;
    console.log(elem.open);
    if (elem.open === true) {
      scrollTo(mouseEvent);
    } else {
      elem.open = true;
    }
  }

  render() {
    const { title, url, children } = this.props;
    return (
      <details ref={this.detailRef}>
        <summary>
          <a href={url} onClick={this.handleClick.bind(this)}>
            {title}
          </a>
        </summary>
        {children}
      </details>
    );
  }
}
