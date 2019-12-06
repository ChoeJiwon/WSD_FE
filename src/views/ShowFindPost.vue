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
                <v-list>
                    <v-subheader>댓글</v-subheader>
                    <v-list-item-group v-model="item" color="primary">
                        <v-list-item
                        v-for="comment in findpost.comments"
                        :key="comment"
                        >
                        <v-list-item-content>
                        <!-- <v-list-item-icon> -->
                            <!-- <v-icon v-text="comment.writer"></v-icon> -->
                            <v-list-item-title v-text="comment.writer"></v-list-item-title>
                        <!-- </v-list-item-icon> -->
                        </v-list-item-content>
                        <v-list-item-content>
                            <v-list-item-title v-text="comment.body"></v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
                <v-flex xs12 md6>
                  <v-textarea label="댓글 남기기" class="purple-input"/>
                  <v-btn @click="comment" right>작성 완료</v-btn>
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
            <!-- 글 제목 : {{findpost.title}}
            <hr>
            글 내용 : {{findpost.body}}
            <hr>
            글 작성 시간 : {{findpost.created}}
            <hr>
            글 작성자 : {{findpost.writer}}
            <hr>
            견종 : {{findpost.petType}}
            <hr>
            발견 장소 : {{findpost.findPlace}}
            <hr>
            발견 일시 : {{findpost.findDate}}
            <hr>
            댓글
            <div v-for="comment in findpost.comments" v-bind:key="comment">
                <span> 작성자 : {{comment.writer}} </span>
                <span> 내용 : {{comment.body}} </span>
                <span> 작성시간 : {{comment.created}} </span>
            </div>
        </div>
        <div>
            <input type="text" v-model="newComment.body" placeholder="댓글내용">
            <button @click="clicked">작성 완료</button> 
        </div>
        <br><br><hr><br>
    </div> -->
</template>

<script>
export default {
    created: function () {
        const _id = this.$route.params._id;
        this.$http.get(`/finderboard/${_id}`)
            .then((response) => {
                this.findpost = response.data.board;
            });
    },
    data: () => {
        return{
            findpost: {},
            newComment: {
                body: '',
                created: '',
            },
        }
    },
    methods:{
        
        clicked: function(){
            alert(this._id)
            var _id = this.$route.params._id;
            this.$http.post(`/finderboard/${_id}/comments`,
                {newComment: this.newComment})
                .then((res)=>{
                    this.findpost.comments.push(this.newComment);
                    this.newComment="";
                    alert("성공!");
                }).catch((err) => {
                    alert(err);
                })
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