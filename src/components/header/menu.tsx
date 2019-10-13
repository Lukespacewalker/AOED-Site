import * as React from "react";
import { Link } from "gatsby";
import { IMenu, ISubmenu } from "./Imenu";
import styles from "./menu.module.scss";

interface IMenuProps {
    item: IMenu,
    onSelectedItem: (menuId: number) => void
}

interface ISubmenuProps {
    isMenuOpen: boolean,
    items: ISubmenu[],
}

export class Menu extends React.Component<IMenuProps, {}> {
    constructor(props) {
        super(props);
    }

    renderMenu(menu: IMenu) {
        const { onSelectedItem } = this.props;
        if (menu.link != null) {
            if (menu.link.substr(0, 5) === "http") {
                return (<a className={styles.main+" "+ (menu.emphasize ? styles.emphasize : styles.normal)} key={menu.order} href={menu.link}>{menu.name}</a>)
            } else {
                return (<Link activeClassName={styles.linkActive} className={styles.main + " " + (menu.emphasize ? styles.emphasize : styles.normal)} key={menu.order} to={`/${menu.link}`}>{menu.name}</Link>)
            }
        } else {
            return (<a className={styles.main + " "+ (menu.emphasize ? styles.emphasize : styles.normal)} key={menu.order} onClick={onSelectedItem.bind(this, menu.order)}>{menu.name} +</a>)
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

    renderMenu(menu: ISubmenu) {
        if (menu.link != null) {
            if (menu.link.substr(0, 4) === "http") {
                return (<a className={menu.emphasize ? styles.emphasize : styles.normal} key={menu.order} href={menu.link}>{menu.name}</a>)
            } else {
                return (<Link activeClassName={styles.subLinkActive} className={menu.emphasize ? styles.emphasize : styles.normal} key={menu.order} to={`/${menu.link}`}>{menu.name}</Link>)
            }
        } else {

        }
    }

    render() {
        const { items, isMenuOpen } = this.props;
        if (items === undefined || items == null) return null;
        return (
            <>
                {items.map(menu => this.renderMenu(menu))}
            </>
        );
    }
}
