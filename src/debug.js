import React from "react";
import { useObservable, observer } from "mobx-react-lite";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";

import store from "./mobx";
import useLocalStorage from "./useLocalStorage";

import styles from "./styles.module.css";

const Debug = observer(() => {
  const {
    serialization,
    matchA,
    matchAverageA,
    matchB,
    matchAverageB,
    matchDelta
  } = useObservable(store);
  const [state, toggle] = useLocalStorage("toggle:debug");
  return (
    <ExpansionPanel expanded={!!state} onChange={toggle}>
      <ExpansionPanelSummary>Debug Stuff</ExpansionPanelSummary>
      <ExpansionPanelDetails className={styles.debugContainer}>
        <h4>Players:</h4>
        <p>{JSON.stringify(serialization)}</p>
        <h4>Teams:</h4>
        <p>
          {JSON.stringify({
            matchA,
            matchAverageA,
            matchB,
            matchAverageB,
            matchDelta
          })}
        </p>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
});

export default Debug;
