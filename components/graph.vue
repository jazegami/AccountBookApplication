<template>
  <v-dialog v-model="dialog">
  <v-card>
    <v-container>
    <v-row>
      <v-col>
      <v-select
        v-model="selectedGraph"
        :items="graphSelect"
        item-text="label"
        item-value="value"
        label="グラフ種類"
        return-object
      ></v-select>
      </v-col>
      <v-col>
        <v-btn @click="changeGraph()">
          グラフ切り替え
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
    </v-row>
    <v-row>
      <apexchart
        :width="size"
        :type="graphType"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </v-row>
    </v-container>
  </v-card>
  </v-dialog>
</template>

<script>
import Vue from 'vue'
import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

export default {
  data () {
    return {
      size: '',
      chartOptions: {
        labels: [],
        title: {
          text: '',
          align: 'center'
        },
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [2, 3, 4]
        }
      },
      series: [],
      dialog: false,
      selectedGraph: { label: '項目毎の使用金額合計', value: '1' },
      graphSelect: [
        { label: '項目毎の使用金額割合（累計）', value: '1' },
        { label: '年毎の使用金額推移', value: '2' }
      ]
    }
  },
  methods: {
    submit () {
      this.dialog = false
    },
    async changeGraph () {
      if (this.selectedGraph.value === '1') {
        const response = await this.$axios.$get('/api/mysql/graph/items', this.params)
        this.chartOptions = {
          ...this.chartOptions,
          ...{
            labels: response.item,
            title: {
              text: '項目毎の使用金額割合（累計）'
            }
          }
        }
        this.series = response.totalAmount
        this.graphType = 'pie'
        this.size = '700'
      } else if (this.selectedGraph.value === '2') {
        const response = await this.$axios.$get('/api/mysql/graph/every/year', this.params)
        this.chartOptions = {
          ...this.chartOptions,
          ...{
            xaxis: {
              categories: response.year
            },
            title: {
              text: '年毎の使用金額推移'
            }
          }
        }
        const json = {}
        json.name = 'グラフB'
        json.data = response.totalAmount
        this.series = []
        this.series.push(json)
        this.graphType = 'bar'
      }
    },
    async open () {
      this.dialog = true
      if (this.selectedGraph.value === '1') {
        const response = await this.$axios.$get('/api/mysql/graph/items', this.params)
        this.chartOptions = {
          ...this.chartOptions,
          ...{
            labels: response.item,
            title: {
              text: '項目毎の使用金額割合（累計）'
            }
          }
        }
        this.series = response.totalAmount
        this.graphType = 'pie'
        this.size = '700'
      } else if (this.selectedGraph.value === '2') {
        const response = await this.$axios.$get('/api/mysql/graph/every/year', this.params)
        this.chartOptions = {
          ...this.chartOptions,
          ...{
            xaxis: {
              categories: response.year
            },
            title: {
              text: '年毎の使用金額推移'
            }
          }
        }
        const json = {}
        json.name = 'グラフB'
        json.data = response.totalAmount
        this.series = []
        this.series.push(json)
        this.graphType = 'bar'
      }
    }
  }
}
</script>
