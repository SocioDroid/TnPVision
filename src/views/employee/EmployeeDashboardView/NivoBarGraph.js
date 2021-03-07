import React from "react";
import { ResponsiveBar } from "@nivo/bar";
 import data from './data';

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const NivoBarGraph = () => {
  
  return(
    <div style={styles}>
    <h1>Nivo basic demo</h1>
    <div style={{ height: "400px" }}>
    <ResponsiveBar data={data} keys={["drive count"]} indexBy="drive type" />
    </div>
  </div>
  );
}

export default NivoBarGraph;