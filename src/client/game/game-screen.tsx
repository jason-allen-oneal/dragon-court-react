import React from "react";
import { Socket } from "socket.io-client";

import Template from "../gameTemplate";
const template = new Template();

import WelcomeScreen from "../components/welcomeScreen";

import Region from "./region";
import StatBar from "./stat-bar";
import Building from "./building";
import Character from "./character";
import Encounter from "./encounter";

type Props = {
  User: DC.User;
  Player: DC.Player;
  socket: Socket;
  request: (target: string, input: any) => Promise<any>;
  exitGame: () => void;
  enterGame: () => void;
};

type State = {
  User: DC.User;
  Player: DC.Player;
  inBuilding: boolean;
  building: string;
  inCharacterPage: boolean;
  inEncounter: boolean;
  creature: DC.Creature | null;
  firstPlay: boolean;
  transactionType: string;
  selectedItem: DC.InventoryItem | DC.Item | null;
  inWelcome: boolean;
};

class GameScreen extends React.Component<Props, State> {
  selectedItem: DC.InventoryItem | DC.Item | null;

  constructor(props: any) {
    super(props);

    this.regionChange = this.regionChange.bind(this);
    this.enterBuilding = this.enterBuilding.bind(this);
    this.exitBuilding = this.exitBuilding.bind(this);
    this.performQuest = this.performQuest.bind(this);
    this.characterPage = this.characterPage.bind(this);
    this.goAdventuring = this.goAdventuring.bind(this);
    this.itemClick = this.itemClick.bind(this);
    this.polish = this.polish.bind(this);
    this.identify = this.identify.bind(this);
    this.info = this.info.bind(this);
    this.rest = this.rest.bind(this);
    this.rumor = this.rumor.bind(this);
    this.heal = this.heal.bind(this);
    this.transactionTypeChange = this.transactionTypeChange.bind(this);
    this.performTrade = this.performTrade.bind(this);
    this.update = this.update.bind(this);
    this.exitCharacter = this.exitCharacter.bind(this);
    this.inventoryItemUse = this.inventoryItemUse.bind(this);
    this.inventoryItemInfo = this.inventoryItemInfo.bind(this);

    const p = this.props.Player;
    p.nameAndRank = this.props.Player.rankString + " " + this.props.User.name;

    this.state = {
      inBuilding: false,
      building: "",
      inCharacterPage: false,
      inEncounter: false,
      creature: null,
      User: this.props.User,
      Player: p,
      firstPlay: true,
      transactionType: "buy",
      selectedItem: null,
      inWelcome: true,
    };

    this.selectedItem = null;
  }

  update() {
    this.props.socket.emit("player-update", this.state.Player);
  }

  componentDidMount(): void {
    this.props.socket.on("player-update-response", (data: any) => {
      if (data.status == "ok") {
        if (data.action === "purchased") {
          template.modal(
            "shop-success",
            "Success!",
            "You have purchased `" + data.item + "`."
          );
        } else if (data.action === "sold") {
          template.modal(
            "shop-success",
            "Success!",
            "You have sold `" + data.item + "`."
          );
        } else if (data.action === "equipped") {
          template.modal(
            "inventory-success",
            "Success!",
            "You have equipped `" + data.item + "`."
          );
        } else if (data.action === "identified") {
          template.modal(
            "shop-success",
            "Success!",
            "You have identified `" + data.item + "`."
          );
        }

        this.setState({
          Player: data.data,
          selectedItem: null,
        });
      } else {
        template.modal("update-error", "Ooops!", data.data);
      }
    });

    this.props.socket.on("quest-init-response", (data: any) => {
      this.setState({
        creature: data.creature,
        inEncounter: true,
      });
    });
  }

  characterPage() {
    this.setState({
      inCharacterPage: true,
    });
    this.update();
  }

  regionChange(region: string) {
    const player = this.state.Player;

    const newQuests = player.quests - 1;
    switch (region) {
      case "castle":
        player.quests = newQuests;
        break;

      case "forest":
        player.quests = newQuests;
        break;

      case "mounds":
        player.quests = newQuests;
        break;

      case "mountains":
        player.quests = newQuests;
        break;

      case "fields":
        player.quests = newQuests;
        break;

      case "sea":
        player.quests = newQuests;
        break;
    }

    player.region = region;
    this.setState({
      Player: player,
    });
    this.update();
  }

  enterBuilding(type: string) {
    this.setState({
      inBuilding: true,
      building: type,
    });
    this.update();
  }

  exitBuilding() {
    this.setState({
      inBuilding: false,
      building: "",
    });
    this.update();
  }

  transactionTypeChange(event: any) {
    event.preventDefault();
    this.setState({
      transactionType: event.target.value,
    });
  }

  itemClick(item: DC.Item | DC.InventoryItem) {
    this.selectedItem = item;

    this.setState({
      selectedItem: item,
    });

    console.log("itemClick", this.selectedItem);
  }

