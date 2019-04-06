import React from "react";
import { Link, replace, push } from "gatsby";
import ReactDOM from "react-dom";
import posed, { PoseGroup } from "react-pose";

import AnchorLink from "react-anchor-link-smooth-scroll";
import ContextConsumer from "./Context";

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
    top: 0
  },
  scroll: {
    top: 0
  }
});

const style = fixTop => {
  console.log("fixTop in style()", fixTop);
  if (fixTop === true) {
    return { position: "fixed" };
  }
  if (fixTop === false) {
    return { position: "relative" };
  }
  return { position: "relative", backgroundColor: "red" };
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
    work: "oeuvre",
    news: "nouvelles",
    about: "à propos",
    contact: "contact"
  };
  return translations[word];
};
const getLink = (location, destination, locale, inView, title) => {
  const currentPath = location ? location.pathname : ''
  const localTitle = locale === "en" ? title : translate(title);
  console.log("Location> ?", location, destination, locale, inView, title);

    return (currentPath === "/" ) ||
           (currentPath === "/fr/" ) ? (
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

const Menu = ({mobile, location }) => {
  return (
    <ContextConsumer>
      {({ contextData, set }) => (
        <PosedDiv
          pose={contextData.fixTop ? "fixTop" : "scroll"}
          style={style(contextData.fixTop)}
          className="menu"
        >
          <Link
            className="menu-item"
            to={contextData.locale === "en" ? "/" : "/fr"}
          >
            {contextData.locale === "en" ? "contact" : "me joindre"}
          </Link>
          <Item
            style={{ transformOrigin: "top left" }}
            pose={contextData.inView[contextData.inView.length - 1] === "about" ? "inView" : "outView"}
          >
            {getLink(
              location,
              "about",
              contextData.locale,
              contextData.inView[contextData.inView.length - 1],
              "about"
            )}
          </Item>

          <Item
            style={{ transformOrigin: "top left" }}
            pose={contextData.inView[contextData.inView.length - 1] === "news" ? "inView" : "outView"}
          >
            {getLink(
              location,
              "news",
              contextData.locale,
              contextData.inView[contextData.inView.length - 1],
              "news"
            )}
          </Item>

          <Item
            style={{ transformOrigin: "top left" }}
            pose={
              contextData.inView[contextData.inView.length - 1] === "projects"
                ? "inView"
                : "outView"
            }
          >
            {getLink(
              location,
              "projects",
              contextData.locale,
              contextData.inView[contextData.inView.length - 1],
              "work"
            )}
          </Item>

          <Item style={{ transformOrigin: "top left" }} pose={"outView"}>
            <Link
              onClick={() =>
                set({ locale: contextData.locale === "en" ? "fr" : "en" })
              }
              className="menu-item"
              to={contextData.locale === "en" ? "/fr" : "/"}
            >
              {contextData.locale === "en" ? "en" : "fr"}
            </Link>
          </Item>
        </PosedDiv>
      )}
    </ContextConsumer>
  );
};

export default Menu;
