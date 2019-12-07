<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex d-flex justify-start xs12 sm20>
        <v-btn class="ma-2" outlined color="cyan" @click="onClicked()"><v-icon>mdi-lead-pencil</v-icon>글쓰기</v-btn>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-text-field xs12 md4 outlined label="검색" v-model="search" prepend-inner-icon="mdi-magnify" single-line hide-details clearable></v-text-field>
      </v-flex>
      <v-flex md12>
        <material-card color="green" title="실종 게시판" text="반려견을 실종한 사람들의 게시글입니다.">
          <v-data-table
            :headers="headers" 
            :items="items" 
            item-key="_id"
            :items-per-page="5" 
            class="elevation-1" 
            :search="search">
            <template slot="headerCell" slot-scope="{ header }">
              <span class="subheading font-weight-light text-success text--darken-3" v-text="header.text"/>
            </template>
            <template slot="items" slot-scope="{item}" v-if="items">
              <td>{{ item.writer }}</td>
              <td>
                <v-btn text color="blue" @click="showPost(item._id)" value="item.title">{{item.title}}</v-btn>
              </td>
              <td>{{ item.writer }}</td>
              <td class="text-xs-right">{{ item.created }}</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    headers: [
      { text: '사진', value: 'img', sortable: false, filterable: false},
      { text: '제목', value: 'title', sortable: false},
      { text: '작성자', value: 'writer', sortable: false},
      { text: '작성날짜', value: 'created', sortable: false, align: 'right'}
    ],
    items: [],
    search: ''
  }),
  created() {
    this.$http.get('/losterboard')
      .then(response => {
        if(JSON.stringify(response.data.success) === "true"){
          this.items = response.data.losterboards;
          console.log(this.items);
          console.log(this.items[0].body)
        }else{
          alert("로그인이 필요합니다." + response.data.message)
        }
      }).catch(err => {
        alert("ERR while FET losterboard" + err)
      });
  },
  methods: {
    onClicked: function(){
      this.$router.push('/writelostpost')
    },
    showPost: function(item_id){
      this.$router.push({
        path:`/showlostpost/${item_id}`
      })
    }
  }
}
</script>