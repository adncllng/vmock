import React from "react";
import { Link } from "gatsby";
import ReactDOM from "react-dom";
import posed, { PoseGroup } from "react-pose";

import AnchorLink from "react-anchor-link-smooth-scroll";

const Item = posed.div({
  inView: {
    rotate: 90, //translateX(20%)",
    originX: "10%",
    y: 10,
    x: 50,
    originY: "0%",
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 150,
      restDelta: 0.5,
      restSpeed: 10
    }
  },
  outView: {
    x: 0,
    y: 0,
    rotate: 0,
    originX: "10%",
    originY: "0%",
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 150,
      restDelta: 0.5,
      restSpeed: 10
    }
  }
});
const PosedDiv = posed.div({
  fixTop: {
     top:-10
  },
  scroll: {
    top:0
  }
});

const style = fixTop => {
  return fixTop ? { position: "fixed" } : { position: "relative" };
};
//{
// position: "sticky",
// top: "0",
// transformOrigin: "top left",
// transform: "rotate(-90deg) translateX(-100%)",
// width: "100vh",
// display: "flex",
// justifyContent: "space-around",
// scrollBehavior: "smooth !important"
//};

const menuItemStyle = inView => {
  return inView
    ? {
        color: "#ff9600"
      }
    : {};
};

const translate = word => {
  const translations = {
    projects: "projets"
  };
  return translations[word];
};
const getLink = (location, destination, locale, inView, title) => {
  const localTitle = locale === "en" ? title : translate(title);
  console.log("Location", location);
  return location === "HOME" ? (
    <AnchorLink
      style={menuItemStyle(inView === "projects")}
      href={`#${destination}`}
    >
      {localTitle}
    </AnchorLink>
  ) : (
    <Link to={locale === "en" ? "/#" + destination : "/fr/#" + destination}>
      {localTitle}
    </Link>
  );
};

const Menu = ({ locale, mobile, location, inView, fixTop }) => {
  return (
    <PosedDiv
      pose={fixTop ? 'fixTop' : 'scroll'}
      style={style(fixTop)}
      className="menu"
    >
      <Item
        style={{ transformOrigin: "top left" }}
        pose={inView === "projects" ? "inView" : "outView"}
      >
        {getLink(location, "projects", locale, inView, "projects")}
      </Item>
      <Link style={{}} to={locale === "en" ? "/about" : "/fr/about"}>
        {locale === "en" ? "about" : "a propos"}
      </Link>
      <Link to={locale === "en" ? "/" : "/fr"}>
        {locale === "en" ? "home" : "chez nous"}
      </Link>
      <Link to={locale === "en" ? "/fr" : "/"}>
        {locale === "en" ? "en" : "fr"}
      </Link>
    </PosedDiv>
  );
};

export default Menu;
