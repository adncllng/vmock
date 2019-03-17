import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import posed from "react-pose";

const WIDTH = "320";
const HEIGHT = "187.5";
const MARGIN = "5";
const imageBoxStyle = {
  width: WIDTH + "px",
  margin: MARGIN + "px"
};
const Box = posed.div({
  visible: {
    delay: 250,
    opacity: 1,
    border: "solid 5px black"
  },
  hidden: {
    opacity: 0, // temp
    border: "solid 1px black"
  }
});
const ToLeft = posed.div({
  enter: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring", stiffness: 1000, damping: 150, delay:500 },
      default: { duration: 300, delay:500  }
    }
  },
  exit: {
    opacity: 0,
    x: 500,
    transition: { duration: 200 }
  }
});
const ToRight = posed.div({
  enter: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring", stiffness: 1000, damping: 150, delay:500 },
      default: { duration: 300, delay:500  }
    }
  },
  exit: {
    opacity: 0,
    x: -500,
    transition: { duration: 200 }
  }
});

class GalleryImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showDescription: false };
  }
  onMouseMove = () => {
    console.log("mouseover");
    this.setState({ showDescription: true });
  };
  onMouseOut = () => {
    console.log("mouseout");
    this.setState({ showDescription: false });
  };
  render() {
    const { showDescription } = this.state;
    return (
      <Link
        onMouseMove={this.onMouseMove}
        onMouseOut={this.onMouseOut}
        to={this.props.post.fields.slug}
        style={{
          // zIndex:Math.round(Math.random()),
          position: "relative",
          overflow: "hidden",
          margin: MARGIN + "px",
          width: WIDTH + "px",
          height: WIDTH / (3 / 2) + "px",
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        }}
      >
        <Box
          style={{
            position: "absolute",
            overflow: "hidden",
            zIndex: "100",
            width: WIDTH + "px",
            height: WIDTH / (3 / 2) + "px",
            justifyContent: "space-between",
            backgroundColor: 'rgb(249,254,255,0.9)',
            boxSizing: "border-box"
          }}
          pose={showDescription ? "visible" : "hidden"}
        >
          <ToLeft
            style={{
              position: "absolute",
              margin: "10px",
              height: "150px",
              width: WIDTH - 30 + "px",
              fontSize: "50px",
              overflow: "hidden",
              left: "0",
              padding: "0",
              color:'black'
            }}
            pose={showDescription ? "enter" : "exit"}
          >
            {this.props.post.frontmatter.title}
          </ToLeft>
          <ToRight
            style={{
              margin: "10px",
              position: "absolute",
              bottom: "0",
              fontSize: "20px",
              height:'60px',
              right: "0",
              color:'black'
            }}
            pose={showDescription ? "enter" : "exit"}
          >
            {this.props.post.frontmatter.description}
          </ToRight>
        </Box>
        {this.props.post.frontmatter.image && (
          <Img
            fluid={this.props.post.frontmatter.image.childImageSharp.fluid}
          />
        )}
      </Link>
    );
  }
}

export default GalleryImage;
