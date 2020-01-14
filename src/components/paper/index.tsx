import * as React from "react";
import * as PropTypes from "prop-types";
import { InView } from "react-intersection-observer";

import "./paper.scss";

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

    const classname = `${transparent ? `trans` : ``} ${
      side ? `` : `no-aside`
    }`;
    const containerClassName = `${`article-container`} ${
      wide ? `wide` : ``
    } `;
    const innerContainerClassName = `${`inner-article-container`} ${
      sbs ? `sbs` : ``
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
                (this.hasAlreadyShown || inView ? `show` : `hide`)
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
