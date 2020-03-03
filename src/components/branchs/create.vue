<template>
    <div>
        <div v-if="currentTab == 1">
            <Create @tab="redirectTab" v-model="objectBranch"/>
        </div>
        <div v-if="currentTab == 2">
            <Confirm @tab="redirectTab" @save="add" v-model="objectBranch"/>
        </div>
    </div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex';
import {BranchSection} from '../../types/enum'
export default {
    components: {
        Create: () => import('./add/index'),
        Confirm: () => import('./add/confirm'),
    },
    name:'create-branch',
    data() {
        return {
            currentTab: 1,
            objectBranch: {
                employerId: null,
                companyName: null,
                queryEmployer: null,
                email: null,
                name: null,
                mobile: null,
                fax:null,
                openTime:null,
                closeTime: null,
                dayoffIds:[],
                allDayOpen: false,
                openFullDay: false,
                publicHoliday: false,
                section: BranchSection.PUBLIC,
                sameAddress: false,
                address: {
                    zipCode: null,
                    provinceId: null,
                    districtId: null,
                    address: "",
                    townName: "",
                    stations: [
                        {
                        stationId: null,
                        description: ''
                        }
                    ],
                },
                images: [],
                description: ''
            }
        }

    },
    methods: {
        ...mapActions(['createBranch']),
        // emit child
        redirectTab(tab) {
            this.currentTab = tab;
        },
        add() {
            delete this.objectBranch.companyName
            delete this.objectBranch.queryEmployer
            this.objectBranch.dayoffIds = this.objectBranch.dayoffIds.toString(),
            this.createBranch(this.objectBranch)
            .then(res => {
                if (res.success) {
                    this.$message(this.$i('Successful'));
                }   
                this.$router.push('/branch')
            })
            .catch(err => {
                this.$error(err.message);
            })   
        },
    }

}
</script>

<style scoped>

</style>
