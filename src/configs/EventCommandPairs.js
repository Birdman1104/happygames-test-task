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
  Head.gameModel.fetchDataForNexLevel();
};

const fetchNextLevelDataCommand = () => {
  Head.gameModel.fetchNextLevelData();
};

const levelCompleteGuard = () => {
  const { totalSlots, openedSlotsCount } = Head.gameModel.levelModel;
  return totalSlots === openedSlotsCount;
};

const updateCountsCommand = () => {
  Head.gameModel.levelModel.updateCounts();
};

const onSlotOpenCommand = () => {
  lego.command
    //
    .execute(updateCountsCommand)
    .guard(levelCompleteGuard)
    .execute(levelCompleteCommand);
};

const levelCompleteCommand = () => {
  Head.gameModel.levelModel.setComplete(true);
};

const updateWrongClickCountsCommand = () => {
  Head.gameModel.levelModel.increaseWrongClick();
};

const onSlotClickCommand = (uuid) => {
  Head.gameModel.levelModel.openSlot(uuid);
};

const lastLevelGuard = () => {
  const { topLevel, level } = Head.gameModel;
  return topLevel === level;
};

const onNextLevelClickCommand = () => {
  lego.command
    .guard(lastLevelGuard)
    .execute(() => {
      // console.warn(456);
    })
    .execute(startNextLevelCommand);
};

const startNextLevelCommand = () => {
  Head.gameModel.setNextLevel();
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
  // {
  //   event: ViewEvents.PlayButtonClick,
  //   command: fetchNextLevelDataCommand,
  // },
  {
    event: ViewEvents.NextLevelClick,
    command: onNextLevelClickCommand,
  },
];
