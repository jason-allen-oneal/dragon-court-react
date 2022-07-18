import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../../css/infoScreen.css";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";

type Props = {
  data: DC.Item | DC.InventoryItem;
  exitScreen: (type: string) => void;
};

export default class InfoScreen extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
  }

  getStats() {
    let data = "";

    if (this.props.data.attack != 0) {
      if (this.props.data.attack > 0) {
        data += "+";
      }
      data += this.props.data.attack + "a";
    }
    if (this.props.data.attack != 0) {
      if (this.props.data.defend > 0) {
        data += "+";
      }
      data += this.props.data.defend + "d";
    }

    return data;
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
          <Col className="text-center">
            {this.props.data.name}&nbsp;
            {this.props.data.identified && this.getStats()}
          </Col>
        </Row>
      </div>
    );
  }
}
