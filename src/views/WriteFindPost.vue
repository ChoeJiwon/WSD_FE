<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <material-card color="green" title="발견 게시글 작성" text="게시글 작성을 위한 정보를 입력해 주세요.">
          <v-form>
            <v-container py-0>
              <v-layout column wrap>
                <v-flex xs12 md4>
                  <v-text-field label="글 제목" v-model="findpost.title"/>
                </v-flex>
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
                  <v-btn class="mx-0 font-weight-light" color="success" @click="onClicked">작성 완료</v-btn>
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
  data(){
        return{
            findpost: {
              title: '',
              body: '',
              created: '',
              petType: '',
              findPlace: '',
              findDate: '',
            },
            date: new Date().toISOString().substr(0, 10),
            menu: false,
            modal: false,
            menu2: false,
        }
    },
    methods: {
      onClicked: function(){
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date +' '+ time;
        this.findpost.created = dateTime;

        console.log(this.findpost)
        
        this.$http.post('/finderboard',{
          findpost: this.findpost
        }).then((response) => {
            alert("글 작성 버튼 클릭됨", response)
            this.$router.push('/finderboard')
        }).catch((err) => {
            alert("Error", err)
        })
        // this.$http.post('/finderboard',{
        //     // findpost: this.findpost,
        //     // title: this.findpost.title,
        //     body: this.findpost.body,
        //     findPlace: this.findpost.findPlace,
        //     petType: this.findpost.petType,
        // }).then((response) => {
        //     alert("글 작성 버튼 클릭됨", response)
        //     this.$router.push('/finderboard')
        // }).catch((err) => {
        //     alert("Error", err)
        // })
      }
    },
}
</script>