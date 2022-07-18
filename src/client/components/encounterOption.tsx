import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

type Props = {
  option: any;
  onClick: (item: DC.Item) => void;
};

type State = {
  option: any;
};

export default class EncounterOption extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      option: this.props.option,
    };
  }

  render(): React.ReactNode {
    return (
      <>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <Col className="col-12 text-center">
            <Button
              size="sm"
              onClick={() => this.props.onClick(this.state.option)}
            >
              {this.state.option}
            </Button>
          </Col>
        </Row>
      </>
    );
  }
}
