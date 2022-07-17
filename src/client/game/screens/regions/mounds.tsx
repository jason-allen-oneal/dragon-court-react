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
  exitGame: () => void;
};

type State = {
  User: DC.User;
  Player: DC.Player;
};

class Mounds extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { User: this.props.User, Player: this.props.Player };
  }

  render(): React.ReactNode {
    return (
      <div className="region mounds">
        <Row>
          <RegionTitle title={"The Bowels of the Goblin Mound"} />
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <RegionNode
            title={"To Fields [1]"}
            img={"regions/mounds_to_fields"}
            onClick={() => this.props.regionChange("fields")}
          />
          <RegionNode
            title={">>Dark Vortex<<"}
            img={"dark_vortex"}
            onClick={() => this.props.performQuest("vortex")}
          />
          <RegionNode
            title={"Gobble Inn"}
            img={"shops/inn"}
            onClick={() => this.props.enterBuilding("inn")}
          />
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <RegionNode
            title={"Throne Room (1)"}
            img={"throne_room"}
            onClick={() => this.props.performQuest("throne")}
          />
          <RegionNode
            title={"Warrens (1)"}
            img={"warrens"}
            onClick={() => this.props.performQuest("warrens")}
          />
          <RegionNode
            title={"Treasury (1)"}
            img={"treasury"}
            onClick={() => this.props.performQuest("treasury")}
          />
        </Row>
      </div>
    );
  }
}

export default Mounds;
