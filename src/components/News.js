import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import handleViewport from "react-in-viewport";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import ContextConsumer from "./Context";

const style = mobile => {};

const NewsPost = ({ post, mobile }) => {
  const y = mobile ? [20, -110] : [100, -100]
  return (
    <ContextConsumer>
      {({ contextData }) => (
        <div className="newsPost">
          <Parallax className="news-parallax" y={y} tagOuter="figure">
            <div
              className="text-container"
              style = {mobile ? {} : {transform: "translateX(100px)"} }
            >
              <h1>{post.frontmatter.title}</h1>
              <p>{post.frontmatter.description}</p>
            </div>
          </Parallax>
          {post.frontmatter.image && (
            <div className="image-container">
              <Img fluid={post.frontmatter.image.childImageSharp.fluid} />
            </div>
          )}
        </div>
      )}
    </ContextConsumer>
  );
};

const unNews = ({ newsPosts, inViewport, innerRef, handleInView, fixTop }) => {
  const sortedPosts = newsPosts && newsPosts.sort(({node: post}, {node:secondPost}) => {
    return new Date(post.frontmatter.date) - new Date(secondPost.frontmatter.date)
  })
  return (
    <div className="news" ref={innerRef}>
      {sortedPosts && sortedPosts.map(({ node: newsPost }, i) => (
              <NewsPost key={i + "ghgh"} post={newsPost} />
            ))
          }
    </div>
  );
};

const News = handleViewport(unNews /** options: {}, config: {} **/);
export default News;
