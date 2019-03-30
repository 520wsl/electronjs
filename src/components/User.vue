<template>
  <div class="container">
    <Poptip trigger="hover" :placement="placement" width="255">
      <Avatar :src="user.headImg" shape="square" icon="ios-person" size="large"/>
      <div slot="content">
        <Row>
          <i-col span="17" style="padding: 5px" class="nick">
            <span :title="user.nick">{{user.nick}}</span>
            <img v-if="user.sex === 'female'" src="../assets/female.png">
            <img v-if="user.sex === 'male'" src="../assets/male.png">
          </i-col>
          <i-col span="7" style="text-align: center">
            <img :src="user.headImg" class="head-img">
          </i-col>
        </Row>
        <div class="separate"></div>
        <Row>
          <i-col span="7" class="label">
            地区
          </i-col>
          <i-col span="17">
            {{user.province}}&nbsp;{{user.city}}
          </i-col>
        </Row>
        <div class="separate"></div>
        <div style="text-align: right">
          <Button type="text" icon="md-exit" @click="toLogout">退出登录</Button>
        </div>
      </div>
    </Poptip>
    <div style="width: 255px;background: pink">
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    props: {
      placement: {
        type: String,
        default: "bottom-end"
      },
    },
    computed: {
      ...mapState({
        user: state => state.user.user,
      }),
    },
    data() {
      let data = {};
      return data;
    },
    mounted() {
      console.log(JSON.parse(JSON.stringify(this.user)))
    },
    methods: {
      ...mapActions(['logout']),
      toLogout() {
        this.logout().catch(err => {
          if (err && err.msg) {
            this.$Message.error(err.msg)
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    display: inline;
    text-align: left;

    .separate {
      margin: 10px 0 5px 0;
      border-top: #eee solid 1px;
    }

    .head-img {
      width: 64px;
      height: 64px;
    }

    .nick {
      line-height: 16px;

      > span {
        font-size: 16px;
        font-weight: bold;
        max-width: 130px;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      > img {
        margin-left: 3px;
        width: 12px;
        height: 12px;
      }
    }

    .label {
      color: #9E9E9E;
    }
  }
</style>
