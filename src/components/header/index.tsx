import * as React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import { IMenu, ISubmenu } from "./Imenu";
import { Menu, SubMenu } from "./menu";
import styles from "./header.module.scss";
import logo_dark from "@images/logo_dark.png";
import logo_light from "@images/logo_light.png";
import { scrollToTop } from "@components/scroller";

interface IHeaderMenuProps {
  menus: IMenu[];
  dark: boolean;
  onPaneToggle: (isPaneOpen: boolean) => void;
}

/* Unable to use StaticQuery in class */
class HeaderMenu extends React.Component<IHeaderMenuProps, {}> {
  constructor(props) {
    super(props);
  }

  windowResizeHandler() {
    if (window.innerWidth > 800) {
      this.setState({ isPaneOpen: false });
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
    isPaneOpen: false,
  };

  onSelectedMenuHandler = (menuId: number) => {
    if (menuId === this.state.selectedMenu) menuId = 0;
    this.setState({
      selectedMenu: menuId,
    });
  };

  onClick = () => {
    let isPaneOpen = !this.state.isPaneOpen;
    this.setState({
      isPaneOpen: isPaneOpen,
    });

    this.props.onPaneToggle(isPaneOpen);
  };

  render() {
    const { menus, dark } = this.props;
    let className = this.state.isPaneOpen
      ? styles.show + " " + styles.mainMenu
      : styles.mainMenu;
    return (
      <>
        <nav className={className}>
          {menus.map((menu) => {
            const submenu =
              menu.submenus != null ? (
                <nav
                  className={
                    styles.subMenu +
                    ` ${
                      menu.order === this.state.selectedMenu
                        ? styles.show
                        : styles.hide
                    }`
                  }
                >
                  <SubMenu
                    isMenuOpen={this.state.isPaneOpen}
                    items={menu.submenus}
                  />
                </nav>
              ) : null;
            return (
              <React.Fragment key={menu.order}>
                <Menu
                  dark={dark}
                  item={menu}
                  onSelectedItem={this.onSelectedMenuHandler}
                />
                {submenu}
              </React.Fragment>
            );
          })}
        </nav>
        <div
          id={styles.menuToggle}
          className={dark ? styles.dark : ""}
          onClick={this.onClick.bind(this)}
        >
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

class Header extends React.Component<IHeaderProps, {}> {
  constructor(props) {
    super(props);
  }

  state = {
    isPaneOpen: false,
    isOnTop: true,
  };

  onPaneToggleHandler = (isPaneOpen) => {
    this.setState({ isPaneOpen: isPaneOpen });
  };

  handleScroll(event: any) {
    if (window.scrollY > 10) {
      this.setState({ isOnTop: false });
    } else {
      this.setState({ isOnTop: true });
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll.bind(this));
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query MenuQuery {
            site {
              siteMetadata {
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
        render={(data) => {
          const { isFrontPage } = this.props;
          const {
            site: {
              siteMetadata: { title, shortTitle, menus },
            },
          }: {
            site: {
              siteMetadata: {
                title: string;
                shortTitle: string;
                menus: IMenu[];
              };
            };
          } = data;

          let headerClassname = `${styles.siteHeader} ${
            isFrontPage ? styles.frontPage : ""
          } ${this.state.isPaneOpen ? styles.showingNav : ""}`;
          let isDark =
            true || this.state.isPaneOpen || isFrontPage || !this.state.isOnTop;
          return (
            <div
              className={
                styles.headerContainer +
                " " +
                (this.state.isOnTop ? "" : styles.notTop)
              }
            >
              <header className={headerClassname}>
                <div className={styles.titleContainer}>
                  <div className={styles.logo}>
                    {isFrontPage ? (
                      <a onClick={scrollToTop}>
                      </a>
                    ) : (
                      <Link to="/">
                      </Link>
                    )}
                  </div>
                </div>
                <HeaderMenu
                  menus={menus}
                  dark={isDark}
                  onPaneToggle={this.onPaneToggleHandler}
                />
              </header>
            </div>
          );
        }}
      />
    );
  }
}

export default Header;
