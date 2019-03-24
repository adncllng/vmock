import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import handleViewport from "react-in-viewport";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
const style = mobile => {};

const NewsPost = ({ post }) => {
  const shouldTransform = typeof window !== "undefined" && window.innerWidth > 1094
  return (
    <div className="newsPost">
      <Parallax className="custom-class" y={[150, -150]} tagOuter="figure">
        <div className="text-container" style={shouldTransform ? {transform: 'translateX(100px)'}:{}}>
          <h1>title: {post.frontmatter.title}</h1>
          <p>description: {post.frontmatter.description}</p>
          <p>date: {post.frontmatter.date}</p>
        </div>
      </Parallax>
      {post.frontmatter.image && (
        <div className="image-container">
          <Img fluid={post.frontmatter.image.childImageSharp.fluid} />
        </div>
      )}
    </div>
  );
};

const unNews = ({ newsPosts, inViewport, innerRef, handleInView }) => {
  return (
    <ParallaxProvider>
      <div className="news" ref={innerRef}>
        {newsPosts &&
          Array(10)
            .fill()
            .map(() =>
              newsPosts.map(({ node: newsPost }) => (
                <NewsPost post={newsPost} />
              ))
            )}
      </div>
    </ParallaxProvider>
  );
};

const News = handleViewport(unNews /** options: {}, config: {} **/);
export default News;
