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

const Editor = observer(() => {
  const { players } = useObservable(store);
  const [state, toggle] = useLocalStorage("toggle:team");

  return (
    <ExpansionPanel expanded={!!state} onChange={toggle}>
      <ExpansionPanelSummary>
        Group Composition (People & Glory)
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={styles.container}>
        <div className={styles.inputGroup}>
          <p>Fixed A</p>
          <p>Fixed Name</p>
          <p>Fixed Glory</p>
          <p>Fixed B</p>
        </div>
        {players.map(
          ({ name, glory, updateName, updateGlory, fixed, updateFixed }) => (
            <div className={styles.inputGroup}>
              <Checkbox value={fixed === -1} onChange={updateFixed("A")} />
              <TextField
                placeholder="Name"
                value={name}
                onChange={updateName}
              />
              <TextField
                placeholder="Glory"
                value={glory}
                onChange={updateGlory}
              />
              <Checkbox value={fixed === 1} onChange={updateFixed("B")} />
            </div>
          )
        )}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
});

export default Editor;
