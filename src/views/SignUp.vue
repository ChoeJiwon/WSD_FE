<template>
  <v-container fill-height fluid>
    <v-layout justify-center align-center>
      <v-flex xs12>
        <material-card color="green" title="SIGNUP" text="입력하세요.">
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
                  <v-btn class="mx-0 font-weight-light" color="success" @click="signUp">SingUp</v-btn>
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
		id: '',
		password: '',
		name: '',
		phone: '',
		email: '',
		live: ''
	}
  },
  methods: {
    signUp: function () {
      this.$http.post('/users', { //axios 사용
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
          this.$router.push('/login') // Login 페이지로 보내줌
        }
      })
      .catch(function (error) {
        alert(error.response.data.error)
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