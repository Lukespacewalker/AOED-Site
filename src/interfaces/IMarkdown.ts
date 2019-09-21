export interface IMarkdown {
    node: {
        frontmatter: {
            title: string,
            tag: string,
            attachments: Array<{
                publicURL: string
            }>
        },
        html: any
    }
}