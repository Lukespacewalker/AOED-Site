import * as React from "react";
import * as PropTypes from "prop-types";
import styles from "./paper.module.scss";
import { InView } from "react-intersection-observer";

class Paper extends React.Component<
  {
    wide: any;
    side: any;
    transparent: any;
    sbs: any;
    children: any;
    style: any;
  },
  {}
> {
  constructor(props) {
    super(props);
  }

  public static propTypes = {
    children: PropTypes.node.isRequired
  };

  private hasAlreadyShown = false;

  render() {
    const {
      wide,
      side,
      transparent,
      sbs,
      children,
      style,
      ...othersProps
    } = this.props;

    const classname = `${transparent ? styles.trans : ``} ${
      side ? `` : styles.noAside
    }`;
    const containerClassName = `${styles.articleContainer} ${
      wide ? styles.wide : ``
    } `;
    const innerContainerClassName = `${styles.innerArticleContainer} ${
      sbs ? styles.sbs : ``
    }`;

    return (
      <InView>
        {({ inView, ref, entry }) => {
            this.hasAlreadyShown = inView || this.hasAlreadyShown;
          return (
            <div
              ref={ref}
              className={
                containerClassName +
                " " +
                (this.hasAlreadyShown || inView ? styles.show : styles.hide)
              }
              style={style}
              {...othersProps}
            >
              <div className={innerContainerClassName}>
                {side ? <aside>{side}</aside> : null}
                <article style={style} className={classname}>
                  {children}
                </article>
              </div>
            </div>
          );
        }}
      </InView>
    );
  }
}

export default Paper;
