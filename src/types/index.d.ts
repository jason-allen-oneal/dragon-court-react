import { Socket } from "socket.io-client";

export {};
declare module "strings";

declare global {
  interface Window {
    baseURL: string;
    backstory: string;
    pid: number;
    User: DC.User;
    socket: Socket;
  }

  namespace DC {
    interface RequestData {
      status: string;
      data?: any;
      message?: string;
    }

    type Props = {
      User: DC.User;
      Player?: DC.Player | {};
    };

    interface User {
      id: number;
      name: string;
      email: string;
      hasChar: number;
      firstRun: number;
      chat: number;
      token: string;
    }

    type Skill = {
      skill: number;
      max: number;
    };

    interface Player {
      id: number;
      owner: number;
      rankString: string;
      nameAndRank: string;
      region: string;
      class: string;
      background: string;
      alliance: DC.Alliance;
      effects: string[];
      stats: {
        guts: number;
        gutsMax: number;
        wits: number;
        witsMax: number;
        charm: number;
        charmMax: number;
        attack: number;
        defend: number;
        skill: number;
      };
      skills: { fighter: DC.Skill; magic: DC.Skill; trade: DC.Skill };
      level: number;
      experience: number;
      quests: number;
      questsMax: number;
      cash: number;
      rank: number;
      backpack: number;
      backpackMax: number;
      fame: number;
      favor: number;
      place: string;
      location: string;
      skilled?: number;
      cashToday?: number;
      expToday?: number;
      gutsToday?: number;
      witsToday?: number;
      charmToday?: number;
      totalGuts?: number;
      totalWits?: number;
      totalCharm?: number;
      totalSkill?: number;
      totalAttack?: number;
      totalDefend?: number;
      questsToday?: number;
      totalGuildSkills?: number;
      inventory?: DC.InventoryItem[];
      equipment?: {
        head: DC.InventoryItem;
        body: DC.InventoryItem;
        feet: DC.InventoryItem;
        left: DC.InventoryItem;
        right: DC.InventoryItem;
      };
    }

    interface equipment {
      head?: DC.InventoryItem;
      body?: DC.InventoryItem;
      feet?: DC.InventoryItem;
      left?: DC.InventoryItem;
      right?: DC.InventoryItem;
    }

    interface Item {
      id: number;
      item?: number;
      name: string;
      region: string;
      identified?: number;
      equipped?: number;
      shop: string;
      type: string;
      location: string;
      guts: number;
      wits: number;
      charm: number;
      attack: number;
      defend: number;
      skill: number;
      cost: number;
      func: string;
      equippable: number;
      lvl: number;
      maxEnchants: number;
      dropRate: number;
      isSilver: number;
      isCrystal: number;
      attributes: string;
    }

    interface InventoryItem {
      id?: number;
      lvl?: number;
      item: number;
      name: string;
      identifiedName?: string;
      region: string;
      shop: string;
      type: string;
      location: string;
      baseGuts: number;
      baseWits: number;
      baseCharm: number;
      baseAttack: number;
      baseDefend: number;
      baseSkill: number;
      cost: number;
      func: string;
      equippable: number;
      maxEnchants: number;
      isSilver: number;
      isCrystal: number;
      qty: number;
      equipped: number;
      identified: number;
      abilities: string;
      guts: number;
      wits: number;
      charm: number;
      attack: number;
      defend: number;
      skill: number;
      timesEnchanted: number;
      inStorage: number;
      requiredLevel: number;
      itemLevel: number;
      attributes: string;
    }

    interface Creature {
      id: number;
      name: string;
      guts: number;
      wits: number;
      exp: number;
      fame: number;
      abilities: string;
      options: string;
      region: string;
      items: string;
      level: number;
    }

    interface Alliance {
      id: number;
      name: string;
      creator: number | DC.Player;
      time: number;
      abilities: string;
      members: number;
      membership: number;
      power: number;
    }

    interface Strings {
      creation: {
        race: string[];
        adj: string[];
        loc: string[];
        desc: string[];
      };
      awaken: {
        first: string;
        start: string;
        place: {
          tavern: string;
          outside: string;
        };
        location: {
          floor: string;
          room: string;
          suite: string;
        };
        stipend: string;
      };
      shops: {
        court: string[];
        healer: string[];
        tavern: string[];
        weapons: string[];
        armor: string[];
        trade: string[];
        smithy: string[];
      };
      encounter: {
        main: string[];
        attack: string[];
        flee: string[];
        feed: string[];
        help: string[];
        pay: string[];
        trade: string[];
        answer: string[];
        seduce: string[];
      };
    }
  }
}
