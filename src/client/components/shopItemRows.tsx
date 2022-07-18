import React from "react";

import "../css/building.css";

type Props = {
  item: any;
  onClick: (item: DC.Item) => void;
};

type State = {
  item: any;
};

export default class ListItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      item: this.props.item,
    };
  }

  showAttack() {
    if (this.state.item.attack == 0) {
      return "";
    } else {
      if (this.state.item.attack) {
        return `+${this.state.item.attack}a`;
      } else {
        return `${this.state.item.attack}a`;
      }
    }
  }

  showDefend() {
    if (this.state.item.defend == 0) {
      return "";
    } else {
      if (this.state.item.defend) {
        return `+${this.state.item.defend}d`;
      } else {
        return `${this.state.item.defend}d`;
      }
    }
  }

  render(): React.ReactNode {
    return (
      <tr onClick={() => this.props.onClick(this.state.item)}>
        <td>{this.state.item.name}</td>
        <td>{this.showAttack()}</td>
        <td>{this.showDefend()}</td>
        <td>{`${this.state.item.cost}`}</td>
      </tr>
    );
  }
}
