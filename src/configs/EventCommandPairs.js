import { lego } from "../lego/index.js";
import { Head } from "../models/HeadModel.js";
import { GlobalEvents, ViewEvents } from "./events.js";

export const mapCommands = () => {
  eventCommandPairs.forEach(({ event, command }) => {
    lego.event.on(event, command);
  });
};

export const unmapCommands = () => {
  eventCommandPairs.forEach(({ event, command }) => {
    lego.event.off(event, command);
  });
};

export const onMainViewReadyCommand = () => {
  Head.initialize();
};

export const onSlotClickCommand = (uuid) => {
  Head.gameModel.levelModel.slotClick(uuid);
};

export const eventCommandPairs = [
  {
    event: GlobalEvents.MainViewReady,
    command: onMainViewReadyCommand,
  },
  {
    event: ViewEvents.SlotClick,
    command: onSlotClickCommand,
  },
];
