import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import {graphql, push, replace} from "gatsby";
import Img from "gatsby-image";
import Layout from "../components/Layout";

const BlogPost = ({ data, location,  pageContext: { locale } }) => {
  const { markdownRemark: post } = data;
  return (
    <div className="CHIDREN_OF_BLOGPOST">
      <Helmet titleTemplate="%s | Blog">
        <title>{`${post.frontmatter.title}`}</title>
        <meta name="description" content={`${post.frontmatter.description}`} />
      </Helmet>
      <div >
      {post.frontmatter.image && (
        <Img
          fluid={post.frontmatter.image.childImageSharp.fluid}
        />
      )}
        <h1>title: {post.frontmatter.title}</h1>
        <p>description: {post.frontmatter.description}</p>
        <p>date: {post.frontmatter.date}</p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </div>
  );
};



BlogPost.propTypes = {
  description: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        image {
          childImageSharp {
            fluid(maxWidth: 1000, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
