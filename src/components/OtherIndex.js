import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import ViewportGallery from "../components/Gallery";

class OtherIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inView: ""
    };
  }
  handleInView = element => {
    this.setState({
      inView: element
    });
  };
  handleOutView = () => {
    this.setState({
      inView: ""
    });
  };
  render() {
    const {location, data, posts, locale} = this.props;

    return (
      <Layout location={location} inView={this.state.inView} locale={locale}>
        <Helmet titleTemplate="%s | Blog">
          <title>{`${data.frontmatter.seo_title}`}</title>
          <meta name="description" content={`${data.frontmatter.seo_desc}`} />
        </Helmet>
        <div style={{ height: "100vh" }} />
        <ViewportGallery
          onEnterViewport={() => this.handleInView("GALLERY")}
          onLeaveViewport={() => this.handleOutView()}
          posts={posts}
        />
      </Layout>
    );
  }
}

export default OtherIndex;

// class IndexPage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       inView: ""
//     };
//   }
//   handleInView = element => {
//     this.setState({
//       inView: element
//     });
//   };
//   handleOutView = () => {
//     this.setState({
//       inView: ""
//     });
//   };
//   render() {
//     const {
//       pageContext: { locale },
//       location
//     } = this.props;
//     const { node: data } = this.props.data.homePageData.edges[0];
//     const { edges: posts } = this.props.data.blogPosts;
//     return (
//       <Layout location={location} inView={this.state.inView}>
//         <Helmet titleTemplate="%s | Blog">
//           <title>{`${data.frontmatter.seo_title}`}</title>
//           <meta name="description" content={`${data.frontmatter.seo_desc}`} />
//         </Helmet>
//         <div style= {{height:'100vh'}}></div>
//         <ViewportGallery
//           onEnterViewport={() => this.handleInView("GALLERY")}
//           onLeaveViewport={() => this.handleOutView()}
//           posts={posts}
//         />
//       </Layout>
//     );
//   }
// }
