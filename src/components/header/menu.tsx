import * as React from "react";
import { Link } from "gatsby";
import { IMenu, ISubmenu } from "./Imenu";
import {main,emphasize,normal,linkActive} from "./menu.module.scss";

interface IMenuProps {
    item: IMenu,
    dark: boolean,
    onSelectedItem: (menuId: number) => void
}

interface ISubmenuProps {
    isMenuOpen: boolean,
    items: ISubmenu[],
}
let darkStyle="";
let subLinkActive="";

export class Menu extends React.Component<IMenuProps, {}> {
    constructor(props) {
        super(props);
    }

    renderMenu(menu: IMenu) {
        const { onSelectedItem, dark } = this.props;
        if (menu.link != null) {
            if (menu.link.substr(0, 5) === "http") {
                return (<a className={(dark?darkStyle:"")+" "+main+" "+ (menu.emphasize ? emphasize : normal)} key={menu.order} href={menu.link}>{menu.name}</a>)
            } else {
                return (<Link activeClassName={linkActive} className={(dark?darkStyle:"")+" "+main + " " + (menu.emphasize ? emphasize : normal)} key={menu.order} to={`/${menu.link}`}>{menu.name}</Link>)
            }
        } else {
            return (<a className={(dark?darkStyle:"")+" "+main + " "+ (menu.emphasize ? emphasize : normal)} key={menu.order} onClick={onSelectedItem.bind(this, menu.order)}>{menu.name} +</a>)
        }
    }

    render() {
        const { item } = this.props;
        return (
            this.renderMenu(item)
        );
    }
}

export class SubMenu extends React.Component<ISubmenuProps, {}> {
    constructor(props) {
        super(props);
    }

    renderMenu(menu: ISubmenu,mainmenuIndex: number) {
        if (menu.link != null) {
            //const seed = Math.trunc(Math.random() * 100);
            if (menu.link.substr(0, 4) === "http") {
                return (<a className={menu.emphasize ? emphasize : normal} key={mainmenuIndex+menu.order} href={menu.link}>{menu.name}</a>)
            } else {
                return (<Link activeClassName={subLinkActive} className={menu.emphasize ? emphasize : normal} key={mainmenuIndex+menu.order} to={`/${menu.link}`}>{menu.name}</Link>)
            }
        } else {

        }
    }

    render() {
        const { items, isMenuOpen } = this.props;
        if (items === undefined || items == null) return null;
        return (
            <>
                {items.map((menu,index) => this.renderMenu(menu,index))}
            </>
        );
    }
}
