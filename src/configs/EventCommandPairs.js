import { Head } from "../models/HeadModel.js";
import { GlobalEvents } from "./events.js";

export const onMainViewReadyCommand = () => {
  Head.initialize();
};

export const eventCommandPairs = [
  {
    event: GlobalEvents.MainViewReady,
    command: onMainViewReadyCommand,
  },
];
