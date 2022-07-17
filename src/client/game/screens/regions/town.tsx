import React from "react";
import Col from "react-bootstrap/Col";

import Row from "react-bootstrap/Row";

import RegionNode from "../../../components/regionNode";
import RegionTitle from "../../../components/regionTitle";

import "../../../css/region.css";

type Props = {
  User: DC.User;
  Player: DC.Player;
  regionChange: (region: string) => void;
  enterBuilding: (type: string) => void;
};

class Town extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <div className="region town">
        <Row>
          <RegionTitle title={"Main Street in Salamander Township"} />
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <RegionNode
            title={"Keeper's Tavern"}
            img={"shops/tavern"}
            onClick={() => this.props.enterBuilding("tavern")}
          />
          <RegionNode
            title={"Market Lane"}
            img={"regions/market_lane"}
            onClick={() => this.props.regionChange("market")}
          />
          <RegionNode
            title={"Castle Gate [1]"}
            img={"regions/castle_gate"}
            onClick={() => this.props.regionChange("castle")}
          />
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <RegionNode
            title={"Smith's Weapons"}
            img={"shops/weapons"}
            onClick={() => this.props.enterBuilding("weapons")}
          />
          <RegionNode
            title={"Trade Shoppe"}
            img={"shops/trade"}
            onClick={() => this.props.enterBuilding("trade")}
          />
          <RegionNode
            title={"Leave Town"}
            img={"regions/town_to_fields"}
            onClick={() => this.props.regionChange("fields")}
          />
        </Row>
      </div>
    );
  }
}

export default Town;
