<template>
  <div>
    <div>
      <b-carousel
        :interval="3000"
        controls
        indicators
        fade
        style="text-shadow: 1px 1px 2px #333; img-width:10px;">
        <!-- Text slides with image -->
        <b-carousel-slide
          caption="대한민국 최강 유기견 플랫폼"
          text="지금 당장 시작하세요"
          :img-src= "src1"
        ></b-carousel-slide>

        <!-- Slides with custom text -->
        <b-carousel-slide
          caption="반려견을 위한 시작"
          text="여러분의 반려견을 지켜주세요"
          :img-src= "src2"
        ></b-carousel-slide>

        <b-carousel-slide
          caption="우리동네 미아견 알리미"
          text="자동화된 시스템을 경험하세요"
          :img-src= "src3"
        ></b-carousel-slide>
      </b-carousel>
    </div>
  </div>
</template>

<script>
export default {
 data() {
      return {
        slide: 0,
        sliding: null,
        counter: 45,
        max: 100,
        src1: './images/1.jpg',
        src2: './images/2.jpg',
        src3: './images/3.jpg',
      }
    },
    methods: {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
