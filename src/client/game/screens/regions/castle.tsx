import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import RegionTitle from "../../../components/regionTitle";
import RegionNode from "../../../components/regionNode";

import "../../../css/region.css";

type Props = {
  User: DC.User;
  Player: DC.Player;
  regionChange: (region: string) => void;
  enterBuilding: (type: string) => void;
  exitGame: () => void;
  performQuest: (region: string) => void;
};

type State = {
  User: DC.User;
  Player: DC.Player;
};

class Castle extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { User: this.props.User, Player: this.props.Player };
  }

  render(): React.ReactNode {
    return (
      <div className="region castle">
        <Row>
          <RegionTitle title={"The Central Courtyard of Draken Keep"} />
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <RegionNode
            title={"Clan Hall"}
            img={"shops/clan"}
            onClick={() => this.props.enterBuilding("clan")}
          />
          <RegionNode
            title={"Royal Court"}
            img={"regions/royal_court"}
            onClick={() => this.props.enterBuilding("royal_court")}
          />
          <RegionNode
            title={"Dragon Guard"}
            img={"shops/dragon_guard"}
            onClick={() => this.props.enterBuilding("dragon_guard")}
          />
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <RegionNode
            title={"Towne Gate"}
            img={"regions/town_gate"}
            onClick={() => this.props.regionChange("town")}
          />
          <RegionNode
            title={"Post Office"}
            img={"shops/post_office"}
            onClick={() => this.props.enterBuilding("post_office")}
          />
          <RegionNode
            title={"Dunjeons (1)"}
            img={"dungeons"}
            onClick={() => this.props.performQuest("dungeon")}
          />
        </Row>
      </div>
    );
  }
}

export default Castle;
