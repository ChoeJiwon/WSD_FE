<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <material-card color="green" title="발견 게시글 작성" text="게시글 작성을 위한 정보를 입력해 주세요.">
          <v-form>
            <v-container py-0>
              <v-layout column wrap>
                <v-flex xs12 md4>
                  <v-text-field label="글 제목" v-model="title"/>
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field label="반려견 견종" v-model="petType" class="purple-input"/>
                </v-flex>
                <v-flex xs12 md12>
                  <v-text-field label="발견장소" v-model="findPlace" class="purple-input"/>
                </v-flex>
                  <!-- <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="date"
                        label="발견 날짜"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
                  </v-menu> -->
                <v-flex xs12 md12>
                  <v-text-field label="발견 날짜" v-model="findDate" class="purple-input"/>
                </v-flex>
                <v-flex xs12 md12>
                  <v-textarea label="내용" v-model="body" class="purple-input" />
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
            title: '',
            body: '',
            created: '',
            writer: '',
            petType: '',
            findPlace: '',
            findDate: '',
            money: 0,
            date: new Date().toISOString().substr(0, 10),
            menu: false,
            modal: false,
            menu2: false,
        }
    },
    methods: {
      onClicked: function(){
            this.$http.post('/finderboard',{
                body: this.body,
                findPlace: this.findPlace,
                petType: this.petType,
            }).then((response) => {
                alert("글 작성 버튼 클릭됨", response)
                this.$router.push('/finderboard')
            }).catch((err) => {
                alert("Error", err)
            })
        }
    },
}
</script>