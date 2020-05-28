import * as React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import Img from "gatsby-image";
import styles from "./imagesview.module.scss";

import back_icon from "@images/ui/left-arrow.svg";
import next_icon from "@images/ui/right-arrow.svg";

interface IImageViewProps {
    fluids: Array<any>
    children: any;
}

enum SwipeDirection {
	Left, Right
}

/* Unable to use StaticQuery in class */
class ImagesView extends React.Component<IImageViewProps, {}>{
    constructor(props) {
        super(props);

        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
        this.goto = this.goto.bind(this);
        this._onTouchStart = this._onTouchStart.bind(this);
        this._onTouchMove = this._onTouchMove.bind(this);
        this._onTouchEnd = this._onTouchEnd.bind(this);
    }
    _minDistance = 50;

    _swipe = {
        x: 0,
        swiping: false
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
            swiping: false
        };;
    }


    state = {
        index: 0,
        cover: false,
    }

    prev() {
        const purpose = this.state.index - 1;
        const target = purpose < 0 ? this.props.fluids.length - 1 : purpose; 
        this.setState({ index: target })
    }

    next() {
        const purpose = this.state.index + 1;
        const target = purpose == this.props.fluids.length ? 0 : purpose;
        this.setState({ index: target })
    }

    goto(index: number) {
        this.setState({ index: index })
    }

    generateMainImage(fluid: any) {
        return (<Img style={{height:"100%"}} fluid={fluid} alt="main_image" />);
    }

    generateThumbnailImages(fluids: Array<any>) {
        return fluids.map((item, index) => {
            const selectedStyle = index == this.state.index ? styles.selected : "";
            return (
                <div key={index} onClick={this.goto.bind(this, index)} className={selectedStyle}>
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
                <div className={styles.mainArea} onTouchStart={this._onTouchStart} onTouchMove={this._onTouchMove} onTouchEnd={this._onTouchEnd} >
                    {this.generateMainImage(this.props.fluids[this.state.index])}
                    <div className={styles.back} onClick={this.prev}>
                        <img src={back_icon}/>
                    </div>
                    <div className={styles.next} onClick={this.next}>
                        <img src={next_icon} />
                    </div>
                </div>
                <div className={styles.imagelistArea}>
                    {this.generateThumbnailImages(this.props.fluids)}
                </div>
                <article className={styles.childrenArea} >
                    {this.props.children}
                </article>
            </div>
        )
    }

}

export default ImagesView;