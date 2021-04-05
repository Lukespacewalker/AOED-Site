import * as React from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import { IMenu, ISubmenu } from "./Imenu";
import { Menu, SubMenu } from "./menu";
import {show,hide,mainMenu,subMenu,menuToggle,dark as darkStyle,siteHeader,showingNav,headerContainer,titleContainer,notTop,logo} from "./header.module.scss";
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
      ? show + " " + mainMenu
      : mainMenu;
    return (
      <>
        <nav className={className}>
          {menus.map((menu) => {
            const submenu =
              menu.submenus != null ? (
                <nav
                  className={
                    subMenu +
                    ` ${
                      menu.order === this.state.selectedMenu
                        ? show
                        : hide
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
          id={menuToggle}
          className={dark ? darkStyle : ""}
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

          let headerClassname = `${siteHeader} ${
            isFrontPage ? "" : ""
          } ${this.state.isPaneOpen ? showingNav : ""}`;
          let isDark =
            true || this.state.isPaneOpen || isFrontPage || !this.state.isOnTop;
          return (
            <div
              className={
                headerContainer +
                " " +
                (this.state.isOnTop ? "" : notTop)
              }
            >
              <header className={headerClassname}>
                <div className={titleContainer}>
                  <div className={logo}>
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
