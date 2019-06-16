import React from "react";
import { useObservable, observer } from "mobx-react-lite";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Checkbox,
  TextField
} from "@material-ui/core";
import store from "./mobx";

import useLocalStorage from "./useLocalStorage";
import styles from "./styles.module.css";

const Teams = observer(() => {
  const {
    matchA,
    matchB,
    matchAverageA,
    matchAverageB,
    matchDelta
  } = useObservable(store);
  const [state, toggle] = useLocalStorage("toggle:result");

  return (
    <ExpansionPanel expanded={!!state} onChange={toggle}>
      <ExpansionPanelSummary>Team Results</ExpansionPanelSummary>
      <ExpansionPanelDetails className={styles.teamContainer}>
        <div className={styles.team}>
          <h2>Team 1</h2>
          {matchA.map(({ name, glory }) => (
            <div className={styles.inputGroup}>
              <p>{name}</p>
              <p>{glory}</p>
            </div>
          ))}
          <p>Average Glory: {matchAverageA / 4}</p>
        </div>
        <div className={styles.team}>
          <h2>Team 2</h2>
          {matchB.map(({ name, glory }) => (
            <div className={styles.inputGroup}>
              <p>{name}</p>
              <p>{glory}</p>
            </div>
          ))}
          <p>Average Glory: {matchAverageB / 4}</p>
        </div>
        <p className={styles.summary}>Glory Delta: {matchDelta}</p>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
});

export default Teams;
