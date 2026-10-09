// Build the screen-technology buttons and connect them to histogram filtering.
const populateFilters = (data) => {
    // Step 7.3 Set up buttons and event listeners
    d3.select("#filters_screen")
        .selectAll(".filter")
        .data(filters_screen)
        .join("button")
        .attr("type", "button")
        .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
        .attr("aria-pressed", d => d.isActive)
        .text(d => d.label)
        .on("click", (event, d) => {
            if (!d.isActive) {
                // Set the clicked filter as active
                filters_screen.forEach(filter => {
                    filter.isActive = filter.id === d.id;
                });

                // Update the appearance of the buttons
                d3.select("#filters_screen")
                    .selectAll(".filter")
                    .classed("active", filter => filter.isActive)
                    .attr("aria-pressed", filter => filter.isActive);

                // Update the chart using the selected filter
                updateHistogram(d.id, data);
            }
        });
};

const updateHistogram = (filterId, data) => {
    
    // Step 7.4 Update the histogram
    const updatedData = filterId === "all"
        ? data
        : data.filter(tv => tv.screenTech === filterId);

    const updatedBins = binGenerator(updatedData);

    // Animate the bars to show the filtered frequencies
    d3.select("#histogram")
        .selectAll(".bar")
        .data(updatedBins)
        .interrupt()
        .transition()
        .duration(500)
        .ease(d3.easeCubicInOut)
        .attr("y", d => yScale(d.length))
        .attr("height", d => innerHeight - yScale(d.length));
};

// T06-2 Step 3: Creating a tooltip and adding function call to load-data.js
const createTooltip = () => {
    // Step 3.2 Append (a hidden) tooltip to innerChart
    const tooltip = innerChartS.append("g")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("pointer-events", "none");

    // Step 3.3 Append tooltip background rectangle
    tooltip.append("rect")
        .attr("width", tooltipWidth)
        .attr("height", tooltipHeight)
        .attr("rx", 3)
        .attr("ry", 3)
        .attr("fill", barColor)
        .attr("fill-opacity", 0.75);

    // Step 3.4 Apped tooltip text
    tooltip.append("text")
        .text("NA")
        .attr("x", tooltipWidth / 2)
        .attr("y", tooltipHeight / 2 + 2)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("fill", "white")
        .style("font-weight", 900);
};

    // T06-2 Step 3.5 Add functions to react to mouse events
const handleMouseEvents = () => {
    const tooltip = innerChartS.select(".tooltip");

    // Step 3.6 Select all circles in scatter plot


    // Step 3.7 Attach event listeners to mouseenter and mouseleave events
    innerChartS.selectAll("circle")
        .on("mouseenter", (e, d) => {
            tooltip.select("text")
                .text(`${d.screenSize} inches`);

            // Get the hovered circle's position
            const cx = +e.target.getAttribute("cx");
            const cy = +e.target.getAttribute("cy");

            // Centre the tooltip above the circle
            tooltip
                .interrupt()
                .attr(
                    "transform",
                    `translate(${cx - 0.5 * tooltipWidth},
                               ${cy - 1.5 * tooltipHeight})`
                )
                .transition()
                .duration(200)
                .style("opacity", 1);
        })
        .on("mouseleave", () => {
            tooltip
                .interrupt()
                .style("opacity", 0)
                .attr("transform", "translate(0, 500)");
        });
};