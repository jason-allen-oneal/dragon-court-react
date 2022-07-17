import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../../css/infoScreen.css";

type Props = {
  data: DC.Item | DC.InventoryItem;
  exitScreen: (type: string) => void;
};

export default class InfoScreen extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <div className="infoScreen">
        <Row>
          <Col className="col-2">
            <img
              className="img-fluid"
              src={`/images/game/exit.png`}
              onClick={() => this.props.exitScreen("info")}
            />
          </Col>
        </Row>
        <Row>
          <Col className="text-center"></Col>
        </Row>
      </div>
    );
  }
}
