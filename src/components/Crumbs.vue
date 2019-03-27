<template>
    <div class="nav flex">
        <div v-if="title" class="flex-left location nav-bk">
            <img class="sixilog" :src="$config.CDN+'/icon_my_location.png'">
            <span class="nav-title">我的位置：</span><span class="nav-content">{{title}}</span>
        </div>
        <div></div>
        <div class="flex-right nav-bk" v-if="isShowRefresh || isShowReturnLeft">
            <Button v-if="isShowRefresh" @click="refresh" icon="md-refresh" style="margin-right: 10px;">刷新</Button>
            <Button v-if="isShowReturnLeft" @click="returnLeft" icon="md-return-left">返回</Button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "",
        props: {
            title: {
                type: String,
                default: ''
            },
            isShowRefresh: {
                type: Boolean,
                default: false
            },
            isShowReturnLeft: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            refresh() {
                this.$emit("refresh");
            },
            returnLeft() {
                this.$emit("returnLeft")
            }
        }
    }
</script>

<style scoped>
    .nav {
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #eaeaea;
        margin-top: 15px;
    }

    .flex {
        display: flex;
        overflow: hidden;

    }

    .flex-left {
        float: left;
    }

    .flex-right {
        float: right;
    }

    .sixilog {
        width: 15px;
        height: 15px;
        display: inline;
        margin-right: 10px;
    }

    .location {
        display: flex;
        align-items: center;
    }

    .nav-title {
        font-size: 18px;
        color: #666;
    }

    .nav-content {
        color: #72727c;
        font-size: 14px;
    }

    .nav-bk {
        padding: 24px 0;
    }
</style>