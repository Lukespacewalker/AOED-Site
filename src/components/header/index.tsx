import * as React from "react";
import { useStaticQuery, StaticQuery, graphql, Link } from "gatsby";
import { IMenu, ISubmenu } from "./Imenu";
import { Menu, SubMenu } from "./menu";
import { show, hide, mainMenu, subMenu, menuToggle, dark as darkStyle, siteHeader, showingNav, headerContainer, titleContainer, notTop, logo } from "./header.module.scss";
import { scrollToTop } from "@components/scroller";

interface IHeaderMenuProps {
  menus: IMenu[];
  dark: boolean;
  onPaneToggle: (isPaneOpen: boolean) => void;
}

const HeaderMenu: React.FC<IHeaderMenuProps> = ({ menus, dark, onPaneToggle }) => {
  const [selectedMenu, setSelectedMenu] = React.useState(0);
  const [isPaneOpen, setIsPaneOpen] = React.useState(false);

  React.useEffect(() => {
    const windowResizeHandler = () => {
      if (window.innerWidth > 800) {
        setIsPaneOpen(false);
        onPaneToggle(false);
      }
    };
    window.addEventListener("resize", windowResizeHandler);
    return () => {
      window.removeEventListener("resize", windowResizeHandler);
    };
  }, [onPaneToggle]);

  const onSelectedMenuHandler = (menuId: number) => {
    setSelectedMenu(menuId === selectedMenu ? 0 : menuId);
  };

  const onClick = () => {
    const nextPaneOpen = !isPaneOpen;
    setIsPaneOpen(nextPaneOpen);
    onPaneToggle(nextPaneOpen);
  };

  let className = isPaneOpen ? show + " " + mainMenu : mainMenu;

  return (
    <>
      <nav className={className}>
        {menus.map((menu) => {
          const submenu =
            menu.submenus != null ? (
              <nav
                className={
                  subMenu +
                  ` ${menu.order === selectedMenu ? show : hide}`
                }
              >
                <SubMenu
                  isMenuOpen={isPaneOpen}
                  items={menu.submenus}
                />
              </nav>
            ) : null;
          return (
            <React.Fragment key={menu.order}>
              <Menu
                dark={dark}
                item={menu}
                onSelectedItem={onSelectedMenuHandler}
              />
              {submenu}
            </React.Fragment>
          );
        })}
      </nav>
      <div
        id={menuToggle}
        className={dark ? darkStyle : ""}
        onClick={onClick}
      >
        <input type="checkbox" checked={isPaneOpen} readOnly />
        <span></span>
        <span></span>
        <span></span>
      </div>
    </>
  );
};

interface IHeaderProps {
  isFrontPage: boolean;
}

const Header: React.FC<IHeaderProps> = ({ isFrontPage }) => {
  const data = useStaticQuery(graphql`
    query MenuQuery {
      site {
        siteMetadata {
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
  `);

  const [isPaneOpen, setIsPaneOpen] = React.useState(false);
  const [isOnTop, setIsOnTop] = React.useState(true);

  const onPaneToggleHandler = (open: boolean) => {
    setIsPaneOpen(open);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setIsOnTop(window.scrollY <= 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const {
    site: {
      siteMetadata: { menus },
    },
  }: {
    site: {
      siteMetadata: {
        menus: IMenu[];
      };
    };
  } = data;

  let headerClassname = `${siteHeader} ${isFrontPage ? "" : ""} ${isPaneOpen ? showingNav : ""}`;
  let isDark = true || isPaneOpen || isFrontPage || !isOnTop;

  return (
    <div className={headerContainer + " " + (isOnTop ? "" : notTop)}>
      <header className={headerClassname}>
        <div className={titleContainer}>
          <div className={logo}>
            {isFrontPage ? (
              <a onClick={scrollToTop}></a>
            ) : (
              <Link to="/"></Link>
            )}
          </div>
        </div>
        <HeaderMenu menus={menus} dark={isDark} onPaneToggle={onPaneToggleHandler} />
      </header>
    </div>
  );
};

export default Header;
