<template>
    <div>
        <div v-if="currentTab == 1 && objectBranch.tab==1">
            <Create @tab="redirectTab" v-model="objectBranch"/>
        </div>
        <div v-if="currentTab == 2">
            <Confirm @tab="redirectTab" @save="edit" v-model="objectBranch"/>
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
    name: 'edit-branch',
    data() {
        return {
            currentTab: 1,
            objectBranch: {
                tab:0,
            }
        }

    },
    methods: {
        ...mapActions(['getDetailBranch', 'editBranch']),
        // emit child
        edit() {
            delete this.objectBranch.companyName
            delete this.objectBranch.queryEmployer
            delete this.objectBranch.tab
            this.objectBranch.dayoffIds = this.objectBranch.dayoffIds.toString(),
            this.editBranch(this.objectBranch)
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

        redirectTab(tab) {
            this.currentTab = tab;
        },

        getDetail() {
            let loading = this.$loading.show();
            this.getDetailBranch(this.$route.params.id)
                .then(res => {
                    if (res.data.address) {
                        res.data.address.stations.map(val => {
                        for (let i in val) {
                            if (i != 'description' && i != 'stationId') delete val[i]
                        }
                        });
                    }
                    loading.hide();
                    this.objectBranch = Object.assign({}, {
                        id: res.data.id,
                        employerId: res.data.employerId,
                        companyName: res.data.employerId,
                        queryEmployer: '',
                        email: res.data.email,
                        name: res.data.name,
                        mobile: res.data.mobile,
                        fax: res.data.fax,
                        openTime: this.formatShift(res.data.openTime),
                        closeTime: this.formatShift(res.data.closeTime),
                        dayoffIds: res.data.dayoffIds ? res.data.dayoffIds.split(',').map( Number ) : [],
                        allDayOpen: res.data.allDayOpen ? res.data.allDayOpen : false,
                        openFullDay: res.data.openFullDay ? res.data.openFullDay : false,
                        publicHoliday: res.data.publicHoliday ? res.data.publicHoliday : false,
                        section: res.data.section ? res.data.section : BranchSection.PUBLIC,
                        tab:1,
                        sameAddress: res.data.sameAddress ? res.data.sameAddress : false,
                        address: {
                            zipCode: res.data.address ? res.data.address.zipCode : null,
                            provinceId: res.data.address ? res.data.address.provinceId : null,
                            districtId: res.data.address ? res.data.address.districtId : null,
                            address: res.data.address ? res.data.address.address : null,
                            townName: res.data.address ? res.data.address.townName : null,
                            stations: (res.data.address && res.data.address.stations && res.data.address.stations.length) ? res.data.address.stations : [
                                {
                                    stationId: null,
                                    description: ''
                                }
                            ],
                        },
                        images: res.data.images && res.data.images.length ? res.data.images.map(e => e.image) : [],
                        description: res.data.description
                      })
                })
                .catch(err => {
                    loading.hide();
                    this.$error(err.messages);
                })
        },

    },
    mounted() {
        this.getDetail();
    },

}
</script>

<style scoped>

</style>
