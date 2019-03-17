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
import { goToAnchor } from 'react-scrollable-anchor'
import AnchorLink from 'react-anchor-link-smooth-scroll'

// Offset all anchors by -60 to account for a fixed header
// and scroll more quickly than the default 400ms
configureAnchors({offset: -230, scrollDuration: 200, keepLastAnchorHash:false})

class OtherIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inView: ""
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
  scrolll = ()=>{
    console.log("SCROLLL")
  scroller.scrollTo('myScrollToElement', {
  duration: 1500,
  delay: 100,
  smooth: true,
  offset: 50, // Scrolls to element + 50 pixels down the page
})
  }
  render() {
    const { data, posts, locale } = this.props;
    return (
      <Layout location={"HOME"}  scrolll = {this.scrolll} inView={this.state.inView} locale={locale}>
        <Helmet titleTemplate="%s | Blog">
          <title>{`${data.frontmatter.seo_title}`}</title>
          <meta name="description" content={`${data.frontmatter.seo_desc}`} />
        </Helmet>
   <section style={{paddingTop:'330px'}} id='projects'>
   <ViewportGallery
     onEnterViewport={() => this.handleInView("projects")}
     onLeaveViewport={this.handleOutView}
     posts={posts}
   />
   <div style={{height:'200vw'}}></div>
   </section>
      </Layout>
    );
  }
}

export default OtherIndex;
