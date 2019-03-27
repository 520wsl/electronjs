<template>
    <!--<div class="home">-->
    <!--<img src="../assets/logo.png">-->
    <!--<User></User>-->
    <!--<p>测试</p>-->
    <!--</div>-->
    <div>
        <User></User>
        <div style="padding:0 30px;">
            <Crumbs title="查排名"></Crumbs>
            <section class="search">
                <div class="search-options">店铺：
                    <Select class="search-options-input">
                        <Option :value="-1">乐青市柳市鞋厂</Option>
                        <Option :value="-1">乐青市柳市鞋厂</Option>
                        <Option :value="-1">乐青市柳市鞋厂</Option>
                        <Option :value="-1">乐青市柳市鞋厂</Option>
                        <Option :value="-1">乐青市柳市鞋厂</Option>

                    </Select>
                </div>
                <div class="search-options">查询方式：
                    <Select class="search-options-input">
                        <Option :value="-1">销量</Option>
                        <Option :value="1">综合</Option>

                    </Select>
                </div>
                <div class="search-sub">
                    <Button @click="search()" type="primary" icon="ios-search">查排名</Button>
                </div>
            </section>
            <div class="content">
                <Table :columns="columns1" :data="data1"></Table>
                <div class="page">
                    <!--<Page></Page>-->
                </div>
            </div>
            <Modal v-model="historyModal" footer-hide title="历史排名" width="800" :mask-closable="false">
                <Card>
                    <div slot="title">关键词：椰子鞋 排名目标：第一页 第二名</div>
                    <div slot="extra">
                        <DatePicker size="small" type="month" placeholder="年-月" style="width: 200px"></DatePicker>
                    </div>
                    <div class="content">
                        <Table :columns="columns2" :data="data1"></Table>
                        <div class="page">
                            <Page></Page>
                        </div>
                    </div>
                </Card>

            </Modal>
        </div>
    </div>

</template>

<script>
    import User from '@/components/User.vue'
    import Crumbs from '@/components/Crumbs.vue'

    export default {
        components: {
            User,
            Crumbs
        },
        methods: {
            search() {
                window.location.href = "http://172.30.34.114:8081/personal/index?par=cGFnZU5hbWUlM0RwZXJzb25hbFNlcnZpZQ%3D%3D&code=34077706522071040&state=electron"
            }
        },
        data() {
            return {
                title: '喜小帮查排名',
                historyModal: false,
                columns1: [
                    {
                        align: 'center',
                        title: '关键词',
                        key: 'name'
                    },
                    {
                        align: 'center',
                        title: '排名目标',
                        key: 'age'
                    },
                    {
                        align: 'center',
                        title: '排名',
                        key: 'age'
                    },
                    {
                        title: '宝贝标题',
                        key: 'address'
                    },
                    {
                        title: '查询时间',
                        key: 'date'
                    },
                    {
                        align: 'center',
                        title: '操作',
                        render: (h, params) => {
                            return h('div', [
                                h(
                                    'a',
                                    {
                                        style: 'margin:5px;color:#218FFF',
                                        props: {size: 'small'},
                                        on: {
                                            click: () => {
                                                this.historyModal = true
                                            }
                                        }
                                    },
                                    '历史排名'
                                )
                            ])
                        }
                    }
                ],
                columns2: [
                    {
                        align: 'center',
                        title: '查询时间',
                        key: 'date'
                    },

                    {
                        align: 'center',
                        title: '排名',
                        key: 'age'
                    },
                    {
                        title: '宝贝标题',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        name: '椰子鞋',
                        age: '第 1 页 第 2 名',
                        address: '淘皮猫INS超火的鞋子2019新…',
                        date: '2019-01-02 11:20:22'
                    },
                    {
                        name: '椰子鞋',
                        age: '第 1 页 第 2 名',
                        address: '淘皮猫INS超火的鞋子2019新…',
                        date: '2019-01-02 11:20:22'
                    },
                    {
                        name: '椰子鞋',
                        age: '第 1 页 第 2 名',
                        address: '淘皮猫INS超火的鞋子2019新…',
                        date: '2019-01-02 11:20:22'
                    },
                    {
                        name: '椰子鞋',
                        age: '第 1 页 第 2 名',
                        address: '淘皮猫INS超火的鞋子2019新…',
                        date: '2019-01-02 11:20:22'
                    }
                ]
            }
        }
    }
</script>
<style scoped>
    .search {
        padding: 30px 20px 20px 20px;
        background: #fff;
        border-radius: 3px;
        margin-bottom: 20px
        /* box-shadow: 0 2px 4px 0 rgba(222, 223, 224, 0.5); */
    }

    .search-options {
        margin-right: 30px;
        margin-bottom: 10px;
        max-width: 500px;
        display: inline-block;
    }

    .search-options-input {
        width: 200px;
        display: inline-block;
    }

    .search-sub {
        margin-bottom: 10px;
        display: inline-block;
    }

    .content {
        padding: 10px 10px;
        background: #fff;
        border-radius: 4px;
    }

    .setting {
        font-family: PingFangSC-Medium;
        margin: 5px 0 15px 5px;
    }

    .blue {
        font-size: 14px;
        color: #218fff;
        text-align: center;
        line-height: 20px;
    }

    .btn {
        margin-left: 25px;
        width: 88px;
    }

    .page {
        margin-top: 30px;
        text-align: right;
    }
</style>
