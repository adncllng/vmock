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
  scrollToTop = () => {
    scroll.scrollToTop();
  };

  scrollTo() {
    scroller.scrollTo("scroll-to-element", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart"
    });
  }

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
        <a href="#section2"> Go to section 2 </a>
        <li>
          <ScrollLink
            activeClass="active"
            className="te1"
            to="test1"
            spy={true}
            offset={-200}
            smooth={true}
            duration={500}
          >
            Test 1
          </ScrollLink>
        </li>
        <div style={{ height: "100vh" }} />
        <div id="projects">SERIOUSLY</div>
            <ViewportGallery
              onEnterViewport={() => this.handleInView("GALLERY")}
              onLeaveViewport={() => this.handleOutView()}
              posts={posts}
            />

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
