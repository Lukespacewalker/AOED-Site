import * as React from "react";
import { clickable, card, cardContent, cardImage, cardContainer } from "./card.module.scss";
import { navigate } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";

export class Card extends React.Component<
  {
    header?: string;
    tagLine?: string;
    to?: string;
    className?: string;
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
    const {children,image,imgStyle, tagLine, header, className, ...other} = this.props
    return (
      <div
        className={`${className} ${card} ${(this.props.to !== undefined ? clickable : "")}`}
        onClick={this.onClickHandler}
        {...other}
      >
        {(image !== undefined && image != null) ? (
          <GatsbyImage
            className={cardImage}
            image={image}
            imgStyle={imgStyle}
            alt={header}
          />
        ) : (
          <></>
        )}
        <div className={cardContent}>
          {tagLine !== undefined ? <div className="tagline">{tagLine.toLocaleUpperCase()}</div> : <></>}
          {header !== undefined ? <h2 className="text-color-primary">{header}</h2> : <></>}
          <article>{children}</article>
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
