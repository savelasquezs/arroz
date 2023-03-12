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
    dates() {
      return this.chartData.map((data) => data.label).reverse();
    },
    totals() {
      return this.chartData.map((data) => data.valor).reverse();
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
