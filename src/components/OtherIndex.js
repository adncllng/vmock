import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import ViewportGallery from "../components/Gallery";
import {
  Link as ScrollLink,
  DirectLink,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller
} from "react-scroll";
import ScrollableAnchor from "react-scrollable-anchor";
import { configureAnchors, removeHash } from 'react-scrollable-anchor'

// Offset all anchors by -60 to account for a fixed header
// and scroll more quickly than the default 400ms
configureAnchors({offset: -230, scrollDuration: 200, keepLastAnchorHash:true})

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
    const { location, data, posts, locale } = this.props;
    return (
      <Layout location={location} inView={this.state.inView} locale={locale}>
        <Helmet titleTemplate="%s | Blog">
          <title>{`${data.frontmatter.seo_title}`}</title>
          <meta name="description" content={`${data.frontmatter.seo_desc}`} />
        </Helmet>
        <div style={{ height: "100vh" }} />
        <div style={{ height: "100vh" }} />


        <Element name="project" className="element">
          <ScrollableAnchor id={"projects"}>
            <ViewportGallery
              onEnterViewport={() => this.handleInView("GALLERY")}
              onLeaveViewport={() => this.handleOutView()}
              posts={posts}
            />
          </ScrollableAnchor>
        </Element>

        <div style={{ height: "100vh" }} />

        <div> How are you world? </div>
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
