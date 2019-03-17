import React from "react";
import { Link } from "gatsby";
import ReactDOM from "react-dom";
import {
  Link as ScrollLink,
  DirectLink,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller
} from "react-scroll";

import AnchorLink from 'react-anchor-link-smooth-scroll'

const style = {
  position: "sticky",
  top: "0",
  transformOrigin: "top left",
  transform: "rotate(-90deg) translateX(-100%)",
  width: "100vh",
  display: "flex",
  justifyContent: "space-around",
  scrollBehavior: "smooth !important"
};

const menuItemStyle = inView => {
  return inView
    ? {
        transformOrigin: "top left",
        transform: "rotate(90deg) translateX(20%)"
      }
    : {};
};

const translate = (word) => {
  const translations = {
    projects : 'projets',
  }
  return translations[word];
}
const getLink = ({ location }, destination, locale, inView, title) => {
  const path = location && location.pathname;
  const localTitle = locale === 'en' ? title : translate(title)
  return path === "/" || path === "/fr" ? (
      <AnchorLink style={menuItemStyle(inView === 'projects')} href={`#${destination}`}>{localTitle}</AnchorLink>
  ) : (
    <Link
      to={
        locale === "en" ? "/#" + destination : "/fr/#" + destination
      }
    >
     {localTitle}
    </Link>
  );
};

const Menu = ({ locale, mobile, location, inView, scrolll }) => {
  return (
    <div onClick={scrolll} style={style} className="menu">
      {getLink(location, "projects", locale, inView, 'projects')}
      <Link style={{}} to={locale === "en" ? "/about" : "/fr/about"}>
        {locale === "en" ? "about" : "a propos"}
      </Link>
      <Link to={locale === "en" ? "/" : "/fr"}>
        {locale === "en" ? "home" : "chez nous"}
      </Link>
      <Link to={locale === "en" ? "/fr" : "/"}>
        {locale === "en" ? "en" : "fr"}
      </Link>
    </div>
  );
};

export default Menu;
