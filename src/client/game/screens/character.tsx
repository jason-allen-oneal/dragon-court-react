import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../../css/character.css";

type Props = {
  User: DC.User;
  Player: DC.Player;
  exitScreen: (type: string) => void;
};

export default class Character extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
  }

  getNameString() {
    let string = this.props.Player.nameAndRank + " of ";
    if (this.props.Player.alliance.id !== 0) {
      string += "Clan " + this.props.Player.alliance.name;
    } else {
      string += "no clan";
    }

    return string;
  }

  getWeaponString() {
    let weaponString = "";
    if (Object.keys(this.props.Player.equipment.right).length === 0) {
      if (Object.keys(this.props.Player.equipment.left).length === 0) {
        weaponString = "None";
      } else {
        weaponString = this.props.Player.equipment.left.name;
      }
    } else {
      weaponString = this.props.Player.equipment.right.name;
    }

    return weaponString;
  }

  getArmorString() {
    let armorString = "";
    if (Object.keys(this.props.Player.equipment.right).length === 0) {
      armorString = "None";
    } else {
      armorString = this.props.Player.equipment.body.name;
    }

    return armorString;
  }

  render(): React.ReactNode {
    return (
      <div className="characterScreen">
        <Row>
          <Col className="col-2">
            <img
              className="img-fluid"
              src={"/images/game/exit.png"}
              onClick={() => this.props.exitScreen("character")}
            />
          </Col>
        </Row>
        <Row>
          <Col className="text-center">{this.getNameString()}</Col>
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <Col className="text-center">{this.props.Player.background}</Col>
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <Col>Guts: {this.props.Player.stats.guts}</Col>
          <Col>Wits: {this.props.Player.stats.wits}</Col>
          <Col>Charm: {this.props.Player.stats.charm}</Col>
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <Col>Weapon: {this.getWeaponString()}</Col>
        </Row>
        <Row>
          <Col>Armor: {this.getArmorString()}</Col>
        </Row>
      </div>
    );
  }
}
