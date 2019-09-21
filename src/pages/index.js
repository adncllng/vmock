import React from "react";
import {graphql } from "gatsby";
import PropTypes from "prop-types";
import OtherIndex from '../components/OtherIndex';

const IndexPage = ({ pageContext: { locale }, ...props }) => {
  const { node: data } = props.data.homePageData.edges[0];
  const { edges: posts } = props.data.blogPosts;
    const { edges: newsPosts } = props.data.newsPosts;
  return (
    <OtherIndex location={props.location} data={data} locale={locale} newsPosts={newsPosts} posts={posts}/>
  );
};

export default IndexPage;

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  }),
  posts: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export const pageQuery = graphql`
  query HomeContent($locale: String) {
    homePageData: allMarkdownRemark(
      filter: {
        frontmatter: { pageKey: { eq: "page_home" }, locale: { eq: $locale } }
      }
    ) {
      edges {
        node {
          fields {
            slug
          }
          html
          frontmatter {
            pageKey
            seo_title
            seo_desc
            title
            text
          }
        }
      }
    }
    blogPosts: allMarkdownRemark(
      filter: {
        frontmatter: {
          pageKey: { eq: "page_blogpost" }
          locale: { eq: $locale }
        }
      }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            description
            date
            image {
              childImageSharp {
                fluid(maxWidth: 320, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    newsPosts: allMarkdownRemark(
      filter: {
        frontmatter: {
          pageKey: { eq: "page_newspost" }
          locale: { eq: $locale }
        }
      }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            description
            date
            image {
              childImageSharp {
                fluid(maxWidth: 800, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
