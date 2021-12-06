import * as React from "react";
import { clickable, card, cardContent, cardImage, cardContainer } from "./card.module.scss";
import { navigate } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";

export class Card extends React.Component<
  {
    header?: string;
    superHeader?: string;
    to?: string;
    image?: IGatsbyImageData
    imgStyle?: {}
  },
  {}
> {
  constructor(props) {
    super(props);
  }

  onClickHandler: React.MouseEventHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    if (this.props.to !== undefined) {
      navigate(this.props.to);
    }
  };

  render() {
    return (
      <div
        className={`${card} ${(this.props.to !== undefined ? clickable : "")}`}
        onClick={this.onClickHandler}
      >
        {(this.props.image !== undefined && this.props.image != null) ? (
          <GatsbyImage
            className={cardImage}
            image={this.props.image}
            imgStyle={this.props.imgStyle}
            alt={this.props.header}
          />
        ) : (
          <></>
        )}
        <div className={cardContent}>
          {this.props.superHeader !== undefined ? <div className="bg-color-gradient text-white rounded inline-block py-1 px-2 text-sm">{this.props.superHeader.toLocaleUpperCase()}</div> : <></>}
          {this.props.header !== undefined ? <h2 className="text-color-primary">{this.props.header}</h2> : <></>}
          <article>{this.props.children}</article>
        </div>
      </div>
    );
  }
}

export class CardContainer extends React.Component<
  { horizontal?: boolean },
  {}
> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className={cardContainer}
      >
        {this.props.children}
      </div>
    );
  }
}
