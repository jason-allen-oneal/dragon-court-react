import React from "react";
import { Socket } from "socket.io-client";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import GameScreen from "./game-screen";
import Chat from "./chat";

type Props = {
  size: string;
  socket: Socket;
  request: (target: string, input: any) => Promise<any>;
};

type State = {
  User: DC.User | null;
  Player: DC.Player | null;
  inGame: boolean;
  playerFetched: boolean;
};

class Display extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      User: window.User,
      Player: null,
      inGame: false,
      playerFetched: false,
    };

    this.exitGame = this.exitGame.bind(this);
    this.enterGame = this.enterGame.bind(this);

    this.props.socket.emit("player-get", { pid: window.pid });
  }

  componentDidMount(): void {
    this.props.socket.on("player-get-response", (data) => {
      console.log("player-get-response", data);
      this.setState({
        Player: data,
        playerFetched: true,
      });
    });
  }

  exitGame() {}

  enterGame() {
    this.setState({
      inGame: true,
    });
  }

  render() {
    if (this.state.playerFetched) {
      if (this.props.size == "large") {
        return (
          <Row>
            <Col className="ms-5">
              <GameScreen
                User={this.state.User}
                Player={this.state.Player}
                socket={this.props.socket}
                request={this.props.request}
                exitGame={this.exitGame}
                enterGame={this.enterGame}
              />
            </Col>
            <Col md="4">
              <Chat
                User={this.state.User}
                Player={this.state.Player}
                inGame={this.state.inGame}
              />
            </Col>
          </Row>
        );
      } else {
        return (
          <>
            <div className="chatDiv"></div>
            <Row>
              <Col sm="auto">
                <GameScreen
                  User={this.state.User}
                  Player={this.state.Player}
                  socket={this.props.socket}
                  request={this.props.request}
                  exitGame={this.exitGame}
                  enterGame={this.enterGame}
                />
              </Col>
            </Row>
          </>
        );
      }
    }
  }
}

export default Display;
