import * as React from "react";
import { CardContainer, Card } from "@components/card";
import { ListItem } from "@components/list-item";
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image";

export function trim(excerpt: string, trimLength = 250) {
    if (excerpt.length <= trimLength) return excerpt;
    return `${excerpt.substring(0, trimLength)}...`;
}

export function renderListItems(nodes: Array<any>, trim = false) {
    return nodes.map((node, i) => {
        const {
            fields: { slug },
            frontmatter: { excerpt, title, date, attachments },
        } = node;
        const image = (
            attachments !== undefined &&
            attachments != null &&
            attachments.length > 0 &&
            attachments[0] != null
        ) ? attachments[0].childImageSharp.gatsbyImageData : null;
        return (<ListItem trim={trim} image={image}
            header={title} superHeader={date} to={slug}>
            <p>{excerpt}</p>
        </ListItem>)
    });
}

export function renderCards(nodes: Array<any>) {
    return nodes.map((node, i) => {
        const {
            fields: { slug },
            frontmatter: { excerpt, title, date, attachments },
        } = node;
        const image = (
            attachments !== undefined &&
            attachments != null &&
            attachments.length > 0 &&
            attachments[0] != null
        ) ? attachments[0].childImageSharp.gatsbyImageData : null;
        return (<Card image={image} superHeader={date}
            header={title} to={slug}>
            <p>{excerpt}</p>
        </Card>)
    });
}