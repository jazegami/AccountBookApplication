<template>
  <v-col cols="12">
  <v-card>
    <v-col cols=3>
      <v-card-title>家計簿アプリ</v-card-title>
    </v-col>
    <v-col cols=2>
    <v-btn block to="/menu">
      開始
    </v-btn>
    </v-col>
  </v-card>
  </v-col>
</template>

<script>
export default {
  async asyncData (context) {
    const response = await context.$axios.get('/api/mysql')
    return {
      message: response
    }
  }
}
</script>
