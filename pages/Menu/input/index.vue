<template>
<v-app>
  <v-form ref="inputData_form">
  <v-card>
    <v-card-title>家計簿データ入力</v-card-title>
      <v-row>
        <v-col cols=2 md=1>
          <v-subheader>日付</v-subheader>
        </v-col>
        <v-col cols=1 md=1>
          <v-text-field
            v-model="params.year"
            label="年"
            value=""
            :rules="[required, year_length, number_check]"
            counter="4"
          ></v-text-field>
        </v-col>
        <v-col cols=1 md=1>
          <v-select
            v-model="params.month"
            value="1"
            :rules="[required]"
            :items="monthItems"
            label="月"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols=2 md=1>
          <v-subheader>内容分類</v-subheader>
        </v-col>
        <v-col cols=2>
          <v-select
            v-model="params.itemClassification"
            :rules="[required]"
            :items="items"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols=2 md=1>
          <v-subheader>分類名入力</v-subheader>
        </v-col>
        <v-col cols=2 md=10>
          <v-text-field
            v-model="params.itemClassificationName"
            label="分類名"
            value=""
            :rules="[item_name_required, limit_length_32]"
            :disabled="inputFlg"
            counter="255"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols=2 md=1>
          <v-subheader>金額</v-subheader>
        </v-col>
        <v-col cols=2 md=2>
          <v-text-field
            v-model="params.amount"
            label="金額"
            value=""
            :rules="[required, limit_length_10, number_check]">
            counter="10"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols=2 md=1>
          <v-subheader>メモ</v-subheader>
        </v-col>
        <v-col cols=2 md=10>
          <v-text-field
            v-model="params.memo"
            label="メモ"
            value=""
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols=2 md=1>
          <v-btn block elevation="18" @click="inputData">
            登録
          </v-btn>
        </v-col>
        <v-col cols=2 md=1>
          <v-btn block to="/menu">
            メニューへ戻る
          </v-btn>
        </v-col>
      </v-row>
  </v-card>
  </v-form>
</v-app>
</template>

<script>
export default {
  async asyncData (context) {
    const response = await context.$axios.get('/api/mysql/getItem')
    const resData = []
    for (const res of response.data) {
      resData.push(res)
    }
    return {
      items: resData
    }
  },
  data () {
    return {
      required: value => !!value || '必須項目です',
      item_name_required: value => (!!value || this.params.itemClassification !== 'その他') || '「その他」を選択した場合、必須項目です',
      year_length: value => value.length === 4 || '西暦の4桁で入力してください。',
      limit_length_32: value => value.length <= 32 || '32文字以内で入力してください',
      limit_length_10: value => value.length <= 10 || '10桁以内で入力してください',
      number_check: value => !value.search(/^[-]?[0-9]+$/) || '数値で入力してください',
      monthItems: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
      ],
      classificationList: '',
      items: [],
      params: {
        year: '',
        month: '',
        itemClassification: '',
        itemClassificationName: '',
        amount: '',
        memo: ''
      }
    }
  },
  methods: {
    async inputData () {
      if (this.$refs.inputData_form.validate()) {
        const response = await this.$axios.$post('/api/mysql/inputData', this.params)
        alert(response)
      }
    }
  },
  computed: {
    inputFlg () {
      if (this.params.itemClassification === 'その他') {
        return false
      }
      return true
    }
  }
}
</script>
