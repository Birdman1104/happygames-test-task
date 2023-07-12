import { lego } from "../lego/index.js";
import { Head } from "../models/HeadModel.js";
import { SlotModelEvents } from "../models/SlotModel.js";
import { GlobalEvents, ViewEvents } from "./Events.js";

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

const onMainViewReadyCommand = () => {
  Head.initialize();
};

const openSlotCommand = (uuid) => {
  Head.gameModel.levelModel.openSlot(uuid);
};

const levelCompleteGuard = () => {
  const { totalSlots, openedSlotsCount } = Head.gameModel.levelModel;
  console.warn(totalSlots, openedSlotsCount);
  return totalSlots === openedSlotsCount;
};

const updateCountsCommand = () => {
  Head.gameModel.levelModel.updateCounts();
};
const onSlotOpenCommand = () => {
  lego.command.execute(updateCountsCommand).guard(levelCompleteGuard).execute(levelCompleteCommand);
};

const levelCompleteCommand = () => {
  //
};

const updateWrongClickCountsCommand = () => {
  Head.gameModel.levelModel.increaseWrongClick();
};

const onSlotClickCommand = (uuid) => {
  lego.command
    //
    .payload(uuid)
    .execute(openSlotCommand);
};

const eventCommandPairs = [
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
    command: onSlotOpenCommand,
  },
  {
    event: ViewEvents.WrongClick,
    command: updateWrongClickCountsCommand,
  },
];
