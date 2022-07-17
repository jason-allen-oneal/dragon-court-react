import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import ShopNPC from "../../../components/shopNPC";
import ShopExit from "../../../components/shopExit";

type Props = {
  User: DC.User;
  Player: DC.Player;
  exitBuilding: () => void;
  items: DC.Item[];
  blurb: string;
};

type State = {
  User: DC.User;
  Player: DC.Player;
  items: DC.Item[];
};

class Inn extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      User: this.props.User,
      Player: this.props.Player,
      items: this.props.items,
    };
  }

  itemClick(item: any) {
    console.log(item);
  }

  render(): React.ReactNode {
    return (
      <>
        <Row>
          <ShopExit exitBuilding={this.props.exitBuilding} />
          <Col>&nbsp;</Col>
        </Row>

        <Row>
          <Col className="col-4">
            <ShopNPC blurb={this.props.blurb} type={"inn"} />
            <>
              <Row>
                <Col>&nbsp;</Col>
              </Row>
              <Row>
                <Col></Col>
              </Row>
            </>
          </Col>
          <Col className="col-8"></Col>
        </Row>
      </>
    );
  }
}

export default Inn;
