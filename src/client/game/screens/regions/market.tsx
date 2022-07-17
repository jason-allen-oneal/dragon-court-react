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
};

type State = {
  User: DC.User;
  Player: DC.Player;
};

class Market extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { User: this.props.User, Player: this.props.Player };
  }

  render(): React.ReactNode {
    return (
      <div className="region market">
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
            title={"Suitor's Armor"}
            img={"shops/armor"}
            onClick={() => this.props.enterBuilding("armor")}
          />
          <RegionNode
            title={"Hire Boat [1]"}
            img={"regions/sea"}
            onClick={() => this.props.regionChange("sea")}
          />
          <RegionNode
            title={"Slick's Den"}
            img={"shops/den"}
            onClick={() => this.props.enterBuilding("den")}
          />
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <RegionNode
            title={"Silver's Storage"}
            img={"shops/storage"}
            onClick={() => this.props.enterBuilding("storage")}
          />
          <RegionNode
            title={"Main Street"}
            img={"regions/main_street"}
            onClick={() => this.props.regionChange("town")}
          />
        </Row>
      </div>
    );
  }
}

export default Market;
