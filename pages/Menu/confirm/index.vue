<template>
  <v-app>
    <v-col cols="12">
    <v-form ref="searchData_form">
    <v-card>
      <v-card-title>家計簿表示</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols=1 md=1>
              <v-subheader>日付</v-subheader>
            </v-col>
            <v-col cols=1 md=1>
              <v-text-field
                v-model="params.year"
                label="年"
                :rules="[required, year_length]"
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
                :items="items"
              ></v-select>
            </v-col>
            <v-col cols=2>
              <v-btn block elevation="18" @click="searchData">
                検索
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-data-table
                :headers="headers"
                :items="item_data"
                class="elevation-18"
              >
                <template v-slot:item.action="{ item }">
                  <v-btn small class="elevation-18" @click="openDialog(item)">
                    編集
                  </v-btn>
                  <v-btn small class="elevation-18" @click="clickDelete(item)">
                    削除
                  </v-btn>
                </template>
              </v-data-table>
              <dialogCard ref="dia"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols=2 md=1>
              <v-btn block to="/menu">
                メニューへ戻る
              </v-btn>
            </v-col>
            <v-col cols=2 md=1>
              <v-btn block @click="openGraph()">
                グラフ表示
              </v-btn>
              <graphCard ref="gra"/>
            </v-col>
            <v-col cols=2 md=1>
              <v-btn block to="/menu/graph">
                CSVダウンロード
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols=2 md=1>
              <v-btn block to="/menu">
                メニューへ戻る
              </v-btn>
            </v-col>
            <v-col cols=2 md=1>
              <v-btn block to="/menu/input">
                新規登録
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-form>
    </v-col>
  </v-app>
</template>

<script>
import dialogCard from '@/components/dialog'
import graphCard from '@/components/graph'
export default {
  components: {
    dialogCard,
    graphCard
  },
  async asyncData (context) {
    const response = await context.$axios.get('/api/mysql/getItem')
    const resData = []
    for (const res of response.data) {
      if (res !== 'その他') {
        resData.push(res)
      } else {
        resData.push('全て')
      }
    }
    return {
      items: resData
    }
  },
  data () {
    return {
      name: '',
      email: '',
      dialog: false,
      headers: [
        {
          text: '日付',
          align: 'start',
          sortable: false,
          value: 'date'
        },
        { text: '分類', value: 'category' },
        { text: '金額', value: 'amount' },
        { text: 'メモ', value: 'memo' },
        { text: '', value: 'action', sortable: false }
      ],
      item_data: [],
      required: value => !!value || '必須項目です',
      year_length: value => value.length === 4 || '西暦の4桁で入力してください。',
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
        itemClassification: ''
      }
    }
  },
  methods: {
    async searchData () {
      if (this.$refs.searchData_form.validate()) {
        const response = await this.$axios.$post('/api/mysql/itemData', this.params)
        this.item_data = response
      }
    },
    async clickDelete (item) {
      console.log(item)
      const response = await this.$axios.$get('/api/mysql/deleteData/' + item.data_id)
      console.log(response)
      if (response === 'OK') {
        alert('削除完了しました')
      } else {
        alert('削除に失敗しました')
      }
    },
    openDialog (item) {
      this.$refs.dia.open(item)
    },
    openGraph () {
      this.$refs.gra.open()
    }
  }
}
</script>
