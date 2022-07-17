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

class Mountains extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { User: this.props.User, Player: this.props.Player };
  }

  render(): React.ReactNode {
    return (
      <div className="region mountains">
        <Row>
          <RegionTitle title={"High Crags of the Fenris Mountains"} />
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <RegionNode
            title={"Djinni's Magic"}
            img={"shops/magic"}
            onClick={() => this.props.enterBuilding("magic")}
          />
          <RegionNode
            title={"Quest (1)"}
            img={"mountains_quest"}
            onClick={() => this.props.performQuest("mountains")}
          />
          <RegionNode
            title={"Gem Exchange"}
            img={"shops/gem_exchange"}
            onClick={() => this.props.enterBuilding("gem_exchange")}
          />
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <RegionNode
            title={"Exit Game"}
            img={"mountains_exit"}
            onClick={this.props.exitGame}
          />
          <RegionNode
            title={"Abandoned Mine (1)"}
            img={"mountains_mine"}
            onClick={() => this.props.performQuest("mine")}
          />
          <RegionNode
            title={"Forest Trail [1]"}
            img={"regions/mountains_to_forest"}
            onClick={() => this.props.regionChange("forest")}
          />
        </Row>
      </div>
    );
  }
}

export default Mountains;
