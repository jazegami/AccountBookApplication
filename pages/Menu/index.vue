<template>
  <v-col cols="12">
  <v-card>
    <v-col cols=3>
      <v-card-title>家計簿メニュー</v-card-title>
    </v-col>
    <v-col cols=2>
    <v-btn block to="/menu/input">
      データ入力
    </v-btn>
    </v-col>
    <v-col cols=2>
    <v-btn block to="/menu/confirm">
      家計簿表示
    </v-btn>
    </v-col>
  </v-card>
  </v-col>
</template>
