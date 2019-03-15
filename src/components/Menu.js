import React from "react";
import { Link } from "gatsby";
import ReactDOM from "react-dom";
const style = {
  position: 'sticky;',
  top: '0;',
  transformOrigin: 'top left;',
  transform: 'rotate(-90deg) translateX(-100%);',
  width: '100vh;',
  display: 'flex;',
  justifyContent: 'space-around;',
}

const Menu = ({ locale, mobile, location, inView}) => {
  return (
    <div style={{style}} className="menu">
      <Link style={{color: inView === 'GALLERY' ? 'red': 'green'}} to={locale === "en" ? "/about" : "/fr/about"}>
        <p>{locale === "en" ? "about" : "a propos"}</p>
      </Link>
      <Link to={locale === "en" ? "/" : "/fr"}>
        <p>{locale === "en" ? "home" : "chez nous"}</p>
      </Link>
      <Link style={{color: inView === 'GALLERY' ? 'red': 'green'}} to={locale === "en" ? "/fr" : "/"}>
        <p>{locale === "en" ? "fr" : "en"}</p>
      </Link>
    </div>
  );
};

export default Menu;
