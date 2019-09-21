export interface IMenu {
    order: number,
    name: string,
    link: string,
    emphasize: boolean,
    submenus: ISubmenu[]
}

export interface ISubmenu {
    order: number,
    name: string,
    emphasize: boolean,
    link: string
}