<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-dialog
        v-model="loginDialog"
        persistent
        max-width="290"
      >
        <v-card>
          <v-card-title class="headline">불러오기 실패</v-card-title>

          <v-card-text>
            로그인이 필요한 기능입니다.
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="moveLogin"
            >
              로그인 이동
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-flex d-flex justify-start xs12 sm20>
        <v-btn class="ma-2" outlined color="cyan" @click="onClicked()"><v-icon left>mdi-lead-pencil</v-icon>글쓰기</v-btn>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-text-field xs12 md4 outlined label="검색" v-model="search" prepend-inner-icon="mdi-magnify" single-line hide-details clearable></v-text-field>
      </v-flex>
      <v-flex md12>
        <material-card color="green" title="발견 게시판" text="제목을 클릭하여 게시글을 확인하세요.">
          <v-data-table
            :headers="headers" 
            :items="items" 
            item-key="_id"
            :items-per-page="5"
            class="elevation-1"
            loading-text="Loading..." 
            :search="search">
            <template slot="headerCell" slot-scope="{ header }">
              <span class="subheading font-weight-light text-success text--darken-3" v-text="header.text"/>
            </template>
            <template slot="items" slot-scope="{item}" v-if="items">
              <td>{{ item.writer }}</td>
              <td>
                <!-- <v-btn class="v-btn--simple" @click="showPost(item._id)" value="item.title" >{{item.title}}</v-btn> -->
                <v-btn 
                  class="v-btn--simple" 
                  color="success" 
                  large 
                  @click="showPost(item._id)" 
                  value="item.title" 
                  >{{item.title}}</v-btn>
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
    search: '',
    loginDialog: false
  }),
  created() {
    if(this.$store.state.isUserInfoGetted === false){
      this.loginDialog = true;
    }
    else{
      this.$http.get('/finderboard')
        .then(response => {
            this.items = response.data.finderboards;
        }).catch(err => {
          alert("ERR while FET finderboard" + err)
        });
    }
  },
  methods: {
    onClicked: function(){
      this.$router.push('/writefindpost')
    },
    showPost: function(item_id){
      this.$router.push({
        path:`/showfindpost/${item_id}`
      })
    },
    moveLogin: function(){
      this.loginDialog = false;
      this.$router.push(`login`);
    }
  }
}
</script>