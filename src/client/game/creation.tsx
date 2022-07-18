import React from "react";
import io, { Socket } from "socket.io-client";
let socket: Socket = io(`http://23.234.250.103:33039`);

import Template from "../gameTemplate";
const template = new Template();

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "../css/creation.css";

import CreationRadio from "../components/creationRadio";

interface State {
  freePts: number;
  charClass: string;
  cash: number;
  guts: number;
  wits: number;
  charm: number;
  peasant: boolean;
  noble: boolean;
  warrior: boolean;
  wizard: boolean;
  trader: boolean;
  lastPointsUsed: number;
}

export default class Creation extends React.Component<any, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      freePts: 20,
      charClass: "peasant",
      cash: 25,
      guts: 0,
      wits: 0,
      charm: 0,
      peasant: true,
      noble: false,
      warrior: false,
      wizard: false,
      trader: false,
      lastPointsUsed: 0,
    };
  }

  creationStatClick = (stat: string, action: string) => {
    let cost = 1;
    let error = null,
      cause = null,
      effect = null,
      add = null,
      query = null;

    if (stat == "guts" || stat == "wits" || stat == "charm") {
      cost = 3;
    }

    if (action == "plus" || action == "add") {
      query = this.state.freePts - cost < 0;
      error = "You do no have enough free points!";
      cause = this.state.freePts - cost;
      if (stat == "cash") {
        add = 25;
      } else {
        add = 1;
      }
      effect = (this.state[stat as keyof typeof this.state] as number) + add;
    } else {
      if (stat == "cash") {
        add = 25;
      } else {
        add = 1;
      }

      let whatever = this.state[stat as keyof typeof this.state] as number;

      query = whatever - add < 0;
      error = "You cannot reduce a stat below 0!";
      cause = this.state.freePts + cost;
      effect = (this.state[stat as keyof typeof this.state] as number) - add;
    }

    if (query) {
      template.modal("error", "Ooops!", error);
    } else {
      this.setState({
        freePts: cause,
      });
      if (stat == "guts") {
        this.setState({
          guts: effect,
        });
      } else if (stat == "wits") {
        this.setState({
          wits: effect,
        });
      } else if (stat == "charm") {
        this.setState({
          charm: effect,
        });
      } else {
        this.setState({
          cash: effect,
        });
      }
    }
  };

  creationClassChange = (cls: string) => {
    if (cls !== this.state.charClass) {
      if (this.state.lastPointsUsed > 0) {
        const refund = this.state.freePts + this.state.lastPointsUsed;

        this.setState({
          lastPointsUsed: 0,
        });
        this.setState({
          freePts: refund,
        });
      }
    }

    let cost = 1,
      error = null,
      cause = null,
      query = null;

    switch (cls) {
      case "peasant":
        cost = 0;
        this.setState({
          peasant: true,
          noble: false,
          warrior: false,
          wizard: false,
          trader: false,
        });
        break;

      case "noble":
        cost = 12;
        this.setState({
          peasant: false,
          noble: true,
          warrior: false,
          wizard: false,
          trader: false,
        });
        break;

      case "warrior":
        cost = 8;
        this.setState({
          peasant: false,
          noble: false,
          warrior: true,
          wizard: false,
          trader: false,
        });
        break;

      case "wizard":
        cost = 9;
        this.setState({
          peasant: false,
          noble: false,
          warrior: false,
          wizard: true,
          trader: false,
        });
        break;

      case "trader":
        cost = 10;
        this.setState({
          peasant: false,
          noble: false,
          warrior: false,
          wizard: false,
          trader: true,
        });
        break;
    }

    this.setState({
      lastPointsUsed: cost,
    });

    query = this.state.freePts - cost < 0;
    error = "You do not have enough free points!";
    cause = this.state.freePts - cost;

    if (query) {
      template.modal("error", "Ooops!", error);
    } else {
      this.setState({
        charClass: cls,
        freePts: cause,
      });
    }
  };

  handleSubmission = () => {
    if (this.state.freePts > 0) {
      template.modal(
        "error",
        "Ooops!",
        "You still have free points to distribute!"
      );
      return;
    }

    const obj = {
      owner: window.User.id,
      guts: this.state.guts,
      wits: this.state.wits,
      charm: this.state.charm,
      cash: this.state.cash,
      class: this.state.charClass,
      bg: window.backstory,
    };

    socket.emit("player-create", obj);
    return;
  };

  componentDidMount() {
    socket.on("player-create-response", (data: any) => {
      if (data.status == "ok") {
        this.props.handleSubmit();
      } else {
        template.modal("error", "Ooops!", "Something went terribly wrong!");
      }
    });
  }

  render() {
    const backstory = template.generateBackstory();

    return (
      <React.StrictMode>
        <Form>
          <Row>
            <Col className="text-center">
              <h2>Character Creation</h2>
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <span id="background">{backstory}</span>
            </Col>
          </Row>
          <Row>
            <Col>&nbsp;</Col>
          </Row>
          <Row>
            <Col className="text-center">
              <span className="freePts">
                Free Points: <span id="freePts">{this.state.freePts}</span>
              </span>
            </Col>
          </Row>
          <Row>
            <Col>&nbsp;</Col>
          </Row>
          <Row>
            <Col className="text-center">Cost: 3</Col>
          </Row>
          <Row className="justify-content-center">
            <Col className="justify-content-center creation-stat-block">
              <Row>
                <Col className="text-center creation-stat">Guts</Col>
              </Row>
              <Row>
                <Col className="text-center">
                  <span id="gutsStat">{this.state.guts}</span>
                </Col>
              </Row>
              <Row>
                <Col className="text-center col-6">
                  <Button
                    variant="warning"
                    type="button"
                    size="sm"
                    onClick={() => this.creationStatClick("guts", "add")}
                  >
                    +
                  </Button>
                </Col>
                <Col className="text-center col-6">
                  <Button
                    variant="warning"
                    type="button"
                    size="sm"
                    onClick={() => this.creationStatClick("guts", "minus")}
                  >
                    -
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col className="justify-content-center creation-stat-block">
              <Row>
                <Col className="text-center creation-stat">Wits</Col>
              </Row>
              <Row>
                <Col className="text-center">
                  <span id="witsStat">{this.state.wits}</span>
                </Col>
              </Row>
              <Row>
                <Col className="text-center col-6">
                  <Button
                    variant="warning"
                    type="button"
                    size="sm"
                    onClick={() => this.creationStatClick("wits", "add")}
                  >
                    +
                  </Button>
                </Col>
                <Col className="text-center col-6">
                  <Button
                    variant="warning"
                    type="button"
                    size="sm"
                    onClick={() => this.creationStatClick("wits", "minus")}
                  >
                    -
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col className="justify-content-center creation-stat-block">
              <Row>
                <Col className="text-center creation-stat">Charm</Col>
              </Row>
              <Row>
                <Col className="text-center">
                  <span id="charmStat">{this.state.charm}</span>
                </Col>
              </Row>
              <Row>
                <Col className="text-center col-6">
                  <Button
                    variant="warning"
                    type="button"
                    size="sm"
                    onClick={() => this.creationStatClick("charm", "add")}
                  >
                    +
                  </Button>
                </Col>
                <Col className="text-center col-6">
                  <Button
                    variant="warning"
                    type="button"
                    size="sm"
                    onClick={() => this.creationStatClick("charm", "minus")}
                  >
                    -
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>&nbsp;</Col>
          </Row>
          <Row className="justify-content-center">
            <Col className="col-6 creation-stat-block">
              <Row>
                <Col className="text-center">Choose Class</Col>
              </Row>
              <Row>
                <Col>
                  <CreationRadio
                    classData="Peasant 0p"
                    checked={this.state.peasant}
                    radioClick={this.creationClassChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <CreationRadio
                    classData="Noble 12p"
                    checked={this.state.noble}
                    radioClick={this.creationClassChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <CreationRadio
                    classData="Warrior 8p"
                    checked={this.state.warrior}
                    radioClick={this.creationClassChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <CreationRadio
                    classData="Wizard 9p"
                    checked={this.state.wizard}
                    radioClick={this.creationClassChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <CreationRadio
                    classData="Trader 10p"
                    checked={this.state.trader}
                    radioClick={this.creationClassChange}
                  />
                </Col>
              </Row>
            </Col>
            <Col className="col-6 creation-stat-block">
              <Row>
                <Col className="text-center">
                  Starting Cash
                  <br />
                  1p = $25
                </Col>
              </Row>
              <Row>
                <Col className="text-center">
                  $<span id="cashStat">{this.state.cash}</span>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col className="col-6 text-center">
                  <Button
                    variant="warning"
                    type="button"
                    size="sm"
                    onClick={() => this.creationStatClick("cash", "add")}
                  >
                    +
                  </Button>
                </Col>
                <Col className="col-6 text-center">
                  <Button
                    variant="warning"
                    type="button"
                    size="sm"
                    onClick={() => this.creationStatClick("cash", "minus")}
                  >
                    -
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>&nbsp;</Col>
          </Row>
          <Row>
            <Col className="text-center">
              <Button
                variant="outline-dark"
                type="button"
                onClick={this.handleSubmission}
              >
                Create!
              </Button>
            </Col>
          </Row>
        </Form>
      </React.StrictMode>
    );
  }
}
