// Set up dimensions and margins
const margin = { top: 40, right: 30, bottom: 50, left: 70 };
const width = 800; // Total width of the chart
const height = 400; // Total height of the chart
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

/* Make the colours accessible globally */
/****************************************/
const barColor = "#606464";
const bodyBackgroundColor = "#fbf2e8";

// Set up the scales
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

// T06-1 Step 6.2 Create a bin generator using d3.bin
const binGenerator = d3.bin()
    .value(d => d.energyConsumption);

// T06-1 Step 7.2 Make the filter options accessible globally
const filters_screen = [
    { id: "all", label: "All", isActive: true },
    { id: "LED", label: "LED", isActive: false },
    { id: "LCD", label: "LCD", isActive: false },
    { id: "OLED", label: "OLED", isActive: false }
];

// T06-2 Step 1.4 Set up shared constant
let innerChartS;

const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();
const colorScale = d3.scaleOrdinal();

// T06-2 Step 3.3 Add tooltipWidth and tooltipHeight
const tooltipWidth = 110;
const tooltipHeight = 36;