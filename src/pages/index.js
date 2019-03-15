import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import ViewportGallery from "../components/Gallery";

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inView: ""
    };
  }
  handleInView =  (element) => {
    this.setState({
      inView: element
    })
  }
  handleOutView =  () => {
    this.setState({
      inView: ''
    })
  }
  render() {
    const {
      pageContext: { locale },
      location
    } = this.props;
    const { node: data } = this.props.data.homePageData.edges[0];
    const { edges: posts } = this.props.data.blogPosts;
    return (
      <Layout location={location} inView={this.state.inView}>
        <Helmet titleTemplate="%s | Blog">
          <title>{`${data.frontmatter.seo_title}`}</title>
          <meta name="description" content={`${data.frontmatter.seo_desc}`} />
        </Helmet>
        <h1>title: {data.frontmatter.title}</h1>
        <p>Content: {data.frontmatter.text}</p>
        <p>Locale: {locale}</p>
        <Link to={locale === "en" ? "/de" : "/"} state={{ fromHome: true }}>
          <p>Change language</p>
        </Link>
        <h2 style={{ position: "sticky", top: "0" }}>BlogPosts:</h2>
        {posts.map(({ node: post }) => (
          <div>
            <h3 style={{ position: "sticky", top: "0" }}>
              Blog Post Title: {post.frontmatter.title}
            </h3>
            <p>Blog Post Description: {post.frontmatter.description}</p>
            <p>Blog Post Date: {post.frontmatter.date}</p>
            <Link
              to={post.fields.slug}
              state={{ fromHome: true }}
              title="link to blog post"
            >
              Link to blog post
            </Link>
          </div>
        ))}
        <ViewportGallery
          onEnterViewport={() => this.handleInView('GALLERY')}
          onLeaveViewport={() => this.handleOutView()}
          posts={posts}
        />
      </Layout>
    );
  }
}

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
          }
        }
      }
    }
  }
`;
