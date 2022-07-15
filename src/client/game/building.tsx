import React from "react";

import Template from "../gameTemplate";
const template = new Template();

import Armor from "../game/buildings/armor";
import Clan from "../game/buildings/clan";
import Court from "../game/buildings/court";
import Den from "../game/buildings/den";
import Diner from "../game/buildings/diner";
import Gem from "../game/buildings/gem";
import Guard from "../game/buildings/guard";
import Guild from "../game/buildings/guild";
import Healer from "../game/buildings/healer";
import Inn from "../game/buildings/inn";
import Magic from "../game/buildings/magic";
import PostOffice from "../game/buildings/postOffice";
import Smithy from "../game/buildings/smithy";
import SilverStorage from "../game/buildings/storage";
import Tavern from "../game/buildings/tavern";
import Trade from "../game/buildings/trade";
import Weapons from "./buildings/weapons";
import { Socket } from "socket.io-client";

type Props = {
  type: string;
  Player: DC.Player;
  User: DC.User;
  socket: Socket;
  performQuest: (region: string, type: string) => void;
  exitBuilding: () => void;
  itemClick: (item: DC.Item) => void;
  selectedItem: DC.InventoryItem | DC.Item | null;
  transactionType: string;
  transactionTypeChange: (type: string) => void;
  performTrade: () => void;
  polish: () => void;
  identify: () => void;
  rest: (location: string) => void;
  rumor: () => void;
  heal: () => void;
  tithe: () => void;
  info: () => void;
};

type State = {
  User: DC.User;
  Player: DC.Player;
  items: DC.Item[] | null;
  blurb: string;
  transactionType: string;
  selectedItem: DC.InventoryItem | DC.Item | null;
  ready: boolean;
};

