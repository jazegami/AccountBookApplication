<template>
  <v-dialog v-model="dialog">
  <v-card>
    <v-card-title>Component Title</v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field label="data_id" v-model="updateParams.dataId" required></v-text-field>
          </v-col>
          <v-col cols="12">
          <v-select
            label="分類"
            v-model="updateParams.item"
            :items="items"
          ></v-select>
          </v-col>
          <v-col cols="12">
            <v-text-field label="分類名" v-model="updateParams.item" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="金額" v-model="updateParams.amount" required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="メモ" v-model="updateParams.memo" required></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text color="success" @click="update">
        更新
      </v-btn>
      <v-btn text @click="submit">
        キャンセル
      </v-btn>
    </v-card-actions>
  </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      updateParams: {
        dataId: '',
        itemClassification: '',
        amount: '',
        memo: ''
      },
      dialog: false,
      items: []
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
    async open (item) {
      this.dialog = true
      this.updateParams.dataId = item.data_id
      this.updateParams.itemClassification = item.category
      this.updateParams.amount = item.amount
      this.updateParams.memo = item.memo

      const response = await axios.get('/api/mysql/getItem')
      console.log('test')
      for (const res of response.data) {
        console.log(res)
        if (res !== 'その他') {
          this.items.push(res)
        }
      }
      console.log(this.items)
    }
  }
}
</script>
