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

class Fields extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { User: this.props.User, Player: this.props.Player };
  }

  render(): React.ReactNode {
    return (
      <div className="h-100 region fields">
        <Row>
          <RegionTitle title={"The Fields Near Salamander Township"} />
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <RegionNode
            title={"Towne Road"}
            img={"regions/fields_to_town"}
            onClick={() => this.props.regionChange("town")}
          />
          {this.state.Player.level > 12 && (
            <RegionNode
              title={"Goblin Mound (1)"}
              img={"regions/fields_to_mounds"}
              onClick={() => this.props.regionChange("mounds")}
            />
          )}
          <RegionNode
            title={"Healer's Tower"}
            img={"shops/healer"}
            onClick={() => this.props.enterBuilding("healer")}
          />
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          {this.state.Player.level > 8 && (
            <RegionNode
              title={"Forest Road [1]"}
              img={"regions/fields_to_forest"}
              onClick={() => this.props.regionChange("forest")}
            />
          )}
          <RegionNode
            title={"Quest (1)"}
            img={"fields_quest"}
            onClick={() => this.props.performQuest("fields")}
          />
          <RegionNode
            title={"Exit Game"}
            img={"fields_exit"}
            onClick={this.props.exitGame}
          />
        </Row>
      </div>
    );
  }
}

export default Fields;
