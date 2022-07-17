import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import Template from "../../gameTemplate";
const template = new Template();

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

  getOptions() {
    const options = [];
    if (this.state.creature.options !== "") {
      if (this.state.creature.options.includes("Trade")) {
        options.push(<Button onClick={() => this.trade()}>Trade</Button>);
      }
      if (this.state.creature.options.includes("Pay")) {
        options.push(<Button onClick={() => this.pay()}>Pay</Button>);
      }
      if (this.state.creature.options.includes("Help")) {
        options.push(<Button onClick={() => this.help()}>Help</Button>);
      }
      if (this.state.creature.options.includes("Feed")) {
        options.push(<Button onClick={() => this.feed()}>Feed</Button>);
      }
      if (this.state.creature.options.includes("Answer")) {
        options.push(<Button onClick={() => this.answer()}>Answer</Button>);
      }
      if (this.state.creature.options.includes("Seduce")) {
        options.push(<Button onClick={() => this.seduce()}>Seduce</Button>);
      }
    }
    return options;
  }

  render(): React.ReactNode {
    const options = this.getOptions();
    const { main, attack, flee } = template.encounterBlurb();
    const blurb = template.format(main, [
      this.state.creature.region,
      this.state.creature.name,
    ]);
    const creatureNameLower = this.state.creature.name.toLowerCase();
    const creatureImageSlug = creatureNameLower.replace(" ", "_");
    const image = "/images/game/monsters/" + creatureImageSlug + ".jpg";
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
            <img src={image} />
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
              <Col className="col-12 text-center">&nbsp;</Col>
            </Row>
            <Row>
              <Col className="col-12 text-center">
                <Button onClick={() => this.attack()}>{attack}</Button>
              </Col>
            </Row>
            <Row>
              <Col className="col-12 text-center">
                <Button onClick={() => this.flee()}>{flee}</Button>
              </Col>
            </Row>
            {options.length > 0 &&
              options.map((option: any) => (
                <Row>
                  <Col className="col-12 text-center">{option}</Col>
                </Row>
              ))}
          </Col>
        </Row>
        <Row>
          <Col className="col-12">
            <p>{blurb}</p>
          </Col>
        </Row>
      </div>
    );
  }
}
