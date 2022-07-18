import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import Template from "../../gameTemplate";
const template = new Template();

import EncounterOption from "../../components/encounterOption";

import "../../css/encounter.css";

type Props = {
  creature: DC.Creature;
};

type State = {
  creature: DC.Creature;
};

export default class Encounter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      creature: this.props.creature,
    };
  }

  trade() {}

  pay() {}

  help() {}

  feed() {}

  answer() {}

  seduce() {}

  attack() {}

  flee() {}

  option() {}

  getOptions() {
    const options = [];
    if (this.state.creature.options !== "") {
      if (this.state.creature.options.includes("Trade")) {
        options.push(template.getEncounterOption("Trade"));
      }
      if (this.state.creature.options.includes("Pay")) {
        options.push(template.getEncounterOption("Pay"));
      }
      if (this.state.creature.options.includes("Help")) {
        options.push(template.getEncounterOption("Help"));
      }
      if (this.state.creature.options.includes("Feed")) {
        options.push(template.getEncounterOption("Feed"));
      }
      if (this.state.creature.options.includes("Answer")) {
        options.push(template.getEncounterOption("Answer"));
      }
      if (this.state.creature.options.includes("Seduce")) {
        options.push(template.getEncounterOption("Seduce"));
      }
    }
    return options;
  }

  render(): React.ReactNode {
    const options = this.getOptions();
    console.log(options);
    const { main, attack, flee } = template.encounterBlurb();

    const blurb = template.format(main, [
      this.state.creature.region,
      this.state.creature.name,
    ]);
    const creatureNameLower = this.state.creature.name.toLowerCase();
    const creatureImageSlug = creatureNameLower.replace(" ", "_");
    const image = "/images/game/monsters/" + creatureImageSlug + ".jpg";
    let i = 1;

    return (
      <div className="encounter">
        <Row>
          <Col className="col-12 text-center">
            <h5>Quest</h5>
            <strong>{this.state.creature.name}</strong>
          </Col>
        </Row>
        <Row>
          <Col className="col-4">
            <img src={image} className="fluid" />
          </Col>
          <Col className="col-8 text-center">
            <Row>
              <Col className="col-12 text-center">
                Guts:{" "}
                <span id="encounterCreatureGuts">
                  {this.state.creature.guts}
                </span>
              </Col>
            </Row>
            <Row>
              <Col className="col-12 text-center">
                Wits:{" "}
                <span id="encounterCreatureWits">
                  {this.state.creature.wits}
                </span>
              </Col>
            </Row>
            <Row>
              <Col>&nbsp;</Col>
            </Row>
            <Row>
              <Col className="col-12 text-center">
                <Button size="sm" onClick={() => this.attack()}>
                  {attack}
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>&nbsp;</Col>
            </Row>
            <Row>
              <Col className="col-12 text-center">
                <Button size="sm" onClick={() => this.flee()}>
                  {flee}
                </Button>
              </Col>
            </Row>
            {options.length > 0 &&
              options.map((option: any) => (
                <EncounterOption
                  key={option}
                  option={option}
                  onClick={() => this.option()}
                />
              ))}
          </Col>
        </Row>
        <Row>
          <Col>&nbsp;</Col>
        </Row>
        <Row>
          <Col className="col-12 text-center">
            <p>{blurb}</p>
          </Col>
        </Row>
      </div>
    );
  }
}
