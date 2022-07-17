import React from "react";
import { Socket } from "socket.io-client";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import "../css/statbar.css";

type Props = {
  User: DC.User;
  Player: DC.Player;
  exitGame: () => void;
  characterPage: () => void;
};

class StatBar extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    const quests =
      this.props.Player.quests < this.props.Player.questsMax
        ? `${this.props.Player.quests}/${this.props.Player.questsMax}`
        : this.props.Player.quests;
    const guts =
      this.props.Player.stats.guts < this.props.Player.stats.gutsMax
        ? `${this.props.Player.stats.guts}/${this.props.Player.stats.gutsMax}`
        : this.props.Player.stats.guts;
    const wits =
      this.props.Player.stats.wits < this.props.Player.stats.witsMax
        ? `${this.props.Player.stats.wits}/${this.props.Player.stats.witsMax}`
        : this.props.Player.stats.wits;
    const charm =
      this.props.Player.stats.charm < this.props.Player.stats.charmMax
        ? `${this.props.Player.stats.charm}/${this.props.Player.stats.charmMax}`
        : this.props.Player.stats.charm;
    const weaponString =
      this.props.Player.equipment.right === undefined
        ? this.props.Player.equipment.left === undefined
          ? "None"
          : this.props.Player.equipment.left.name
        : this.props.Player.equipment.right.name;
    const armorString =
      this.props.Player.equipment.body === undefined
        ? "None"
        : this.props.Player.equipment.body.name;
    console.log(this.props.Player.equipment.body);
    const weaponAndArmor = weaponString + " & " + armorString;

    return (
      <div>
        {/* display for small screens */}
        <div className="d-block d-sm-none statbar">
          <Row>
            <Col className="col-10">
              <Row>
                <Col className="col-4">{this.props.Player.nameAndRank}</Col>
                <Col className="col-4">XP: {this.props.Player.experience}</Col>
                <Col className="col-4">
                  Cash: {"$"}
                  {this.props.Player.cash}
                </Col>
              </Row>
              <Row>
                <Col className="col-4">Guts: {guts}</Col>
                <Col className="col-4">Wits: {wits}</Col>
                <Col className="col-4">Charm: {charm}</Col>
              </Row>
              <Row>
                <Col className="col-4">Qsts: {quests}</Col>
                <Col className="col-4">Lvl: {this.props.Player.level}</Col>
                <Col className="col-4">{weaponAndArmor}</Col>
              </Row>
            </Col>
            <Col className="col-1">
              <Button
                className="character-button"
                variant="dark"
                onClick={this.props.characterPage}
              >
                <img src={"/images/dragon-head-small.png"} />
              </Button>
            </Col>
          </Row>
        </div>

        {/* display for large screens */}
        <div className="d-none d-sm-block statbar">
          <Row>
            <Col>
              <Row>
                <Col className="col">{this.props.Player.nameAndRank}</Col>
                <Col className="col">Exp: {this.props.Player.experience}</Col>
                <Col className="col">
                  Cash: {"$"}
                  {this.props.Player.cash}
                </Col>
                <Col className="col">Quests: {quests}</Col>
              </Row>
              <Row>
                <Col className="col">Lvl: {this.props.Player.level}</Col>
                <Col className="col">Guts: {guts}</Col>
                <Col className="col">Wits: {wits}</Col>
                <Col className="col">Charm: {charm}</Col>
                <Col className="col">{weaponAndArmor}</Col>
              </Row>
            </Col>
            <Col className="col-1 me-3">
              <Button
                className="character-button"
                variant="dark"
                onClick={this.props.characterPage}
              >
                <img src={"/images/dragon-head-small.png"} />
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default StatBar;
