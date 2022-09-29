<template>
  <v-app>
  <div>
    <apexchart
      width="1000"
      :type="graphType"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
  <div>
  <v-btn small class="elevation-18" @click="searchDatag()">
      編集
  </v-btn>
  </div>
  </v-app>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  components: {
    apexchart: VueApexCharts
  },
  data () {
    return {
      graphType: 'line',
      chartOptions: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: []
        }
      },
      series: [
        {
          name: 'グラフ名',
          data: [30, 40, 35, 50, 49, 60, 70, 91]
        }
      ],
      getyokoList: [],
      getDataList: []
    }
  },
  methods: {
    async searchDatag () {
      const response = await this.$axios.$get('/api/mysql/graph/items', this.params)
      this.chartOptions.xaxis.categories = response.item
      const json = {}
      json.name = 'グラフA'
      json.data = response.totalAmount
      this.series = []
      this.series.push(json)
      this.graphType = 'bar'
      console.log(response.item)
      console.log(response.totalAmount)
      console.log(this.chartOptions.xaxis.categories)
      console.log(this.series)
    }
  }
}
</script>
