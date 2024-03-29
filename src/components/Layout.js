import React from "react";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";
import Menu from "./Menu";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import { ContextProviderComponent } from "./Context";
import ContextConsumer from "./Context";
import handleViewport from "react-in-viewport";
const getSafe = (fn, defaultValue) => {
   try {
     return fn();
   } catch (e) {
     return defaultValue;
   }
}
const isMobile = getSafe(()=>(window.innerWidth < 640), false); 
const Block = ({ inViewport, innerRef, gone}) => {
  return (
    <div style={{ height: "1px" }} className="stick-trigger" ref={innerRef} />
  );
};


const ViewportBlock = handleViewport(Block);

const Spacer = ({ inViewport, innerRef, gone}) => {
  return (
    <div style={{ height: "100vh" }} className="spacer" ref={innerRef} />
  );
};
const ViewportSpacer = handleViewport(Spacer);
const unTemplateWrapper = ({
  handleTriggerOutView,
  menuParallaxDisabled,
  children,
  location,
  inView,
  locale,
  parallaxController,
}) => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={data => (
      <ContextProviderComponent>
        <ContextConsumer>
          {({ contextData, set, enterView, leaveView }) => (
            <ParallaxProvider>
              <div className="LAYOUTDIV">
                <Helmet>
                  <html lang="en" />
                  <title>{data.site.siteMetadata.title}</title>
                  <meta
                    name="description"
                    content={data.site.siteMetadata.description}
                  />
                  <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/img/apple-touch-icon.png"
                  />
                  <link
                    rel="icon"
                    type="image/png"
                    href="/img/favicon-32x32.png"
                    sizes="32x32"
                  />
                  <link
                    rel="icon"
                    type="image/png"
                    href="/img/favicon-16x16.png"
                    sizes="16x16"
                  />

                  <link
                    rel="mask-icon"
                    href="/img/safari-pinned-tab.svg"
                    color="#ff5500"
                  />
                  <meta name="theme-color" content="#fff" />

                  <meta property="og:type" content="business.business" />
                  <meta
                    property="og:title"
                    content={data.site.siteMetadata.title}
                  />
                  <meta property="og:url" content="/" />
                  <meta property="og:image" content="/img/og-image.jpg" />
                </Helmet>

                <ViewportSpacer
                onEnterViewport={() => enterView("home")}
                onLeaveViewport={() => leaveView("home")}
                />
                <Parallax
                  disabled={contextData.fixTop}
                  className="custom-class"
                  y={[2000, -2000]}
                  tagOuter="figure"
                >
                  <ViewportBlock
                    onLeaveViewport={() => {
                      set({ fixTop: true });
                    }}
                  />
                  <Menu
                    inView={inView}
                    location={location}
                    mobile={isMobile}
                  />
                  <div />
                </Parallax>
                <div
                  className="mockler"
                  style={{
                    zIndex: "4",
                    pointerEvents: "none",
                    position: "fixed",
                    right: "11px",
                    top: "0",
                    textAlign: "left",
                    margin: "0"
                  }}
                >
                  <h1 id="veronica" style={{ margin: "0", fontSize: "7vw" }}>
                    Veronica Mockler
                  </h1>
                </div>
                <div className="main-container">
                  {children}
                </div>
                <div
                  className="footer"
                  style={{
                    zIndex:100000,
                    display: "flex",
                    position: "fixed",
                    right: "15px",
                    width: "5vw",
                    height: "3vw",
                    bottom: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0",
                    border: "solid 2px black"
                  }}
                >
                  <h1 style={{ margin: "0", fontSize: "1vw"}}>© 2022</h1>
                </div>
              </div>
            </ParallaxProvider>
          )}
        </ContextConsumer>
      </ContextProviderComponent>
    )}
  />
);
const TemplateWrapper = handleViewport(
  unTemplateWrapper /** options: {}, config: {} **/
);
export default TemplateWrapper;