export default class Building extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      User: this.props.User,
      Player: this.props.Player,
      blurb: template.shopBlurb(this.props.type),
      transactionType: this.props.transactionType,
      selectedItem: this.props.selectedItem,
      items: null,
      ready: false,
    };

    this.props.socket.emit("shop-items-get", {
      type: this.props.type,
      region: this.state.Player.region,
    });
  }

  componentDidMount(): void {
    this.props.socket.on("shop-items-get-response", (data) => {
      this.setState({
        items: data,
        ready: true,
      });
    });
  }

  renderBuilding(building: React.ReactNode): React.ReactNode {
    return building;
  }

  getBuilding(): React.ReactNode {
    let building;
    if (this.state.ready) {
      switch (this.props.type) {
        case "court":
          building = (
            <Court
              Player={this.state.Player}
              User={this.state.User}
              performQuest={this.props.performQuest}
              exitBuilding={this.props.exitBuilding}
              blurb={this.state.blurb}
            />
          );

        case "armor":
          building = (
            <Armor
              Player={this.state.Player}
              User={this.state.User}
              exitBuilding={this.props.exitBuilding}
              items={this.state.items}
              blurb={this.state.blurb}
              itemClick={this.props.itemClick}
              transactionType={this.state.transactionType}
              transactionTypeChange={this.props.transactionTypeChange}
              performTrade={this.props.performTrade}
              polish={this.props.polish}
            />
          );

        case "clan":
          building = (
            <Clan
              Player={this.state.Player}
              User={this.state.User}
              exitBuilding={this.props.exitBuilding}
              items={this.state.items}
              blurb={this.state.blurb}
            />
          );

        case "den":
          building = (
            <Den
              Player={this.state.Player}
              User={this.state.User}
              exitBuilding={this.props.exitBuilding}
              items={this.state.items}
              blurb={this.state.blurb}
            />
          );

        case "diner":
          building = (
            <Diner
              Player={this.state.Player}
              User={this.state.User}
              exitBuilding={this.props.exitBuilding}
              items={this.state.items}
              blurb={this.state.blurb}
            />
          );

        case "dragon_guard":
          building = (
            <Guard
              Player={this.state.Player}
              User={this.state.User}
              exitBuilding={this.props.exitBuilding}
              items={this.state.items}
              blurb={this.state.blurb}
            />
          );

        case "gem":
          building = (
            <Gem
              Player={this.state.Player}
              User={this.state.User}
              exitBuilding={this.props.exitBuilding}
              items={this.state.items}
              blurb={this.state.blurb}
              itemClick={this.props.itemClick}
              transactionType={this.state.transactionType}
              transactionTypeChange={this.props.transactionTypeChange}
              performTrade={this.props.performTrade}
            />
          );

        case "guild":
          building = (
            <Guild
              Player={this.state.Player}
              User={this.state.User}
              exitBuilding={this.props.exitBuilding}
              items={this.state.items}
              blurb={this.state.blurb}
            />
          );

        case "healer":
          building = (
            <Healer
              Player={this.state.Player}
              User={this.state.User}
              exitBuilding={this.props.exitBuilding}
              items={this.state.items}
              blurb={this.state.blurb}
              heal={this.props.heal}
              tithe={this.props.tithe}
            />
          );

        case "inn":
          building = (
            <Inn
              Player={this.state.Player}
              User={this.state.User}
              exitBuilding={this.props.exitBuilding}
              items={this.state.items}
              blurb={this.state.blurb}
            />
          );

        case "magic":
          building = (
            <Magic
              Player={this.state.Player}
              User={this.state.User}
              exitBuilding={this.props.exitBuilding}
              items={this.state.items}
              blurb={this.state.blurb}
              itemClick={this.props.itemClick}
              transactionType={this.state.transactionType}
              transactionTypeChange={this.props.transactionTypeChange}
              performTrade={this.props.performTrade}
            />
          );

        case "post_office":
          building = (
            <PostOffice
              Player={this.state.Player}
              User={this.state.User}
              exitBuilding={this.props.exitBuilding}
              items={this.state.items}
              blurb={this.state.blurb}
            />
          );

        case "smithy":
          building = (
            <Smithy
              Player={this.state.Player}
              User={this.state.User}
              exitBuilding={this.props.exitBuilding}
              items={this.state.items}
              blurb={this.state.blurb}
              itemClick={this.props.itemClick}
              transactionType={this.state.transactionType}
              transactionTypeChange={this.props.transactionTypeChange}
              performTrade={this.props.performTrade}
              identify={this.props.identify}
            />
          );

        case "storage":
          building = (
            <SilverStorage
              Player={this.state.Player}
              User={this.state.User}
              exitBuilding={this.props.exitBuilding}
              items={this.state.items}
              blurb={this.state.blurb}
              itemClick={this.props.itemClick}
            />
          );

        case "tavern":
          building = (
            <Tavern
              Player={this.state.Player}
              User={this.state.User}
              exitBuilding={this.props.exitBuilding}
              items={this.state.items}
              blurb={this.state.blurb}
              rest={this.props.rest}
              rumor={this.props.rumor}
            />
          );

        case "trade":
          building = (
            <Trade
              Player={this.state.Player}
              User={this.state.User}
              exitBuilding={this.props.exitBuilding}
              items={this.state.items}
              blurb={this.state.blurb}
              itemClick={this.props.itemClick}
              transactionType={this.state.transactionType}
              transactionTypeChange={this.props.transactionTypeChange}
              performTrade={this.props.performTrade}
              info={this.props.info}
            />
          );

        case "weapons":
          building = (
            <Weapons
              Player={this.state.Player}
              User={this.state.User}
              exitBuilding={this.props.exitBuilding}
              items={this.state.items}
              blurb={this.state.blurb}
              itemClick={this.props.itemClick}
              transactionType={this.state.transactionType}
              transactionTypeChange={this.props.transactionTypeChange}
              performTrade={this.props.performTrade}
              identify={this.props.identify}
            />
          );
          break;
      }

      return (
        <div
          style={{
            backgroundColor: "#0a2200",
            color: "#ffffff",
            height: "100%",
            padding: "0.8em",
          }}
        >
          {building}
        </div>
      );
    }
  }

  render(): React.ReactNode {
    return this.renderBuilding(this.getBuilding());
  }
}
