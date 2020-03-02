<template>
<div>
    <div v-if="currentTab.tabId == 1">
        <Create @create="create" v-model="objectData" :v-model="objectData" :onTabClick="this.clickTab" @resetFilters="resetFilters">

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
            objectData: {
                established: null,
                email: null,
                mobile: null,
                companyName: null,
                avatar: null,
                totalEmployee: null,
                catchPhrase: null,
                publicRelation: null,
                companyIntrodution: null,
                fax:null,
                capital: null,
                revenue: null,
                representative: null,
                serviceArea: null,
                businessDescription: null,
                companyWebsite: null,
                section: null,
                status: 1,
                address: {
                    zipCode: "",
                    provinceId: null,
                    districtId: null,
                    address: "",
                    townName: "",
                    stations: [],
                },
                images: [],
                password: "",
            }
        }

    },
    methods: {
         resetFilters() {
                this.objectData.avatar = null
                this.objectData.companyName = null
                this.objectData.catchPhrase =null
                this.objectData.publicRelation = null
                this.objectData.companyIntrodution = null
                this.objectData.address.zipCode = null
                this.objectData.address.provinceId = null
                this.objectData.address.districtId = null
                this.objectData.address.address = null
                this.objectData.address.townName = null
                this.objectData.mobile = null
                this.objectData.fax = null
                this.objectData.capital = null
                this.objectData.revenue = null
                this.objectData.section = null
                this.objectData.representative = null
                this.objectData.totalEmployee = null
                this.objectData.serviceArea = null
                this.objectData.businessDescription = ""
                this.objectData.email = null
                this.objectData.companyWebsite = null
                this.objectData.password = null
                this.objectData.established = null
                this.objectData.images = []
            
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
    }

}
</script>

<style scoped>

</style>
