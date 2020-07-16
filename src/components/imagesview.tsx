import * as React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import Img from "gatsby-image";
import styles from "./imagesview.module.scss";

import back_icon from "@images/ui/left-arrow.svg";
import next_icon from "@images/ui/right-arrow.svg";

interface IImageViewProps {
  fluids: Array<any>;
  children: any;
}

enum SwipeDirection {
  Left,
  Right,
}

/* Unable to use StaticQuery in class */
class ImagesView extends React.Component<IImageViewProps, {}> {
  constructor(props) {
    super(props);

    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.goto = this.goto.bind(this);
    this.zoom = this.zoom.bind(this);
    this._onTouchStart = this._onTouchStart.bind(this);
    this._onTouchMove = this._onTouchMove.bind(this);
    this._onTouchEnd = this._onTouchEnd.bind(this);
  }
  _minDistance = 50;

  _swipe = {
    x: 0,
    swiping: false,
  };

  _onTouchStart(e: React.TouchEvent<any>) {
    e.preventDefault();
    e.stopPropagation();
    const touch = e.touches[0];
    this._swipe.x = touch.clientX;
    this.setState({ swiped: false });
  }

  _onTouchMove(e: React.TouchEvent<any>) {
    e.preventDefault();
    e.stopPropagation();
    if (e.changedTouches && e.changedTouches.length) {
      const touch = e.changedTouches[0];
      this._swipe.swiping = true;
    }
  }

  _onTouchEnd(e: React.TouchEvent<any>) {
    e.preventDefault();
    e.stopPropagation();
    const touch = e.changedTouches[0];
    const delta = touch.clientX - this._swipe.x;
    const direction = delta < 0 ? SwipeDirection.Left : SwipeDirection.Right;
    const absX = Math.abs(delta);
    if (this._swipe.swiping && absX > this._minDistance) {
      this.onSwiped(direction);
      this.setState({ swiped: true });
    }
    this._swipe = {
      x: 0,
      swiping: false,
    };
  }

  state = {
    index: 0,
    cover: false,
  };

  prev() {
    const purpose = this.state.index - 1;
    const target = purpose < 0 ? this.props.fluids.length - 1 : purpose;
    this.setState({ index: target });
  }

  next() {
    const purpose = this.state.index + 1;
    const target = purpose == this.props.fluids.length ? 0 : purpose;
    this.setState({ index: target });
  }

  zoom() {
    let newzoom = !this.state.cover;
    this.setState({ cover: newzoom });
  }

  goto(index: number) {
    this.setState({ index: index });
  }

  generateMainImage(fluid: any) {
    return (
      <Img
        style={{ height: "100%" }}
        fluid={fluid}
        alt="main_image"
        imgStyle={{ objectFit: this.state.cover? `cover`:`contain` }}
      />
    );
  }

  generateThumbnailImages(fluids: Array<any>) {
    return fluids.map((item, index) => {
      const selectedStyle = index == this.state.index ? styles.selected : "";
      return (
        <div
          key={index}
          onClick={this.goto.bind(this, index)}
          className={selectedStyle}
        >
          <Img fluid={item} alt="main_image" />
        </div>
      );
    });
  }

  onSwiped(direction: SwipeDirection) {
    direction == SwipeDirection.Left ? this.next() : this.prev();
  }

  render() {
    return (
      <div className={styles.rootGrid}>
        <div
          className={styles.mainArea}
          onTouchStart={this._onTouchStart}
          onTouchMove={this._onTouchMove}
          onTouchEnd={this._onTouchEnd}
        >
          {this.generateMainImage(this.props.fluids[this.state.index])}
          <div className={`${styles.back} ${this.state.cover? styles.cover : styles.contain}`} onClick={this.prev}>
            <svg
              version="1.1"
              viewBox="0 0 129 129"
              enable-background="new 0 0 129 129"
            >
              <g>
                <path
                  d="m88.6,121.3c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-54,53.9c-1.6,1.6-1.6,4.2 0,5.8l54,53.9z"
                />
              </g>
            </svg>
          </div>
          <div className={`${styles.next} ${this.state.cover? styles.cover : styles.contain}`} onClick={this.next}>
            <svg
              version="1.1"
              viewBox="0 0 129 129"
              enable-background="new 0 0 129 129"
            >
              <g>
                <path
                  d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z"
                />
              </g>
            </svg>
          </div>
          <div className={`${styles.zoom} ${this.state.cover? styles.cover : styles.contain}`} onClick={this.zoom}>
          <svg width="60" height="60" viewBox="0 0 18 18"><path style={{fill:`#FFFFFF`}} d="M4.5 11H3v4h4v-1.5H4.5V11zM3 7h1.5V4.5H7V3H3v4zm10.5 6.5H11V15h4v-4h-1.5v2.5zM11 3v1.5h2.5V7H15V3h-4z"/></svg>
          </div>
        </div>
        <div className={styles.imagelistArea}>
          <div className={styles.imagelistWrapper}>
          {this.generateThumbnailImages(this.props.fluids)}
          </div>
        </div>
        {this.props.children != null ? (
          <article className={styles.childrenArea}>
            {this.props.children}
          </article>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default ImagesView;
