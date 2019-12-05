<template>
    <div id="app">
        <section id="write">
            <br><br>
            <input v-model="title" placeholder="글 제목">
            <br><br>
            <input v-model="body" placeholder="내용">
            <br><br>
            <input v-model="petName" placeholder="반려견 이름">
            <br><br>
            <input v-model="petSex" placeholder="반려견 성별">
            <br><br>
            <input v-model="petType" placeholder="반려견 견종">
            <br><br>
            <input v-model="findPlace" placeholder="발견한 장소">
            <br><br>
            <input v-model="findDate" placeholder="발견 일시">
            <br><br>
            <input v-model="money" placeholder="사례금(만원)">
            <br><br>
			<input type="file" @change="fileSeleted">
        	<button v-on:click="sendFile">send</button>
        </section>
    </div>
</template>

<script>
export default {
    data(){
        return{
            title: '',
            body: '',
            created: '',
            writer: '',
            petName: '',
            petSex: '',
            petType: '',
            findPlace: '',
            findDate: '',
            money: 0,
            comment:[{
                body:'',
                writer:'',
                created:'',
            }]
        }
    },
    methods: {
        clicked: function(){
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

<style>

</style>