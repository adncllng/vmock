import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import GalleryImage from "./GalleryImage";
import handleViewport from "react-in-viewport";

const style = mobile => {};

const unGallery = ({ posts, inViewport, innerRef, handleInView }) => {
 const sortedPosts = posts && posts.sort(({node: post}, {node:secondPost}) => {
    return new Date(post.frontmatter.date) - new Date(secondPost.frontmatter.date)
  })
  return (
    <div
      ref={innerRef}
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-end",
        overflow: "hidden"
      }}
    >
      {sortedPosts && sortedPosts.map(({ node: post }) => <GalleryImage post={post} />)}
    </div>
  );
};

const ViewportGallery = handleViewport(
  unGallery /** options: {}, config: {} **/
);
export default ViewportGallery;
