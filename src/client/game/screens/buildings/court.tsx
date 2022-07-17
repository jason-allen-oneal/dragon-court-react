import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import RegionTitle from "../../../components/regionTitle";
import ShopExit from "../../../components/shopExit";
import ShopNPC from "../../../components/shopNPC";

type Props = {
  User: DC.User;
  Player: DC.Player;
  performQuest: (region: string, type: string) => void;
  exitBuilding: () => void;
  blurb: string;
};

type State = {
  User: DC.User;
  Player: DC.Player;
};

class Court extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { User: this.props.User, Player: this.props.Player };
  }

  render(): React.ReactNode {
    return (
      <div style={{ backgroundColor: "#ff9095" }} className="h-100 region">
        <Row>
          <RegionTitle title={"Hallways &amp; Chambers of the Dragon Court"} />
        </Row>
        <Row>
          <ShopNPC blurb={this.props.blurb} type={"weapons"} />
          <Col>
            <Row>
              <ShopExit exitBuilding={this.props.exitBuilding} />
            </Row>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <Button variant={"outline-dark"}>Dice</Button>
                  </Col>
                  <Col>
                    <Button variant={"outline-dark"}>Boast</Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button variant={"outline-dark"}>Mingle</Button>
                  </Col>
                  <Col>
                    <Button variant={"outline-dark"}>Game</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Court;
