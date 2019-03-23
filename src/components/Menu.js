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
    textShadow: "0px 5px 15.52px rgba(7, 26, 1, 0.1)",
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
    textShadow: "-10px 0px 15.52px rgba(7, 26, 1, 0.1)",
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
    top: -10
  },
  scroll: {
    top: 0
  }
});

const style = fixTop => {
  return fixTop ? { position: "fixed" } : { position: "relative" };
};

const menuItemStyle = inView => {
  return inView
    ? {
        color: "#ff9600"
      }
    : {};
};

const translate = word => {
  const translations = {
    projects: "projets",
    news:"néwz"
  };
  return translations[word];
};
const getLink = (location, destination, locale, inView, title) => {
  const localTitle = locale === "en" ? title : translate(title);
  console.log("Location", location);
  return location === "HOME" ? (
    <AnchorLink
      className="menu-item"
      style={menuItemStyle(inView === destination)}
      href={`#${destination}`}
    >
      {localTitle}
    </AnchorLink>
  ) : (
    <Link
      className="menu-item"
      to={locale === "en" ? "/#" + destination : "/fr/#" + destination}
    >
      {localTitle}
    </Link>
  );
};

const Menu = ({ locale, mobile, location, inView, fixTop }) => {
  return (
    <PosedDiv
      pose={fixTop ? "fixTop" : "scroll"}
      style={style(fixTop)}
      className="menu"
    >
      <Link
        className="menu-item"
        style={{}}
        to={locale === "en" ? "/about" : "/fr/about"}
      >
        {locale === "en" ? "about" : "a propos"}
      </Link>
      <Link className="menu-item" to={locale === "en" ? "/" : "/fr"}>
        {locale === "en" ? "home" : "chez nous"}
      </Link>

      <Item
        style={{ transformOrigin: "top left" }}
        pose={inView === "news" ? "inView" : "outView"}
      >
        {getLink(location, "news", locale, inView, "news")}
      </Item>

      <Item
        style={{ transformOrigin: "top left" }}
        pose={inView === "projects" ? "inView" : "outView"}
      >
        {getLink(location, "projects", locale, inView, "projects")}
      </Item>

      <Item
        style={{ transformOrigin: "top left" }}
        pose={"outView"}
      >
        <Link className="menu-item" to={locale === "en" ? "/fr" : "/"}>
          {locale === "en" ? "en" : "fr"}
        </Link>
      </Item>
    </PosedDiv>
  );
};

export default Menu;
