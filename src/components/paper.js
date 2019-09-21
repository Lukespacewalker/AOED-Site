import React from "react";
import PropTypes from "prop-types";
import styles from "./paper.module.scss";

const Layout = ({ wide, side, transparent, sbs, children, style }) => {
    const classname = `${transparent ? styles.trans : ``} ${side ? `` : styles.noAside }`;
    const containerClassName = `${styles.articleContainer} ${wide ? styles.wide : ``} `;
    const innerContainerClassName = `${styles.innerArticleContainer} ${sbs ? styles.sbs : ``}`;
    return (
        <div className={containerClassName} style={style}>
            <div className={innerContainerClassName}>
                {side ? (<aside>{side}</aside>) : null}
                <article style={style} className={classname}>
                    {children}
                </article>
            </div>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout;
