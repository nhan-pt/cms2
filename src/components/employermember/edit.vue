<template>
<div v-if="this.objectData">
    <div v-if="currentTab.tabId == 1">
        <Create @create="create" v-model="objectData" :onTabClick="this.clickTab" @resetFilters="resetFilters">

        </Create>
    </div>
    <div v-if="currentTab.tabId == 2">
        <Confirm @create="create" v-model="objectData" :objectData="objectData" :onTabClick="this.clickTab">
        </Confirm>
    </div>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex';
export default {
    components: {
        Create: () => import('./add/index'),
        Confirm: () => import('./add/confirm'),
    },
    data() {
        return {

            detail: {},
            currentTab: {
                tabId: 1,
                label: 'Create'
            },
            listTab: [{
                    tabId: 1,
                    label: 'Create',
                    status: 'active'
                },
                {
                    tabId: 2,
                    label: 'Confirm',
                    status: 'deactive'
                },
            ],
            objectData: null
        }

    },
    mounted() {
        this.getDetail();
    },
    created() {
        this.employerMemberId = this.$route.params.id;
    },
    methods: {
        ...mapActions(['getDetailEmployerMember']),
        resetFilters() {
            if (this.detail.address === null) {
                this.detail.address = {
                    zipCode: null,
                    districtId: null,
                    provinceId: null,
                    townName: null
                }
            }
            Object.assign(this.objectData, this.detail)
            this.objectData.images = this.detail.images
            delete this.objectData.id
            delete this.objectData.contactName
            delete this.objectData.buildingName
            delete this.objectData.jobTypeId
            delete this.objectData.street
            delete this.objectData.createdDate
            delete this.objectData.modifiedDate
            delete this.objectData.provinceId
            delete this.objectData.districtId

            if (this.objectData.address) {
                delete this.objectData.address.provinceName
                delete this.objectData.address.districtName
                delete this.objectData.address.addressId
                delete this.objectData.address.lat
                delete this.objectData.address.long
                delete this.objectData.address.blockName
                if (this.objectData.address.stations != null) {
                    this.objectData.address.stations.map(i => {
                        delete i.createdDate
                        delete i.trainStationName
                        delete i.trainLineName
                        delete i.addressId
                    })
                }
            }
        },
        // Next 
        clickTab(item) {
            this.listTab.map(e => {
                e.status = 'deactive'
                if (e.tabId != item) return;
                else {
                    e.status = 'active'
                    this.currentTab = e
                }
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;

            })
        },
        // emit child
        create(objectData) {
            this.objectData = objectData;
        },
        getDetail() {
            let loading = this.$loading.show();
            this.getDetailEmployerMember({
                    id: this.employerMemberId
                })
                .then(res => {
                    this.detail = res.data;
                    this.objectData = {
                        ...res.data
                    };
                    delete this.objectData.id
                    delete this.objectData.contactName
                    delete this.objectData.buildingName
                    delete this.objectData.jobTypeId
                    delete this.objectData.street
                    delete this.objectData.createdDate
                    delete this.objectData.modifiedDate
                    delete this.objectData.provinceId
                    delete this.objectData.districtId

                    if (this.objectData.address) {
                        delete this.objectData.address.provinceName
                        delete this.objectData.address.districtName
                        delete this.objectData.address.addressId
                        delete this.objectData.address.lat
                        delete this.objectData.address.long
                        delete this.objectData.address.blockName
                        this.objectData.address.stations.map(i => {
                            delete i.createdDate
                            delete i.trainStationName
                            delete i.trainLineName
                            delete i.addressId
                        })
                    }
                    loading.hide();
                })
                .catch(err => {
                    loading.hide();

                    this.$error(err.messages);
                })
        },

    },

}
</script>

<style scoped>

</style>
