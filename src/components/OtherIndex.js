import React from "react";
import { Link, graphql, replace, push } from "gatsby";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import ViewportGallery from "../components/Gallery";
import { ParallaxProvider } from "react-scroll-parallax";
import ScrollableAnchor from "react-scrollable-anchor";
import { configureAnchors, removeHash } from "react-scrollable-anchor";
import { goToAnchor } from "react-scrollable-anchor";
import AnchorLink from "react-anchor-link-smooth-scroll";
import News from "../components/News";
import ContextConsumer from "./Context";
import About from "./about";
import Contact from "./contact"
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
      menuParallaxDisabled: false
    };
  }
  handleInView = elementName => {
    console.log("INVIEW", elementName);
    return this.setState({
      inView: elementName
    });
  };

  handleOutView = () => {
    return this.setState({
      inView: {}
    });
  };
  handleTriggerOutView = () => {
    console.log("TRIGGER OUT VIEW ");
    return this.setState({
      menuParallaxDisabled: true
    });
  };
  componentDidMount() {
    if (typeof window !== "undefined" && window.history.length >= 2) {
      this.setState({
        menuParallaxDisabled: true
      });
    }
  }

  render() {
    const { data, posts, locale, newsPosts } = this.props;
    // window doesn't exist while building, so we have to check.

    //window part is falsy on refresh.
    const menuParallaxDisabled = this.state.menuParallaxDisabled;

    console.log("locale from other", locale);
    return (
      <ContextConsumer>
        {({ contextData, set, enterView, leaveView }) => (
          <div>
            <Helmet titleTemplate="%s | Blog">
              <title>{`${data.frontmatter.seo_title}`}</title>
              <meta
                name="description"
                content={`${data.frontmatter.seo_desc}`}
              />
            </Helmet>
            <section style={{ paddingTop: "330px" }} id="projects">
              <ViewportGallery
                onEnterViewport={() => enterView("projects")}
                onLeaveViewport={() => leaveView("projects")}
                posts={posts}
              />
            </section>
            <section
              style={{ paddingTop: "100px", marginTop: "100px" }}
              id="news"
            >
              <News
                onEnterViewport={() => enterView("news")}
                onLeaveViewport={() => leaveView("news")}
                newsPosts={newsPosts}
                fixTop={contextData.fixTop}
              />
            </section>
            <section
              style={{
                paddingTop: "100px",
                marginTop: "200px",
                marginBottom: "200px"
              }}
              id="about"
            >
              <About
                onEnterViewport={() => enterView("about")}
                onLeaveViewport={() => leaveView("about")}
                html={data.html}
              />
            </section>
            <section
              style={{
                marginTop: "200px",
                marginBottom: "200px"
              }}
              id="contact"
            >
              <Contact
                onEnterViewport={() => enterView("contact")}
                onLeaveViewport={() => leaveView("contact")}
              />
            </section>
          </div>
        )}
      </ContextConsumer>
    );
  }
}

export default OtherIndex;
