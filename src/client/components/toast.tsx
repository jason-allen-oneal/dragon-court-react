import React from "react";
import { createRoot } from "react-dom/client";

import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

type Props = {
  message: string;
  variant: string;
  show: boolean;
  container: any;
};

type State = {
  show: boolean;
};

export default class Notification extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { show: this.props.show };
  }

  close() {
    this.setState({
      show: false,
    });
    this.props.container.unmount();
  }

  componentWillUnmount() {
    document.body.removeChild(this.props.container);
  }

  render(): React.ReactNode {
    return (
      <ToastContainer className="p-3" position="middle-center">
        <Toast
          bg={this.props.variant}
          onClose={() => this.setState({ show: false })}
          show={this.state.show}
          autohide
        >
          <Toast.Body className={this.props.variant === "dark" && "text-white"}>
            {this.props.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    );
  }
}
