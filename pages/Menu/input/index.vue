<template>
  <v-col cols="12">
  <v-card>
    <v-col cols=3>
      <v-card-title>家計簿データ入力</v-card-title>
    </v-col>
    <v-row>
      <v-col cols=2 md=1>
        <v-subheader>日付</v-subheader>
      </v-col>
      <v-col cols=2 md=2>
        <v-text-field
          label="年"
          value=""
          :rules="[required, limit_length]">
          counter="4"
        </v-text-field>
      </v-col>
      <v-col cols=2 md=2>
        <v-select
          v-model="select"
          value="1"
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
          v-model="select"
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
          label="分類名"
          value=""
          :rules="[required, limit_length_255]">
          counter="4"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols=2 md=1>
        <v-subheader>金額</v-subheader>
      </v-col>
      <v-col cols=2 md=2>
        <v-text-field
          label="金額"
          value=""
          :rules="[required, limit_length_255]">
          counter="4"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols=2 md=1>
        <v-subheader>メモ</v-subheader>
      </v-col>
      <v-col cols=2 md=10>
        <v-text-field
          label="メモ"
          value=""
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols=2 md=1>
        <v-btn block>
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
  </v-col>
</template>

<script>
export default {
  data () {
    return {
      required: value => !!value || '必ず入力してください', // 入力必須の制約
      limit_length: value => value.length <= 4 || '4文字以内で入力してください', // 文字数の制約
      limit_length_255: value => value.length <= 255 || '255文字以内で入力してください', // 文字数の制約
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
      items: [
        'その他'
      ]
    }
  },
  methods: {
    async asyncData (context) {
      const response = await context.$axios.get('/api/mysql')
      return {
        message: response
      }
    }
  }
}
</script>
