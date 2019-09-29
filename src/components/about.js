import React from "react";
import GalleryImage from "./GalleryImage";
import handleViewport from "react-in-viewport";

const style = mobile => {};

const unAbout = ({ posts, inViewport, innerRef, handleInView, html }) => {
  const checkedHtml = html && html.length > 4 ? html : null;
  return (
    <div
      ref={innerRef}
      className="about"
      dangerouslySetInnerHTML={{ __html: checkedHtml}}
    />
  );
};

const ViewportAbout = handleViewport(unAbout /** options: {}, config: {} **/);
export default ViewportAbout;
