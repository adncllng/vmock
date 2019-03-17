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
const getLink = ({ location }, destination, locale, inView) => {
  const path = location && location.pathname;
  console.log(location,"PATH", path);
  return (path === "/" )|| (path === "/fr" )?(
    <ScrollLink
      style={menuItemStyle(inView === "GALLERY")}
      activeClass="active"
      className="scrollLink"
      to={destination}
      offset={-250}
      smooth={true}
      duration={500}
    >
        {locale === "en" ? "projects" : "projets"}
    </ScrollLink>
  ) : (
    <Link
      className="L"
      to={locale === "en" ? "/#" + destination +'s' : "/fr/#" + destination+'s'}
    >
        {locale === "en" ? "projects" : "projets"}
    </Link>
  );
};

const Menu = ({ locale, mobile, location, inView }) => {
  console.log("location from menu ", location);
  console.log("LNKN/", Link);
  console.log("LOCALE",locale)
  return (
    <div style={style} className="menu">
      {getLink(location, "project", locale, inView)}
      <Link style={{}} to={locale === "en" ? "/about" : "/fr/about"}>
        <p>{locale === "en" ? "about" : "a propos"}</p>
      </Link>
      <Link to={locale === "en" ? "/" : "/fr"}>
        <p>{locale === "en" ? "home" : "chez nous"}</p>
      </Link>
      <Link to={locale === "en" ? "/fr" : "/"}>
        <p>{locale === "en" ? "en" : "fr"}</p>
      </Link>
    </div>
  );
};

export default Menu;
