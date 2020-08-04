<template>
  <div class="recharge">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell :value="parseDate(item.create_time)"  v-for="(item) in list" :key="item.record_code" >
        <template #title>
          <van-tag type="danger">消费</van-tag>
          <span class="custom-title">{{item.purchase_fee}}元</span>
          <span>{{item.arae_name}}</span>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      total:0,
      form: {
        pageNum: 1,
        pageSize: 10,
        userCode: '',
        trueName:"",
        phone:""
      },
    };
  },
  created(){
    if(this.$store.getters.userInfo && this.$store.getters.userInfo.userCode) {
      this.form.userCode = this.$store.getters.userInfo.userCode;
    }
  },
  methods: {
    parseDate(date){
      return $parseTime(new Date(date));
    },
    onLoad() {
      // 异步更新数据
      $requestBody("/consume/getConsumes", this.form).then((res) => {
        this.loading = false;
        if (res.code === 200) {
          this.list = this.list.concat(res.data.list);
          this.total = Number(res.data.total);
          this.loading = false;
          this.form.pageNum++;
          if(this.list.length >= this.total) {
            this.finished = true;
          }
        }
      });
    },
  },
};
</script>

<style  scoped>
.recharge {
  height: 100%;
  overflow: auto;
}
.custom-title {
  display: inline-block;
  width: 60px;
  margin-left:6px;
}
</style>