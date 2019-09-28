import React from "react";
import { Link, replace, push } from "gatsby";
import ReactDOM from "react-dom";
import posed, { PoseGroup } from "react-pose";

import AnchorLink from "react-anchor-link-smooth-scroll";
import ContextConsumer from "./Context";

const Item = posed.div({
  inView: {
    rotate: 90,
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
  mobileInView: {
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
        color: "#ff5500"
      }
    : {};
};
const getItemPose = (contextData, thisItemName, mobile) => {
  const currentInView = contextData.inView[contextData.inView.length - 1] ;
  const isThisItemInView = currentInView === thisItemName;
  if ( mobile ) return "outView";
  return isThisItemInView ? "inView" : "outView"
}
const translate = word => {
  ////Joindre l'artiste, À propos, Nouvelles, Oeuvres

  const translations = {
    work: "oeuvres",
    news: "nouvelles",
    about: "à propos",
    contact: "Joindre l'artiste"
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
          {/* <Link
            className="menu-item"
            to={contextData.locale === "en" ? "/" : "/fr"}
          >
            {contextData.locale === "en" ? "contact" : "Joindre l'artiste"}
          </Link> */}
          <Item
            mobile= {true}
            style={{ transformOrigin: "top left" }}
            pose={getItemPose(contextData, 'contact', mobile)}
          >
            {getLink(
              location,
              "contact",
              contextData.locale,
              contextData.inView[contextData.inView.length - 1],
              "contact"
            )}
          </Item>
          <Item
            mobile= {true}
            style={{ transformOrigin: "top left" }}
            pose={getItemPose(contextData, 'about', mobile)}
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
            pose={getItemPose(contextData, "news", mobile)}
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
            pose={getItemPose(contextData, 'projects', mobile)
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
              className="menu-item lang"
              to={contextData.locale === "en" ? "/fr" : "/"}
            >
              {contextData.locale === "en" ? "fr" : "en"}
            </Link>
          </Item>
        </PosedDiv>
      )}
    </ContextConsumer>
  );
};

export default Menu;
