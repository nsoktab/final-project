import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import "./PieChart.css"; // Make sure to create this CSS file
import screenshot from "../../assets/screenshot.png";

ChartJS.register(ArcElement, Tooltip);

// Custom plugin to display text inside the doughnut chart
const centerTextPlugin = {
  id: "centerText",
  beforeDraw: (chart) => {
    const { width } = chart;
    const { height } = chart;
    const ctx = chart.ctx;
    ctx.restore();
    const fontSize = (height / 114).toFixed(2);
    ctx.font = `${fontSize}em sans-serif`;
    ctx.textBaseline = "middle";

    const text = chart.config.options.plugins.centerText.text;
    const textX = Math.round((width - ctx.measureText(text).width) / 2);
    const textY = height / 2;

    ctx.fillText(text, textX, textY);
    ctx.save();
  },
};

const PieChart = ({ scanData }) => {
  const { issues, passed, to_review } = scanData.criterias;

  // Calculate totals dynamically
  const totalIssues =
    issues.critical.length +
    issues.serious.length +
    issues.moderate.length +
    issues.minor.length;
  const totalPassed = passed.length;
  const totalToReview = to_review.length;

  const issueData = {
    labels: ["Critical", "Serious", "Moderate", "Minor"],
    datasets: [
      {
        data: [
          issues.critical.length,
          issues.serious.length,
          issues.moderate.length,
          issues.minor.length,
        ],
        backgroundColor: ["#D73A0C", "#F3A712", "#F8F866", "#e99982"],
        hoverBackgroundColor: ["#ff7875", "#ffc069", "#fff566", "#fff506"],
        borderWidth: 0,
      },
    ],
  };

  const criteriaData = {
    labels: ["Passed", "Needs Review"],
    datasets: [
      {
        data: [totalPassed, totalToReview],
        backgroundColor: ["#A8C686", "#F8F866"],
        hoverBackgroundColor: ["#73d13d", "#ffc53d"],
        borderWidth: 0,
      },
    ],
  };

  const issueOptions = {
    cutout: "60%",
    plugins: {
      legend: {
        display: false,
      },
      centerText: {
        text: `${totalIssues}`,
      },
    },
  };

  const criteriaOptions = {
    cutout: "60%",
    plugins: {
      legend: {
        display: false,
      },
      centerText: {
        text: `${totalPassed + totalToReview}`,
      },
    },
  };

  return (
    <div className="summary">
      <div>
        <img src={screenshot} alt="Screenshot of the tested application" />
      </div>
      <div className="summary-charts">
        <div className="chart-section">
          <div className="chart">
            <Doughnut
              data={issueData}
              options={issueOptions}
              plugins={[centerTextPlugin]}
            />
          </div>
          <ul>
            <li>{totalIssues} issues:</li>
            <li>{issues.critical.length} critical</li>
            <li>{issues.serious.length} serious</li>
            <li>{issues.moderate.length} moderate</li>
            <li>{issues.minor.length} minor</li>
          </ul>
        </div>

        <div className="chart-section">
          <div className="chart">
            <Doughnut
              data={criteriaData}
              options={criteriaOptions}
              plugins={[centerTextPlugin]}
            />
          </div>
          <ul>
            <li>{totalPassed + totalToReview} criteria:</li>
            <li>{totalPassed} passed</li>
            <li>{totalToReview} needs a review</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
