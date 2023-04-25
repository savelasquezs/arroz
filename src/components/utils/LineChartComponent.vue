<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default {
  props: {
    label: String,
    chartData: Array,
    options: Object,
    chartColors: Object,
  },
  name: "LineChart",
  components: { Line },

  computed: {
    orderedData() {
      return this.chartData.sort((a, b) => {
        let fa = a.label.toLowerCase(),
          fb = b.label.toLowerCase();
        if (fa < fb) {
          return -1;
        }
        if (fb < fa) {
          return 1;
        }
        return 0;
      });
    },
    dates() {
      return this.orderedData.map((data) => data.label);
    },
    totals() {
      return this.orderedData.map((data) => data.valor);
    },
    chartDataComputed() {
      const {
        borderColor,
        pointBorderColor,
        pointBackgroundColor,
        backgroundColor,
      } = this.chartColors;

      return {
        labels: this.dates,
        datasets: [
          {
            label: this.label,
            data: this.totals,
            borderColor,
            pointBorderColor,
            pointBackgroundColor,
            backgroundColor,
          },
        ],
      };
    },
  },
};
</script>
<template>
  <Line id="my-chart-id" :options="options" :data="chartDataComputed" />
</template>
