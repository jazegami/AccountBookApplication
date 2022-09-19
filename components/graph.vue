<template>
  <v-dialog v-model="dialog">
  <v-card>
    <v-container>
    <v-row>
      <v-select
        :items="graphType"
        label="グラフ種類"
      ></v-select>
    </v-row>
    <v-row>
    </v-row>
    <v-row>
      <apexchart
        width="500"
        type="line"
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
      chartOptions: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [
        {
          name: 'グラフ名',
          data: [30, 40, 35, 50, 49, 60, 70, 91]
        }
      ],
      dialog: false,
      graphType: [
        'テスト1',
        'テスト2',
        'テスト3'
      ]
    }
  },
  methods: {
    submit () {
      this.dialog = false
    },
    async update () {
      const response = await this.$axios.$post('/api/mysql/updateData', this.updateParams)
      console.log(response)
      if (response === 'OK') {
        alert('更新が完了しました')
        this.dialog = false
      } else {
        alert('更新に失敗しました')
      }
    },
    open () {
      this.dialog = true
      console.log('画面開いた')
    }
  }
}
</script>
