import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import ViewportGallery from "../components/Gallery";
import { ParallaxProvider } from "react-scroll-parallax";
import ScrollableAnchor from "react-scrollable-anchor";
import { configureAnchors, removeHash } from "react-scrollable-anchor";
import { goToAnchor } from "react-scrollable-anchor";
import AnchorLink from "react-anchor-link-smooth-scroll";
import News from '../components/News';

// Offset all anchors by -60 to account for a fixed header
// and scroll more quickly than the default 400ms
configureAnchors({
  offset: -230,
  scrollDuration: 200,
  keepLastAnchorHash: false
});

class OtherIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inView: "",
      menuParallaxDisabled: false,
    };
  }
  handleInView = element => {
    return this.setState({
      inView: element
    });
  };

  handleOutView = () => {
    return this.setState({
      inView: {}
    });
  };
  handleTriggerOutView = () => {
    console.log("TRIGGER OUT VIEW ")
    return this.setState({
      menuParallaxDisabled: true
    });
  };

  render() {
    const { data, posts, locale, newsPosts} = this.props;
    return (
        <Layout
          onLeaveViewport={this.handleTriggerOutView}
          menuParallaxDisabled={this.state.menuParallaxDisabled}
          location={"HOME"}
          scrolll={this.scrolll}
          inView={this.state.inView}
          locale={locale}
        >
          <Helmet titleTemplate="%s | Blog">
            <title>{`${data.frontmatter.seo_title}`}</title>
            <meta name="description" content={`${data.frontmatter.seo_desc}`} />
          </Helmet>
          <section style={{ paddingTop: "330px" }} id="projects">
            <ViewportGallery
              onEnterViewport={() => this.handleInView("projects")}
              onLeaveViewport={this.handleOutView}
              posts={posts}
            />
            <News newsPosts={newsPosts}/>
            <div style={{ height: "200vw" }} />
          </section>
        </Layout>
    );
  }
}

export default OtherIndex;
