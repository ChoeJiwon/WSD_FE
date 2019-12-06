<template>
    <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <material-card color="green" title="Edit Profile" text="Complete your profile">
          <v-form>
            <v-container py-0>
              <v-layout wrap column>
                <!-- <v-row align="center" justify="center"> -->
                <v-flex xs12 md4>
                  <!-- <v-img
                    src="https://picsum.photos/id/11/500/300"
                    lazy-src="https://picsum.photos/id/11/10/6"
                    aspect-ratio="1"
                    class="grey lighten-2"
                    max-width="500"
                    max-height="300"
                    :justify="center"
                    ></v-img> -->
                    <strong class="display-3">{{findpost.title}}</strong>
                </v-flex>
                <!-- </v-row> -->
                <v-flex xs12 md4>
                  <strong class="display-1 right" >{{findpost.writer}}</strong>
                </v-flex>
                <v-flex xs12 md6>
                    <v-card class="d-flex pa-2" outlined tile>
                        <blockquote class="blockquote">{{findpost.body}}</blockquote>
                    </v-card>
                </v-flex>
                <v-flex xs12 md6>
                  <strong class="title right" >견종: {{findpost.petType}}</strong>
                  <!-- <v-text-field label="Adress" class="purple-input"/> -->
                </v-flex>
                <v-flex xs12 md4>
                  <strong class="title right" >발견장소: {{findpost.findPlace}}</strong>
                  <!-- <v-text-field label="City" class="purple-input"/> -->
                </v-flex>
                <v-flex xs12 md4>
                  <strong class="title right" >발견일시: {{findpost.created}}</strong>
                  <!-- <v-text-field label="Country" class="purple-input"/> -->
                </v-flex>
                <v-divider></v-divider>
                <v-divider></v-divider>
                <v-data-table
                    :headers="headers" 
                    :items="items" 
                    :items-per-page="5" 
                    class="elevation-1" 
                    :search="search"
                    loading-text="Loading... Please wait">
                    <template slot="headerCell" slot-scope="{ header }">
                    <span class="subheading font-weight-light text-success text--darken-3" v-text="header.text"/>
                    </template>
                    <template slot="items" slot-scope="{item}" v-if="items">
                    <td>{{ item.writer }}</td>
                    <td>{{ item.body }}</td>
                    <td class="text-xs-right" outlined>{{ item.created }}</td>
                    <v-btn @click="onDelete(item._id, item)" right>
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                    </template>
                </v-data-table>
                <v-flex xs12 md6>
                  <v-textarea outlined label="댓글 남기기" class="purple-input" v-model="newComment.body"/>
                  <v-btn @click="clicked" right>작성 완료</v-btn>
                </v-flex>
                <v-flex xs12 text-xs-right>
                  <v-btn class="mx-0 font-weight-light" color="success">게시글 수정</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
    created: function () {
        const _id = this.$route.params._id;
        this.$http.get(`/finderboard/${_id}`)
            .then((response) => {
                this.findpost = response.data.board;
                this.items = this.findpost.comments;
            });
    },
    data: () => {
        return{
            headers: [
                { text: '작성자', value: 'writer', sortable: false},
                { text: '덧글 내용', value: 'body', sortable: false, filterable: false},
                { text: '작성날짜', value: 'created', sortable: true, align: 'right'}
            ],
            findpost: {},
            newComment: {
                writer: '',
                body: '',
                created: '',
            },
            items: []
        }
    },
    methods:{
        clicked: function(){
            const today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const dateTime = date +' '+ time;
            this.newComment.created = dateTime;
            this.newComment.writer = this.$store.state.userInfo.name;
            var _id = this.$route.params._id;
            this.$http.post(`/finderboard/${_id}/comments`,
                {newComment: this.newComment})
                .then((res)=>{
                    this.findpost.comments.push(this.newComment);
                    this.newComment="";
                }).catch((err) => {
                    alert(err);
                })
        },
        onDelete: function(id, item){
            const comment_id = id;
            const post_id = this.$route.params._id;
            const user_id = this.$store.state.userInfo._id;

            console.log("c id : " + comment_id)
            console.log("p id : " + post_id)
            console.log("u id : " + user_id)

            this.$http.delete(`/finderboard/${post_id}/comments/${comment_id}`)
        }
        
    },
}
</script>

<style>
.findpost_layout{
    display: inline-block;
    border: 1px solid;
    font-size: 20px;
    height: 300px;
    width: 300px;
    text-align: center;
}

.image{
    width: 200px;
    height: 200px;
    max-width: 90%;
    max-height: 80%;
}
</style>