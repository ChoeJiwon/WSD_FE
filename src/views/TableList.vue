<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex md12>
        <material-card color="green" title="발견 게시판" text="실종견을 발견한 사람들의 게시글입니다.">
          <v-data-table :headers="headers" :items="items" hide-actions>
            <template slot="headerCell" slot-scope="{ header }">
              <span class="subheading font-weight-light text-success text--darken-3" v-text="header.text"/>
            </template>
            <!-- <template slot="items" slot-scope="{ item }"> -->
            <template slot="listArray" slot-scope="{ list }">
              <td>{{ list.writer }}</td>
              <td>{{ list.title }}</td>
              <td>{{ list.writer }}</td>
              <td class="text-xs-right">{{ item.place }}</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    headers: [
      {
        sortable: false,
        text: '사진',
        value: 'img'
      },
      {
        sortable: false,
        text: '제목',
        value: 'title'
      },
      {
        sortable: false,
        text: '작성자',
        value: 'writer'
      },
      {
        sortable: false,
        text: '위치',
        value: 'location',
        align: 'right'
      }
    ],
    items: [
      {
        name: 'Dakota Rice',
        country: 'Niger',
        city: 'Oud-Tunrhout',
        salary: '$35,738'
      },
      {
        name: 'Minerva Hooper',
        country: 'Curaçao',
        city: 'Sinaai-Waas',
        salary: '$23,738'
      }, {
        name: 'Sage Rodriguez',
        country: 'Netherlands',
        city: 'Overland Park',
        salary: '$56,142'
      }, {
        name: 'Philip Chanley',
        country: 'Korea, South',
        city: 'Gloucester',
        salary: '$38,735'
      }, {
        name: 'Doris Greene',
        country: 'Malawi',
        city: 'Feldkirchen in Kārnten',
        salary: '$63,542'
      }, {
        name: 'Mason Porter',
        country: 'Chile',
        city: 'Gloucester',
        salary: '$78,615'
      }
    ],
    listArray: []
  }),
  created() {
    this.$http.get('/finderboard')
      .then(response => {
        if(JSON.stringify(response.data.success) === true){
          alert("response"+JSON.stringify(response.data.success)) 
          this.listArray = response.data.finderboards;
        }else{
          alert("로그인이 필요합니다." + response.data.message)
        }
      }).catch(err => {
        alert("ERR while FET finderboard" + err)
      });
  }
}
</script>
