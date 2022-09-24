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
        <v-btn small class="elevation-18" @click="changeGraph()">
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
          text: 'あなたの年齢を教えてください。',
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
        { label: '項目毎の使用金額合計', value: '1' },
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
        console.log('1個目')
        this.chartOptions.xaxis.categories = []
        this.chartOptions.xaxis.categories = response.item
        const json = {}
        json.name = 'グラフA'
        json.data = response.totalAmount
        this.series = []
        this.series.push(json)
        this.graphType = 'pie'
      } else if (this.selectedGraph.value === '2') {
        const response = await this.$axios.$get('/api/mysql/graph/every/year', this.params)
        console.log('2個目')
        this.chartOptions.xaxis.categories = []
        this.chartOptions.xaxis.categories = response.year
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
      const response = await this.$axios.$get('/api/mysql/graph/items', this.params)
      this.chartOptions.labels = response.item
      this.series = response.totalAmount
      this.graphType = 'pie'
      this.size = '700'
      console.log('画面開いた')
    }
  }
}
</script>
