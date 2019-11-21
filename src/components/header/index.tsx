import * as React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import { IMenu, ISubmenu } from "./Imenu";
import { Menu, SubMenu } from "./menu";
import styles from "./header.module.scss";
import logo from "@images/icon.png";

interface IHeaderMenuProps {
    menus: IMenu[];
    onPaneToggle: (isPaneOpen: boolean) => void
}

/* Unable to use StaticQuery in class */
class HeaderMenu extends React.Component<IHeaderMenuProps, {}>{
    constructor(props) {
        super(props);
    }

    windowResizeHandler() {
        if (window.innerWidth > 800) {
            this.setState({ isPaneOpen: false })
            this.props.onPaneToggle(false);
        }
    }

    componentDidMount() {
        window.addEventListener("resize", this.windowResizeHandler.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.windowResizeHandler.bind(this));
    }

    state = {
        selectedMenu: 0,
        isPaneOpen: false
    }

    onSelectedMenuHandler = (menuId: number) => {
        if (menuId === this.state.selectedMenu) menuId = 0;
        this.setState({
            selectedMenu: menuId
        });
    }

    onClick = () => {
        let isPaneOpen = !this.state.isPaneOpen;
        this.setState({
            isPaneOpen: isPaneOpen
        });

        this.props.onPaneToggle(isPaneOpen);
    }

    render() {
        const { menus } = this.props;
        let className = this.state.isPaneOpen ? styles.show + " " + styles.mainMenu : styles.mainMenu;
        return (<>
            <nav className={className}>
                {menus.map(menu => {
                    const submenu = menu.submenus != null ?
                        <nav className={styles.subMenu + ` ${menu.order === this.state.selectedMenu ? styles.show : styles.hide}`}>
                            <SubMenu isMenuOpen={this.state.isPaneOpen} items={menu.submenus} />
                        </nav> : null;
                    return (
                        <React.Fragment key={menu.order}>
                            <Menu item={menu} onSelectedItem={this.onSelectedMenuHandler} />
                            {submenu}
                        </React.Fragment>
                    )
                })}
            </nav>
            <div id={styles.menuToggle} onClick={this.onClick.bind(this)}>
                <input type="checkbox" checked={this.state.isPaneOpen} />
                <span></span>
                <span></span>
                <span></span>
            </div>
        </>
        );
    }
}

interface IHeaderProps {
    siteTitle: string;
    isFrontPage: boolean;
}

class Header extends React.Component<IHeaderProps, {}>{
    constructor(props) {
        super(props);
    }

    state = {
        isPaneOpen: false
    }

    onPaneToggleHandler = (isPaneOpen) => {
        this.setState({ isPaneOpen: isPaneOpen });
    }

    render() {
        return (<StaticQuery
                    query={graphql`
                query MenuQuery {
                    site {
                        siteMetadata {
                            shortTitle
                            title
                            menus {
                                order
                                name
                                emphasize
                                submenus {
                                    order
                                    name
                                    link
                                    }
                            }
                        }
                    }
                }
            `}

                    render={data => {
                const { isFrontPage ,...others} = this.props;
                const { site: { siteMetadata: { title, shortTitle, menus } } }: { site: { siteMetadata: { title: string; shortTitle: string; menus: IMenu[] } } } = data;

                let headerClassname = `${styles.siteHeader} ${isFrontPage ? styles.frontPage : ""} ${this.state.isPaneOpen ? styles.showingNav : ""}`;

                return (
                    <div className={styles.headerContainer} {...others}>
                        <header className={headerClassname}>
                            <div className={styles.titleContainer}>
                                <div className={styles.logo}>
                                    <Link to="/"><img src={logo} style={{ width: `100px` }} /></Link>
                                    <div>
                                        <h1 lang="en"><Link to="/">{shortTitle}</Link></h1>
                                        <h2><Link to="/">สมาคมโรคจากการประกอบอาชีพ<br />และสิ่งแวดล้อมแห่งประเทศไทย</Link></h2>
                                    </div>
                                </div>
                            </div>
                            <HeaderMenu menus={menus} onPaneToggle={this.onPaneToggleHandler} />
                        </header>
                    </div>
                )
            }
            }/>)
    }

}

export default Header;