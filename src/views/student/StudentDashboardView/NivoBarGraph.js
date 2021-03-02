import React from "react";
import { render } from "react-dom";
import { ResponsiveBar } from "@nivo/bar";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const data = [
    {
      "country": "AD",
      "hot dog": 56,
      "hot dogColor": "hsl(94, 70%, 50%)",
      "burger": 189,
      "burgerColor": "hsl(240, 70%, 50%)",
      "sandwich": 119,
      "sandwichColor": "hsl(91, 70%, 50%)",
      "kebab": 157,
      "kebabColor": "hsl(351, 70%, 50%)",
      "fries": 121,
      "friesColor": "hsl(121, 70%, 50%)",
      "donut": 173,
      "donutColor": "hsl(358, 70%, 50%)"
    },
    {
      "country": "AE",
      "hot dog": 136,
      "hot dogColor": "hsl(17, 70%, 50%)",
      "burger": 191,
      "burgerColor": "hsl(144, 70%, 50%)",
      "sandwich": 66,
      "sandwichColor": "hsl(322, 70%, 50%)",
      "kebab": 82,
      "kebabColor": "hsl(32, 70%, 50%)",
      "fries": 63,
      "friesColor": "hsl(172, 70%, 50%)",
      "donut": 136,
      "donutColor": "hsl(208, 70%, 50%)"
    },
    {
      "country": "AF",
      "hot dog": 146,
      "hot dogColor": "hsl(344, 70%, 50%)",
      "burger": 74,
      "burgerColor": "hsl(39, 70%, 50%)",
      "sandwich": 106,
      "sandwichColor": "hsl(237, 70%, 50%)",
      "kebab": 86,
      "kebabColor": "hsl(272, 70%, 50%)",
      "fries": 54,
      "friesColor": "hsl(30, 70%, 50%)",
      "donut": 161,
      "donutColor": "hsl(338, 70%, 50%)"
    },
    {
      "country": "AG",
      "hot dog": 19,
      "hot dogColor": "hsl(273, 70%, 50%)",
      "burger": 185,
      "burgerColor": "hsl(263, 70%, 50%)",
      "sandwich": 42,
      "sandwichColor": "hsl(205, 70%, 50%)",
      "kebab": 75,
      "kebabColor": "hsl(309, 70%, 50%)",
      "fries": 141,
      "friesColor": "hsl(251, 70%, 50%)",
      "donut": 145,
      "donutColor": "hsl(254, 70%, 50%)"
    },
    {
      "country": "AI",
      "hot dog": 177,
      "hot dogColor": "hsl(12, 70%, 50%)",
      "burger": 90,
      "burgerColor": "hsl(24, 70%, 50%)",
      "sandwich": 148,
      "sandwichColor": "hsl(194, 70%, 50%)",
      "kebab": 130,
      "kebabColor": "hsl(202, 70%, 50%)",
      "fries": 156,
      "friesColor": "hsl(220, 70%, 50%)",
      "donut": 127,
      "donutColor": "hsl(60, 70%, 50%)"
    },
    {
      "country": "AL",
      "hot dog": 121,
      "hot dogColor": "hsl(13, 70%, 50%)",
      "burger": 109,
      "burgerColor": "hsl(164, 70%, 50%)",
      "sandwich": 53,
      "sandwichColor": "hsl(254, 70%, 50%)",
      "kebab": 76,
      "kebabColor": "hsl(128, 70%, 50%)",
      "fries": 3,
      "friesColor": "hsl(26, 70%, 50%)",
      "donut": 75,
      "donutColor": "hsl(115, 70%, 50%)"
    },
    {
      "country": "AM",
      "hot dog": 119,
      "hot dogColor": "hsl(26, 70%, 50%)",
      "burger": 166,
      "burgerColor": "hsl(8, 70%, 50%)",
      "sandwich": 107,
      "sandwichColor": "hsl(45, 70%, 50%)",
      "kebab": 53,
      "kebabColor": "hsl(178, 70%, 50%)",
      "fries": 120,
      "friesColor": "hsl(285, 70%, 50%)",
      "donut": 75,
      "donutColor": "hsl(1, 70%, 50%)"
    }
  ]

const NivoBarGraph = () => (
  <div style={styles}>
    <h1>Nivo basic demo</h1>
    <div style={{ height: "400px" }}>
    <ResponsiveBar
        data={data}
        keys={[ 'hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut' ]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'food',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
    </div>
  </div>
);

export default NivoBarGraph;