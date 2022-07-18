import React from "react";

import Table from "react-bootstrap/Table";
import ListItem from "./playerItemRows";

type Props = {
  User: DC.User;
  Player: DC.Player;
  items: DC.InventoryItem[];
  itemClick: (item: DC.InventoryItem) => void;
};

type State = {
  User: DC.User;
  Player: DC.Player;
  items: DC.InventoryItem[];
};

export default class PlayerItems extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      User: this.props.User,
      Player: this.props.Player,
      items: this.props.items,
    };
  }

  render(): React.ReactNode {
    return (
      <Table className="inventoryItems" striped hover>
        <thead>
          <tr>
            <th>Name</th>
            <th colSpan={2}>Stats</th>
          </tr>
        </thead>
        <tbody>
          {this.state.items &&
            this.state.items.map((item: DC.InventoryItem) => (
              <ListItem
                key={`${item.id}-${item.id}`}
                item={item}
                onClick={this.props.itemClick}
              />
            ))}
        </tbody>
      </Table>
    );
  }
}
