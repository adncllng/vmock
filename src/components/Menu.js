import React from "react";
import { Link } from "gatsby";
import ReactDOM from "react-dom";
import {Link as ScrollLink, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

const style = {
  position: "sticky",
  top: "0",
  transformOrigin: "top left",
  transform: "rotate(-90deg) translateX(-100%)",
  width: "100vh",
  display: "flex",
  justifyContent: "space-around"
};

const menuItemStyle = inView => {
  return inView
    ? {
        transformOrigin: "top left",
        transform: "rotate(90deg) translateX(20%)"
      }
    : {};
};
const getLink = ({location}, destination, locale, inView) => {
  const path = location && location.pathname;
  console.log(location, path)
  return path === '/'  || path === '/fr' ?
  <a   style={menuItemStyle(inView === "GALLERY")} className='a' href={destination}> Go to section 2 </a> :
  <Link    style={menuItemStyle(inView === "GALLERY")} className='L' to={'/'+destination}> Link to section 2 </Link>
}

const Menu = ({ locale, mobile, location, inView }) => {
  console.log("location from menu ",location)
  return (
    <div style={style} className="menu">
    <Link to="#SERIOUSLY">seriously</Link>
    <ScrollLink
      activeClass="active"
      className="te1"
      to="/test1"
      spy={true}
      offset={-200}
      smooth={true}
      duration={500}
    >
      Test 1
    </ScrollLink>
      {getLink(location, '#section2', locale, inView)}
      <Link style={{}} to={locale === "en" ? "/about" : "/fr/about"}>
        <p>{locale === "en" ? "about" : "a propos"}</p>
      </Link>
      <Link to={locale === "en" ? "/" : "/fr"}>
        <p>{locale === "en" ? "home" : "chez nous"}</p>
      </Link>
      <Link
        style={menuItemStyle(inView === "GALLERY")}
        to={locale === "en" ? "/#projects" : "/fr/#projects"}
      >
        {locale === "en" ? "#PROJECTS" : "#PROJECTS"}
      </Link>
      <Link to={locale === "en" ? "/fr" : "/"}>
        <p>{locale === "en" ? "en" : "fr"}</p>
      </Link>
    </div>
  );
};

export default Menu;
