import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: []
    };

    this.handlePick = this.handlePick.bind(this);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
    this.handleAddOption = this.handleAddoption.bind(this);
    this.hanldeRemoveOption = this.hanldeRemoveOption.bind(this);
  }

  /* componentDidMount() {
    const json = localStorage.getItem("options");
    const final = JSON.parse(json);

    if (final) this.setState(() => ({ final }));
  } */

  /*   componentDidUpdate(prevState, prevOption) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem("options", json);
    }
    console.log("saving data");
  } */

  /* componentWillUnmount() {
    console.log("componentWillUnmount");
  } */

  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    alert(option);
  }

  handleRemoveAll() {
    /*  this.setState(() => {
        return {
          options: []
        };
      }); */

    // This is the shorthend syntax of the above code
    this.setState(() => ({ options: [] }));
  }

  hanldeRemoveOption(optionToRemove) {
    this.setState(prevState => ({
      options: prevState.options.filter(option => optionToRemove !== option)
    }));
  }

  handleAddoption(option) {
    if (!option) {
      return "Enter valid option";
    } else if (this.state.options.indexOf(option) > -1) {
      return "This option is already exists.";
    }

    /* this.setState(prevState => {
        return {
          options: prevState.options.concat(option)
        };
      }); */

    this.setState(prevState => ({ options: prevState.options.concat(option) }));
  }

  render() {
    return (
      <div>
        <Header subTitle="Gives you the options" />
        <Action
          hasOption={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        <Options
          handleRemoveAll={this.handleRemoveAll}
          options={this.state.options}
          hanldeRemoveOption={this.hanldeRemoveOption}
        />
        <Addoption handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}

const Header = props => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subTitle && <h2>{props.subTitle}</h2>}
    </div>
  );
};

Header.defaultProps = {
  title: "The Dream"
};

/* class Header extends React.Component {
    render() {
      return (
        <div>
          <h1>{this.props.title}</h1>
          <h2>{this.props.subTitle}</h2>
        </div>
      );
    }
  } */

const Action = props => {
  return (
    <div>
      <button disabled={!props.hasOption} onClick={props.handlePick}>
        What should is Do?
      </button>
    </div>
  );
};

/* class Action extends React.Component {
    render() {
      return (
        <div>
          <button
            disabled={!this.props.hasOption}
            onClick={this.props.handlePick}
          >
            What should is Do?
          </button>
        </div>
      );
    }
  } */

const Options = props => {
  return (
    <div>
      <button onClick={props.handleRemoveAll}>Remove All</button>
      <p>Options:</p>
      {props.options.map(option => (
        <Option
          key={option}
          optionText={option}
          hanldeRemoveOption={props.hanldeRemoveOption}
        />
      ))}
    </div>
  );
};

/* class Options extends React.Component {
    render() {
      return (
        <div>
          <button onClick={this.props.handleRemoveAll}>Remove All</button>
          <p>Options:</p>
          {this.props.options.map(option => (
            <Option key={option} optionText={option} />
          ))}
        </div>
      );
    }
  } */

const Option = props => {
  return (
    <div>
      <p>{props.optionText}</p>
      <button
        onClick={e => {
          props.hanldeRemoveOption(props.optionText);
        }}
      >
        Remove
      </button>
    </div>
  );
};

/* class Option extends React.Component {
    render() {
      return (
        <div>
          <p>{this.props.optionText}</p>
        </div>
      );
    }
  } */

class Addoption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);

    this.state = {
      error: undefined
    };
  }

  handleAddOption(e) {
    e.preventDefault();
    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);

    /*  this.setState(() => {
        return {
          error
        };
      }); */

    this.setState(() => ({ error }));

    e.target.elements.option.value = null;
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<IndecisionApp />, rootElement);
