import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import ShopNPC from "../../../components/shopNPC";
import ShopItems from "../../../components/shopItems";
import ShopExit from "../../../components/shopExit";
import ShopToggle from "../../../components/shopToggle";

type Props = {
  User: DC.User;
  Player: DC.Player;
  exitBuilding: () => void;
  items: DC.Item[];
  blurb: string;
  itemClick: (item: DC.Item) => void;
  transactionType: string;
  transactionTypeChange: (event: any) => void;
  performTrade: () => void;
  identify: () => void;
};

type State = {
  User: DC.User;
  Player: DC.Player;
  items: DC.Item[];
  transactionType: string;
};

class Smithy extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      User: this.props.User,
      Player: this.props.Player,
      items: this.props.items,
      transactionType: this.props.transactionType,
    };
  }

  render(): React.ReactNode {
    return (
      <>
        <Row>
          <ShopExit exitBuilding={this.props.exitBuilding} />
          <ShopToggle
            performTrade={this.props.performTrade}
            transactionTypeChange={this.props.transactionTypeChange}
            transactionType={this.props.transactionType}
          />
        </Row>

        <Row>
          <Col className="col-4">
            <ShopNPC blurb={this.props.blurb} type={"smithy"} />
            <>
              <Row>
                <Col>&nbsp;</Col>
              </Row>
              <Row>
                <Col>
                  <Button
                    variant={"outline-light"}
                    onClick={this.props.identify}
                  >
                    Identify $40
                  </Button>
                </Col>
              </Row>
            </>
          </Col>
          <Col className="col-8 item-table-container">
            <ShopItems
              User={this.state.User}
              Player={this.state.Player}
              items={this.state.items}
              itemClick={this.props.itemClick}
            />
          </Col>
        </Row>
      </>
    );
  }
}

export default Smithy;
