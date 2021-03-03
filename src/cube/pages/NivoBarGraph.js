import React from "react";
import { render } from "react-dom";
import { ResponsiveBar } from "@nivo/bar";
 //import data from './data';

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const data = [
  {
      "drive type": "ON",
      "drive count": "2"
  },
  {
      "drive type": "full",
      "drive count": "1"
  },    
]

const NivoBarGraph = (props) => {
  
  return(
    <div style={styles}>
    <h1>Nivo basic demo</h1>
    <div style={{ height: "400px" }}>
    {props.data && <ResponsiveBar data={props.data} keys={["DriveDrive.count"]} indexBy="DriveDrive.driveType" />}
    {console.log("honey nivo data check", data)}
    </div>
  </div>
  );
}

export default NivoBarGraph;