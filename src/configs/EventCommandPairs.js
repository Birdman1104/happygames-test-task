import { lego } from "../lego/index.js";
import { Head } from "../models/HeadModel.js";
import { SlotModelEvents } from "../models/SlotModel.js";
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

export const openSlotCommand = (uuid) => {
  Head.gameModel.levelModel.openSlot(uuid);
};

export const updateCountsCommand = () => {
  Head.gameModel.levelModel.updateCounts();
};

export const onSlotClickCommand = (uuid) => {
  lego.command
    //
    .payload(uuid)
    .execute(openSlotCommand);
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
  {
    event: SlotModelEvents.OpenUpdate,
    command: updateCountsCommand,
  },
];
