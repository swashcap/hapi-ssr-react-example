import * as React from "react";

interface Props {
  value?: number;
}

interface State {
  value: number;
}

export default class NumericInput extends React.Component<Props, State> {
  static defaultProps = {
    value: 1
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      value: typeof props.value === "number" ? props.value : 1
    };
  }

  handleIncrementPress = () => {
    this.setState({
      value: this.state.value + 1
    });
  };

  handleDecrementPress = () => {
    this.setState({
      value: this.state.value - 1
    });
  };

  render() {
    const { value } = this.state;

    return (
      <div className="numeric-input">
        <label htmlFor="numeric-input-1">Enter a number:</label>
        <button
          aria-label="Decrease by 1"
          onClick={this.handleDecrementPress}
          title="Decrease"
          type="button"
        >
          <span aria-hidden="true">-</span>
        </button>
        <input id="numeric-input-1" type="number" value={value} />
        <button
          aria-label="Increase by 1"
          onClick={this.handleIncrementPress}
          title="Increase"
          type="button"
        >
          <span aria-hidden="true">+</span>
        </button>
      </div>
    );
  }
}
