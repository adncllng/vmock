import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import handleViewport from "react-in-viewport";

const style = mobile => {};

const newsPostImage = (newsPost) =>{
  return (
    <div>

    </div>
  )
}

const unNews = ({ news, inViewport, innerRef, handleInView }) => {
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
      {newsPosts && newsPosts.map(({ node: newsPost }) => <NewsPostsImage newsPost={newsPost} />)}
    </div>
  );
};

const News = handleViewport(
  unNews /** options: {}, config: {} **/
);
export default News;
