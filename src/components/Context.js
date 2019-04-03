// Context.js
import React from "react";

const path =
  (typeof window !== "undefined" && window.location && window.location.href) ||
  "";
console.log(path);
const defaultContextValue = {
  contextData: {
    // set your initial data shape here
    fixTop: false,
    locale: path.indexOf("fr") >= 0 ? "fr" : "en",
    inView: [],
    location: "home"
  },
  set: () => {}
};

const { Provider, Consumer } = React.createContext(defaultContextValue);

class ContextProviderComponent extends React.Component {
  constructor() {
    super();
    this.setData = this.setData.bind(this);
    this.enterView = this.enterView.bind(this);
    this.leaveView = this.leaveView.bind(this);
    this.state = {
      ...defaultContextValue,
      set: this.setData,
      enterView: this.enterView,
      leaveView: this.leaveView
    };
  }

  setData(newData) {
    console.log("newData", newData, this.state);
    const more = newData.inView ? { location: "home" } : {};
    this.setState(state => ({
      contextData: {
        ...state.contextData,
        ...newData,
        ...more
      }
    }));
  }
  enterView(name) {
    this.setState(state => ({
      contextData: {
        ...state.contextData,
        location:'home',
        inView: [...state.contextData.inView, name]
      }
    }));
  }
  leaveView(name) {
    this.setState(state => ({
      contextData: {
        ...state.contextData,
        inView:
          state.contextData.inView[state.contextData.inView.length - 1] === name
            ? state.contextData.inView.splice(
                0,
                state.contextData.inView.length - 1
              )
            : state.contextData.inView
      }
    }));
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

export { Consumer as default, ContextProviderComponent };
