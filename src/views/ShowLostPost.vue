<template>
    <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <material-card color="green" title="Edit Profile" text="Complete your profile">
          <v-form>
            <v-container py-0>
              <v-layout wrap column>
                <v-flex xs12 md4>
                    <strong class="display-3">{{lostpost.title}}</strong>
                </v-flex>
                <v-flex xs12 md4>
                  <strong class="display-1 right" >{{lostpost.writer}}</strong>
                </v-flex>
                <v-flex xs12 md6>
                    <v-card class="d-flex pa-2" outlined tile>
                        <blockquote class="blockquote">{{lostpost.body}}</blockquote>
                    </v-card>
                </v-flex>
                <v-flex xs12 md6>
                  <strong class="title right" >견종: {{lostpost.petType}}</strong>
                </v-flex>
                <v-flex xs12 md4>
                  <strong class="title right" >실종장소: {{lostpost.lostPlace}}</strong>
                </v-flex>
                <v-flex xs12 md4>
                  <strong class="title right" >실종일시: {{lostpost.lostDate}}</strong>
                </v-flex>

                <v-divider></v-divider>
                <v-divider></v-divider>

                <v-data-table
                  :headers="headers" 
                  :items="items" 
                  item-key="_id"
                  :items-per-page="5" 
                  class="elevation-1" 
                  color="black"
                  :search="search"
                  loading-text="Loading... Please wait">
                  <template slot="headerCell" slot-scope="{ header }">
                    <span class="subheading font-weight-light text-success text--darken-3" v-text="header.text"/>
                  </template>
                  <template slot="items" slot-scope="{item}" v-if="items">
                    <td>{{ item.writer }}</td>
                    <td>{{ item.body }}</td>
                    <td class="text-xs-right" outlined>{{ item.created }}</td>
                    <v-divider vertical></v-divider>
                    <v-btn
                      v-if="$store.state.userInfo.ID === item.id"
                      small
                      color="error"
                      dark
                      @click.stop="commentDeleteDialog = true, comment_id = item._id"
                    >
                      <v-icon color="white">mdi-delete</v-icon>
                    </v-btn>

                    <v-dialog
                      v-model="commentDeleteDialog"
                      max-width="290"
                    >
                      <v-card>
                        <v-card-title class="headline">댓글 삭제</v-card-title>

                        <v-card-text>
                          해당 댓글을 삭제하시겠습니까?
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="green darken-1"
                            text
                            @click="onCommentDelete(comment_id)"
                          >
                            삭제
                          </v-btn>

                          <v-btn
                            color="green darken-1"
                            text
                            @click="commentDeleteDialog = false"
                          >
                            취소
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </template>
                </v-data-table>
                <v-flex xs12 md6>
                  <v-textarea solo label="댓글 남기기" class="purple-input" v-model="newComment.body" rows="2"/>
                  <v-divider vertical></v-divider>
                  <v-btn @click="onCommentCreate" class="success">작성 완료</v-btn>
                  <v-snackbar
                      v-model="commentSnackbar"
                    >
                      삭제할 권한이 없습니다.
                      <v-btn
                        color="pink"
                        text
                        @click="commentSnackbar = false"
                      >
                        Close
                      </v-btn>
                    </v-snackbar>
                </v-flex>
                <v-flex xs12 text-xs-right>
                  <v-btn 
                    class="mx-0 font-weight-light" 
                    color="success"
                    @
                    v-if="$store.state.userInfo.ID === lostpost.id"
                    >게시글 수정</v-btn>
                  <v-divider vertical></v-divider>
                  <v-btn
                    color="error"
                    dark
                    v-if="$store.state.userInfo.ID === lostpost.id"
                    @click.stop="postDeleteDialog = true"
                  >
                    게시글 삭제
                    </v-btn>

                    <v-dialog
                      v-model="postDeleteDialog"
                      max-width="290"
                    >
                      <v-card>
                        <v-card-title class="headline">게시글 삭제</v-card-title>

                        <v-card-text>
                          해당 게시글을 삭제하시겠습니까?
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>

                          <v-btn
                            color="green darken-1"
                            text
                            @click="onPostDelete(lostpost._id)"
                          >
                            삭제
                          </v-btn>

                          <v-btn
                            color="green darken-1"
                            text
                            @click="postDeleteDialog = false"
                          >
                            취소
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-snackbar
                      v-model="postSnackbar"
                    >
                      삭제할 권한이 없습니다.
                      <v-btn
                        color="pink"
                        text
                        @click="postSnackbar = false"
                      >
                        Close
                      </v-btn>
                    </v-snackbar>
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
        this.$http.get(`/losterboard/${_id}`)
            .then((response) => {
                this.lostpost = response.data.board;
                this.items = this.lostpost.comments;
            });
    },
    data: () => {
        return{
            headers: [
                { text: '작성자', value: 'writer', sortable: false},
                { text: '덧글 내용', value: 'body', sortable: false, filterable: false},
                { text: '작성날짜', value: 'created', sortable: true, align: 'right'}
            ],
            lostpost: {},
            newComment: {
                writer: '',
                body: '',
                created: '',
            },
            items: [],
            postDeleteDialog: false,
            commentDeleteDialog: false,
            commentSnackbar: false,
            postSnackbar: false,
            comment_id: ''
        }
    },
    methods:{
        onCommentCreate: function(){
            const today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const dateTime = date +' '+ time;

            this.newComment.created = dateTime;

            this.newComment.writer = this.$store.state.userInfo.name;

            const _id = this.$route.params._id;

            this.$http.post(`/losterboard/${_id}/comments`,
                {newComment: this.newComment})
                .then((res)=>{
                    this.newComment={
                      writer: '',
                      body: '',
                      created: ''
                    };
                  this.$http.get(`/losterboard/${_id}`)
                    .then((response) => {
                        this.lostpost = response.data.board;
                        this.items = this.lostpost.comments;
                    });
                }).catch((err) => {
                    alert(err);
                })
        },
        onCommentDelete: function(comment_id){
            const comment_idx = this.comment_id;

            const post_idx = this.$route.params._id;
            const user_id = this.$store.state.userInfo.ID;

            const index = this.items.findIndex(function(item, i){
              return item._id === comment_idx
            });

            if(this.items[index].id === user_id){
              this.$http.delete(`/losterboard/${post_idx}/comments/${comment_idx}`)
                .then( (response) => {
                  if(JSON.stringify(response.data.success) === "true"){
                    this.$http.get(`/losterboard/${post_idx}`)
                    .then((response) => {
                        this.lostpost = response.data.board;
                        this.items = this.lostpost.comments;
                    });
                  }
                })
              this.commentDeleteDialog = false
            }
            else{
              this.commentDeleteDialog = false
              this.commentSnackbar = true;
            }
        },
        onPostDelete: function(id){
            const post_id = id;
            const user_id = this.$store.state.userInfo._id;
            const user_ID = this.$store.state.userInfo.ID;
            const post_writer_ID = this.lostpost.id;

            if(user_ID === post_writer_ID){
              this.$http.delete(`/losterboard/${post_id}`)
                .then( (response) => {
                  if(JSON.stringify(response.data.success) === "true"){
                    this.$router.push(`/losterboard`);
                  }
                })
            }
            else{
              this.postSnackbar = true;
            }
              this.postDeleteDialog = false;
        }
    },
}
</script>

<style>
.lostpost_layout{
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