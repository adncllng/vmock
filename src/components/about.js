import React from "react";
import GalleryImage from "./GalleryImage";
import handleViewport from "react-in-viewport";

const style = mobile => {};

const unAbout = ({ posts, inViewport, innerRef, handleInView, html }) => {
  return (
    <div
      ref={innerRef}
      className="about"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

const ViewportAbout = handleViewport(unAbout /** options: {}, config: {} **/);
export default ViewportAbout;
