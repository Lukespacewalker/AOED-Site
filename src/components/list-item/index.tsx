import * as React from "react";
import { clickable, listItem, listItemImage,enableTrim, articleContainer } from "./list-item.module.scss";
import { navigate } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";

export class ListItem extends React.Component<
  {
    header?: string;
    tagLine?: string;
    to?: string;
    image?: IGatsbyImageData
    imgStyle?: {}
    style?: {}
    trim?:boolean
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
        style={this.props.style}
        className={`${listItem} ${(this.props.to !== undefined ? clickable : "")}`}
        onClick={this.onClickHandler}
      >
        {(this.props.image !== undefined && this.props.image != null) ? (
          <GatsbyImage
            className={listItemImage}
            image={this.props.image}
            imgStyle={this.props.imgStyle}
            alt={this.props.header}
          />
        ) : (
          <></>
        )}
        {this.props.tagLine !== undefined ? <div className="bg-color-gradient text-white rounded inline-block py-1 px-2 text-sm">{this.props.tagLine.toLocaleUpperCase()}</div> : <></>}
        {this.props.header !== undefined ? <h2 className="text-color-primary">{this.props.header}</h2> : <></>}
        <div className={articleContainer}>
          <article className={this.props.trim? enableTrim : ""}>{this.props.children}</article>
        </div>
      </div>
    );
  }
}