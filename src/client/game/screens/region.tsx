import React from "react";
import { Socket } from "socket.io-client";

import Castle from "./regions/castle";
import Fields from "./regions/fields";
import Forest from "./regions/forest";
import Market from "./regions/market";
import Mounds from "./regions/mounds";
import Mountains from "./regions/mountains";
import Sea from "./regions/sea";
import Town from "./regions/town";

type Props = {
  User: DC.User;
  Player: DC.Player;
  socket: Socket;
  exitGame: () => void;
  regionChange: (region: string) => void;
  enterBuilding: (type: string) => void;
  performQuest: (region: string) => void;
};

type State = {
  User: DC.User;
  Player: DC.Player;
};

class Region extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      User: this.props.User,
      Player: this.props.Player,
    };
  }

  render(): React.ReactNode {
    switch (this.state.Player.region) {
      case "town":
        return (
          <Town
            Player={this.state.Player}
            User={this.state.User}
            regionChange={this.props.regionChange}
            enterBuilding={this.props.enterBuilding}
          />
        );
        break;

      case "market":
        return (
          <Market
            Player={this.state.Player}
            User={this.state.User}
            regionChange={this.props.regionChange}
            enterBuilding={this.props.enterBuilding}
          />
        );
        break;

      case "fields":
        return (
          <Fields
            Player={this.state.Player}
            User={this.state.User}
            regionChange={this.props.regionChange}
            enterBuilding={this.props.enterBuilding}
            performQuest={this.props.performQuest}
            exitGame={this.props.exitGame}
          />
        );
        break;

      case "castle":
        return (
          <Castle
            Player={this.state.Player}
            User={this.state.User}
            regionChange={this.props.regionChange}
            enterBuilding={this.props.enterBuilding}
            exitGame={this.props.exitGame}
            performQuest={this.props.performQuest}
          />
        );
        break;

      case "forest":
        return (
          <Forest
            Player={this.state.Player}
            User={this.state.User}
            regionChange={this.props.regionChange}
            enterBuilding={this.props.enterBuilding}
            performQuest={this.props.performQuest}
            exitGame={this.props.exitGame}
          />
        );
        break;

      case "mountains":
        return (
          <Mountains
            Player={this.state.Player}
            User={this.state.User}
            regionChange={this.props.regionChange}
            enterBuilding={this.props.enterBuilding}
            performQuest={this.props.performQuest}
            exitGame={this.props.exitGame}
          />
        );
        break;

      case "mounds":
        return (
          <Mounds
            Player={this.state.Player}
            User={this.state.User}
            regionChange={this.props.regionChange}
            enterBuilding={this.props.enterBuilding}
            exitGame={this.props.exitGame}
            performQuest={this.props.performQuest}
          />
        );
        break;

      case "sea":
        return (
          <Sea
            Player={this.state.Player}
            User={this.state.User}
            regionChange={this.props.regionChange}
            enterBuilding={this.props.enterBuilding}
            performQuest={this.props.performQuest}
          />
        );
        break;
    }
  }
}

export default Region;
