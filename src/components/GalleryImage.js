import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import posed, { PoseGroup } from "react-pose";

const WIDTH = "250";
const HEIGHT = "187.5";
const MARGIN = "5";
const imageBoxStyle = {
  width: WIDTH + "px",
  margin: MARGIN + "px"
};
const Box = posed.div({
  hidden: {
    opacity: 0.2, // temp
    border: "solid 1px black"
  },
  visible: {
    delay: 250,
    opacity: 0.8,
    border: "solid 5px black"
  }
});
const ToLeft = posed.div({
  enter: {
    x: 0,
    visibilty:'visible',
    transition: {
      x: { type: "spring", stiffness: 1000, damping: 150 },
      default: { duration: 300 }
    }
  },
  exit: {
    x: 100,
    visibilty:'hidden',
    transition: { duration: 200 }
  }
});
const ToRight = posed.div({
  enter: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring", stiffness: 1000, damping: 150 },
      default: { duration: 300 }
    }
  },
  exit: {
    x: -100,
    opacity: 0,
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
        title="link to blog post"
      >
        <Box
          style={{
            position:'relative',
            zIndex: "100",
            justifyContent: "space-between",
            overflow: "hidden",
            backgroundColor: "grey",
            width: WIDTH + "px",
            height: HEIGHT + "px",
            margin: MARGIN + "px",
            boxSizing: "border-box"
          }}
          pose={showDescription ? "visible" : "hidden"}
        >
          <ToLeft
            style={{
              margin: "10px",
              height: "50px",
              width: WIDTH - 30+'px',
              fontSize: "25px",
               overflow:'hidden',
              left:'0',
              padding:'0'
            }}
            pose={showDescription ? "enter" : "exit"}
          >
            {this.props.post.frontmatter.title}
          </ToLeft>
          <ToRight
            style={{ margin: "10px", position:'absolute',bottom:'0', right:'0' }}
            pose={showDescription ? "enter" : "exit"}
          >
            {this.props.post.frontmatter.description}
          </ToRight>
        </Box>
        <div style={imageBoxStyle}>
          {this.props.post.frontmatter.image && (
            <Img
              fluid={this.props.post.frontmatter.image.childImageSharp.fluid}
            />
          )}
        </div>
      </Link>
    );
  }
}

export default GalleryImage;
