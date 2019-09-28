import React from "react";
import GalleryImage from "./GalleryImage";
import handleViewport from "react-in-viewport";

const style = mobile => {};
const unContact = ({ posts, inViewport, innerRef, handleInView, html }) => {
    const path =
  (typeof window !== "undefined" && window.location && window.location.pathname) ||
  "";
  const isEnglish = path.indexOf("fr") < 0;
  return (
    <div
      ref={innerRef}
      id="contact-container"
    >
        <div id="contact-info">
            <h2>{isEnglish ? "Email the artist:" : "Envoyez un courriel à l'artiste:"}</h2>
            <a href="mailto:veronica.florence.mockler@gmail.com">veronica.florence.mockler@gmail.com</a>
            <h2>{isEnglish ? "Follow what she's up to:" : "Suivez son travail:"}</h2>
            <a href="https://www.instagram.com/veronica_rockler" target="_blank">Instagram</a>
        </div>
        <img id="contact-image" src={require("../../static/img/13925043_1266555963385118_5536467185885016532_n.jpg")}/>

    </div>
  );
};

const ViewportContact = handleViewport(unContact /** options: {}, config: {} **/);
export default ViewportContact;