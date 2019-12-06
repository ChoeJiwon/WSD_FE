<template>
    <div class="detail">
        <hr>

        <br><br><br><br><br><br><br>
        <div class="lostpost_layout">
            글 제목 : {{lostpost.title}}
            <hr>
            글 내용 : {{lostpost.body}}
            <hr>
            글 작성 시간 : {{lostpost.created}}
            <hr>
            글 작성자 : {{lostpost.writer}}
            <hr>
            견종 : {{lostpost.petType}}
            <hr>
            발견 장소 : {{lostpost.lostPlace}}
            <hr>
            발견 일시 : {{lostpost.lostDate}}
            <hr>
            댓글
            <div v-for="comment in lostpost.comments" v-bind:key="comment">
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
    </div>
</template>

<script>
export default {
    created: function () {
        const _id = this.$route.params._id;
        this.$http.get(`/losterboard/${_id}`)
            .then((response) => {
                this.lostpost = response.data.board;
            });
    },
    data: () => {
        return{
            lostpost: {},
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
            this.$http.post(`/losterboard/${_id}/comments`,
                {newComment: this.newComment})
                .then((res)=>{
                    this.lostpost.comments.push(this.newComment);
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