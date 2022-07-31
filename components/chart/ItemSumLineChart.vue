<template>
  <div>
    <div class="home">
        <line-chart :options="options" :chart-data="chartdata"></line-chart>
    </div>
  </div>
</template>

<script>
import { LineChart } from '@/components/chart/LineChart'

export default {
  name: 'home',
  components: {
    'line-chart': LineChart
  },
  data () {
    return {
      chartdata: {
        labels: ['January', 'February'],
        datasets: [
          {
            label: ['Data One'],
            backgroundColor: '#f87979',
            data: [40, 30]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>
