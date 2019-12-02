<template>
  <v-container fill-height fluid>
    <v-layout justify-center align-center>
      <v-flex xs12>
        <material-card color="green" title="LOGIN" text="ID와 PW를 입력하세요.">
          <v-card-text>
            <v-flex xs12 md4>
                  <v-text-field v-model="ID" label="ID를 입력하세요."/>
            </v-flex>
            <v-flex xs12 md4>
                  <v-text-field v-model="PW" 
                    label="Password"
                    :type="passwordShow ? 'text' : 'password'"
                    required/>
            </v-flex>
            <v-flex xs12 text-xs-right>
                  <v-btn class="mx-0 font-weight-light" color="success" @click="login">Login</v-btn>
            </v-flex>
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const leader = 'I will be the leader of a company that ends up being worth billions of dollars, because I got the answers. I understand culture. I am the nucleus. I think that’s a responsibility that I have, to push possibilities, to show people, this is the level that things could be at.'
const leaderShort = leader.slice(0, 105) + '...'
const material = 'The Life of Material Dashboard'
const small = 'Header with small subtitle'

export default {
  data: function (){
    return {
      ID: '',
      PW: ''
    }
  },
  methods: {
    login: function () {
      this.$http.post('/login', {"ID":this.ID, "PW":this.PW})
      .then((response) => {  //로그인 성공
          if(JSON.stringify(response.data.success)==="true"){
            alert("성공~")
              this.$store.commit("setUserInfo")
              this.$router.push('/') ;
          }
          
        },
        (error) => { // error 를 보여줌
          alert(error.response.data.error)
        }
      )
      .catch(error => {
        alert(error)
      })
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
