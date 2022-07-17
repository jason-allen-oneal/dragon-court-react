import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import RegionNode from "../../../components/regionNode";
import RegionTitle from "../../../components/regionTitle";

import "../../../css/region.css";

type Props = {
  User: DC.User;
  Player: DC.Player;
  regionChange: (region: string) => void;
  enterBuilding: (type: string) => void;
  performQuest: (region: string) => void;
};

type State = {
  User: DC.User;
  Player: DC.Player;
};

class Sea extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { User: this.props.User, Player: this.props.Player };
  }

  render(): React.ReactNode {
    return (
      <div className="region sea">
        <Row>
          <RegionTitle title={"The Sea of Tranquility"} />
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <RegionNode
            title={"Hie Brasil (1)"}
            img={"regions/hie_brasil"}
            onClick={() => this.props.performQuest("brasil")}
          />
          <RegionNode
            title={"Shangala (1)"}
            img={"regions/shangala"}
            onClick={() => this.props.performQuest("shangala")}
          />
          <RegionNode
            title={"Azteca (1)"}
            img={"regions/azteca"}
            onClick={() => this.props.performQuest("azteca")}
          />
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <RegionNode
            title={"Voyage Home"}
            img={"regions/sea_to_town"}
            onClick={() => this.props.regionChange("market")}
          />
          <RegionNode
            title={"Go Fish (1)"}
            img={"sea_quest"}
            onClick={() => this.props.performQuest("sea")}
          />
          <RegionNode
            title={"Seaside Diner"}
            img={"shops/diner"}
            onClick={() => this.props.enterBuilding("diner")}
          />
        </Row>
      </div>
    );
  }
}

export default Sea;