  performTrade() {
    if (this.state.selectedItem === null) {
      template.modal("shop-error", "Ooops!", "You have not selected an item.");
      return false;
    }

    if (this.state.transactionType === "buy") {
      const cost = this.state.selectedItem.cost;
      if (cost > this.state.Player.cash) {
        template.modal(
          "shop-error",
          "Ooops!",
          "You do not have enough money for this transaction."
        );

        this.setState({
          selectedItem: null,
        });

        return false;
      } else {
        console.log("performTrade this.selectedItem", this.selectedItem);
        this.props.socket.emit("player-buy-item", {
          player: this.state.Player,
          item: this.state.selectedItem.id,
        });
      }
    }

    if (this.state.transactionType === "sell") {
      this.props.socket.emit("player-sell-item", {
        player: this.state.Player,
        item: this.state.selectedItem.id,
      });
    }
  }

  polish() {
    this.props.socket.emit("player-polish-item", {
      player: this.state.Player,
      item: this.state.selectedItem.item,
    });
  }

  identify() {
    this.props.socket.emit("player-identify-item", {
      player: this.state.Player,
      item: this.state.selectedItem.item,
    });
  }

  info() {}

  rest(location: string) {}

  rumor() {}

  heal() {}

  tithe() {}

  performQuest(region: string) {
    this.props.socket.emit("quest-init", { region: region });
  }

  exitCharacter() {
    this.setState({
      inCharacterPage: false,
    });
    this.update();
  }

  inventoryItemUse() {
    if (this.state.selectedItem === null) {
      template.modal(
        "inventory-error",
        "Ooops!",
        "You have not selected an item."
      );
      return false;
    }

    if (this.state.selectedItem.equippable) {
      this.props.socket.emit("player-equip-item", {
        player: this.state.Player,
        item: this.state.selectedItem.id,
      });
    } else {
      if (this.state.inEncounter) {
        if (this.state.selectedItem.type === "battle") {
        }
      } else {
      }
    }
  }

  inventoryItemInfo() {
    if (this.state.selectedItem === null) {
      template.modal(
        "inventory-error",
        "Ooops!",
        "You have not selected an item."
      );
      return false;
    }
  }

  inventoryDump() {
    if (this.state.selectedItem === null) {
      template.modal(
        "inventory-error",
        "Ooops!",
        "You have not selected an item."
      );
      return false;
    }
  }

  inventoryRecover() {}

  inventoryPeer() {}

  goAdventuring() {
    const user = this.state.User;
    user.firstRun = 0;

    this.setState({
      User: user,
      firstPlay: false,
      inWelcome: false,
    });

    this.props.socket.emit("user-update", this.state.User);

    this.props.enterGame();
  }

  renderStatBar() {
    return (
      <StatBar
        Player={this.state.Player}
        User={this.state.User}
        exitGame={this.props.exitGame}
        characterPage={this.characterPage}
      />
    );
  }

  renderGameScreen() {
    if (this.state.User.firstRun) {
      return (
        <WelcomeScreen
          text={template.getText("awaken.first")}
          goAdventuring={this.goAdventuring}
        />
      );
    } else if (this.state.firstPlay) {
      return (
        <WelcomeScreen
          text={template.awakenText(this.state.User, this.state.Player)}
          goAdventuring={this.goAdventuring}
        />
      );
    } else {
      if (this.state.inBuilding) {
        return (
          <Building
            type={this.state.building}
            User={this.state.User}
            Player={this.state.Player}
            socket={this.props.socket}
            exitBuilding={this.exitBuilding}
            performQuest={this.performQuest}
            itemClick={this.itemClick}
            selectedItem={this.state.selectedItem}
            performTrade={this.performTrade}
            polish={this.polish}
            identify={this.identify}
            info={this.identify}
            rest={this.rest}
            rumor={this.rumor}
            transactionType={this.state.transactionType}
            transactionTypeChange={this.transactionTypeChange}
            heal={this.heal}
            tithe={this.tithe}
          />
        );
      } else if (this.state.inCharacterPage) {
        return (
          <Character
            Player={this.props.Player}
            User={this.props.User}
            itemClick={this.itemClick}
            selectedItem={this.state.selectedItem}
            exitScreen={this.exitCharacter}
            inventoryItemUse={this.inventoryItemUse}
            inventoryItemInfo={this.inventoryItemInfo}
            inventoryDump={this.inventoryDump}
            inventoryRecover={this.inventoryRecover}
            inventoryPeer={this.inventoryPeer}
          />
        );
      } else if (this.state.inEncounter) {
        return <Encounter creature={this.state.creature} />;
      } else if (
        !this.state.inBuilding &&
        !this.state.inEncounter &&
        !this.state.inCharacterPage
      ) {
        return (
          <Region
            Player={this.props.Player}
            User={this.props.User}
            socket={this.props.socket}
            exitGame={this.props.exitGame}
            regionChange={this.regionChange}
            enterBuilding={this.enterBuilding}
            performQuest={this.performQuest}
          />
        );
      }
    }
  }

  render(): React.ReactNode {
    const screenSize = {
      height: "22em",
      width: "70%",
      marginTop: "1.2em",
      marginRight: "1.2em",
      border: "1px solid black",
    };

    return (
      <div style={screenSize}>
        <div style={{ height: "100%" }}>{this.renderGameScreen()}</div>
        {!this.state.inWelcome && <div>{this.renderStatBar()}</div>}
      </div>
    );
  }
}

export default GameScreen;
