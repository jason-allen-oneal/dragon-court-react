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

class Forest extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { User: this.props.User, Player: this.props.Player };
  }

  render(): React.ReactNode {
    return (
      <div className="region forest">
        <Row>
          <RegionTitle title={"Depths of the Arcane Forest"} />
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <RegionNode
            title={"Mountain Trail [1]"}
            img={"regions/forest_to_mountains"}
            onClick={() => this.props.regionChange("mountains")}
          />
          <RegionNode
            title={"Quest (1)"}
            img={"forest_quest"}
            onClick={() => this.props.performQuest("forest")}
          />
          <RegionNode
            title={"Fields Road [1]"}
            img={"regions/forest_to_fields"}
            onClick={() => this.props.regionChange("fields")}
          />
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <RegionNode
            title={"Shortlegs Smithy"}
            img={"shops/smith"}
            onClick={() => this.props.enterBuilding("smith")}
          />
          <RegionNode
            title={"Exit Game"}
            img={"fields_exit"}
            onClick={this.props.exitGame}
          />
          <RegionNode
            title={"The Guild"}
            img={"shops/guild"}
            onClick={() => this.props.enterBuilding("guild")}
          />
        </Row>
      </div>
    );
  }
}

export default Forest;
