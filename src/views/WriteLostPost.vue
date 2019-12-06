<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md8>
        <material-card color="green" title="실종 게시글 작성" text="게시글 작성을 위한 정보를 입력해 주세요.">
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md4>
                  <v-text-field label="글 제목" v-model="title"/>
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field label="내용" v-model="body" class="purple-input" />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field label="반려견 이름" v-model="petName" class="purple-input"/>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="반려견 성별" v-model="petSex" class="purple-input"/>
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field label="반려견 견종" v-model="petType" class="purple-input"/>
                </v-flex>
                <v-flex xs12 md12>
                  <v-text-field label="잃어버린 장소" v-model="lostPlace" class="purple-input"/>
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field label="잃어버린 시간" v-model="lostDate" class="purple-input"/>
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field label="사례금(만원)" v-model="money" class="purple-input"/>
                </v-flex>
                <v-flex xs12 md4>
                  <input type="file" @change="fileSeleted">
                  <v-btn color="green" @click="sendFile">Send</v-btn>
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
            file:'',
            title: '',
            body: '',
            created: '',
            writer: '',
            petName: '',
            petSex: '',
            petType: '',
            lostPlace: '',
            lostDate: '',
            money: 0,
            comment:[{
                body:'',
                writer:'',
                created:'',
            }]
        }
    },
    methods: {
      onClicked: function(){
            this.$http.post('/losterboard',{
                body: this.body,
                lostPlace: this.lostPlace,
                petType: this.petType,
            }).then((response) => {
                alert("글 작성 버튼 클릭됨", response)
                this.$router.push('/losterboard')
            }).catch((err) => {
                alert("Error", err)
            })
        },
        fileSeleted:function(){
          this.file=event.target.file[0];
        },
        sendFile:function(){
            var formData=new FormData();
            var config={
                header:{'Content-Type': 'multipart/form-data'}
            };
            console.log(this.file);
            formData.append('img',this.file);
            formData.append('body',this.body);
            formData.append('petName',this.petName);
            formData.append('petSex',this.petSex);
            formData.append('petType',this.petType);
            formData.append('lostPlace',this.lostPlace);
            formData.append('lostDate',this.lostDate);
            formData.append('money',this.money);

            for(let key of formData.entries()){
                console.log(`${key}`);
            }

            this.$http.post('/losterboard',formData,config).then((response) => {
                console.log(response);
                this.$router.push('/losterboard')
            }).catch((err) => {
                alert(err);
            })
        }
    }
}
</script>
