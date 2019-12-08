<template>
  <v-container fill-height fluid>
    <v-layout justify-center align-center>
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
      <v-flex xs12>
        <material-card color="green" title="edit your information" text="입력하세요.">
          <v-card-text>
            <v-flex xs12 md4>
                  <v-text-field v-model="id" label="ID"/>
            </v-flex>
            <v-flex xs12 md4>
                  <v-text-field v-model="password" label="Password" :type="passwordShow ? 'text' : 'password'" required/>
            </v-flex>
            <v-flex xs12 md4>
                        <v-text-field v-model="name" label="Name"/>
                  </v-flex>
            <v-flex xs12 md4>
                        <v-text-field v-model="phone" label="Phone Number"/>
                  </v-flex>
            <v-flex xs12 md4>
                        <v-text-field v-model="email" label="E-mail"/>
                  </v-flex>
            <v-flex xs12 md4>
                  <v-text-field v-model="live" label="Address"/>
            </v-flex>
            
            <v-flex xs12 text-xs-right>
                  <v-btn class="mx-0 font-weight-light" color="success" @click="edit">Edit</v-btn>
            </v-flex>
            
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
export default {
  data: function () {
    return {
      user_id:'',
      id: '',
      password: '',
      name: '',
      phone: '',
      email: '',
      live: '',
      loginDialog: false
    }
  },
  created: function(){
    if(this.$store.state.isUserInfoGetted === false){
      this.loginDialog = true;
    }
    else{
      this.user_id=this.$store.state.userInfo._id;
      this.id=this.$store.state.userInfo.ID;
      this.name=this.$store.state.userInfo.name;
      this.phone=this.$store.state.userInfo.phone;
      this.email = this.$store.state.userInfo.email;
      this.live = this.$store.state.userInfo.live;
    }

  },
  methods: {
    edit: function () {
      this.$http.put(`/users/${this.user_id}`, { //axios 사용
        ID:this.id,
        PW:this.password,
        name:this.name,
        phone:this.phone,
        email:this.email,
        live:this.live
      })
      .then((response) => {
        if (response.data.success === false) {
          alert(response.data.message)
        }
        if (response.data.success === true) {
          this.$router.push('/') // Login 페이지로 보내줌
        }
      })
      .catch(function (error) {
        alert(error.response.data.error)
      })
    },
    moveLogin: function(){
      this.loginDialog = false;
      this.$router.push(`login`);
    }
  }
}
</script>

<style lang="scss">
  .tim-note {
    bottom: 10px;
    color: #c0c1c2;
    display: block;
    font-weight: 400;
    font-size: 13px;
    line-height: 13px;
    left: 0;
    margin-left: 20px;
    width: 260px;
  }
</style>