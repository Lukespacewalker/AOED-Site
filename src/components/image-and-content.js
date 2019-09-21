import PropTypes from "prop-types";
import React from "react";
import "./image-and-content.css";

const ImageAndContent = ({ image, children }) => (
    <div className="image-and-content-container">
        <div className="image-container"
            style={{
                backgroundImage: `url(${image})`
            }}
        >
        </div>
        <article className="text-container">{children}</article>
    </div>
);

ImageAndContent.propTypes = {
    children: PropTypes.node.isRequired,
    image: PropTypes.string
};

ImageAndContent.defaultProps = {
    children: ``, image: ``
};

export default ImageAndContent;
