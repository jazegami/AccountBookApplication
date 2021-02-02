<template>
  <v-dialog v-model="dialog">
  <v-card>
    <v-form ref="inputData_form">
      <v-card-title>データの編集</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
            <v-select
              label="分類"
              v-model="updateParams.itemClassification"
              :items="items"
              :rules="[required]"
            ></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="金額"
                v-model="updateParams.amount"
                :rules="[required,numberCheck]"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="メモ" v-model="updateParams.memo"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-form>
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
      required: value => !!value || '必須項目です',
      numberCheck: value => !String(value).search(/^[-]?[0-9]+$/) || '数値で入力してください',
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
