<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <material-card color="green" title="발견 게시글 수장" text="게시글 수정을 위한 정보를 입력해 주세요.">
          <v-form>
            <v-container py-0>
              <v-layout column wrap>
                <!-- <v-flex xs12 md4>
                  <v-text-field label="글 제목" v-model="findpost.title"/>
                </v-flex> -->
                <v-flex xs12 md4>
                  <v-text-field label="반려견 견종" v-model="findpost.petType" class="purple-input"/>
                </v-flex>
                <v-flex xs12 md12>
                  <v-text-field label="발견장소" v-model="findpost.findPlace" class="purple-input"/>
                </v-flex>
                <v-flex xs12 md12>
                  <v-text-field label="발견 날짜" v-model="findpost.findDate" class="purple-input"/>
                </v-flex>
                <v-flex xs12 md12>
                  <v-textarea label="내용" v-model="findpost.body" class="purple-input" />
                </v-flex>
                <v-flex xs12 text-xs-right>
                  <v-btn class="mx-0 font-weight-light" color="success" @click="onClicked">수정 완료</v-btn>
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
  created: function(){
      this.post_id = this.$route.params._id;
      this.$http.get(`/finderboard/${this.post_id}`)
        .then((response) => {
            this.findpost = response.data.board;
            console.log(this.findpost)
        })
  },
  data(){
        return{
            findpost: {
              id: '',
              title: '',
              body: '',
              created: '',
              writer: '',
              petType: '',
              findPlace: '',
              findDate: '',
              comments:[{
                  id: '',
                  body: '',
                  writer: '',
                  created: ''
              }]
            },
            post_id:'' 
        }
    },
    methods: {
      onClicked: function(){
        this.$http.put(`/finderboard/${this.post_id}`,{
          findpost: this.findpost
        }).then((response) => {
            alert(response.data.success)
            this.$router.push('/finderboard')
        }).catch((err) => {
            alert("Error", err)
        })
      }
    },
}
</script>