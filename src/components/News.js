import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import handleViewport from "react-in-viewport";

const style = mobile => {};

const NewsPost = ({post}) =>{
  return (
    <div>
   {post.frontmatter.image && <Img
      fluid={post.frontmatter.image.childImageSharp.fluid}
    />
  }
    <h1>title: {post.frontmatter.title}</h1>
    <p>description: {post.frontmatter.description}</p>
    <p>date: {post.frontmatter.date}</p>

    </div>
  )
}

const unNews = ({ newsPosts, inViewport, innerRef, handleInView }) => {
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
      {newsPosts && newsPosts.map(({ node: newsPost }) =>   <NewsPost post={newsPost}/>)}
    </div>
  );
};

const News = handleViewport(
  unNews /** options: {}, config: {} **/
);
export default News;
