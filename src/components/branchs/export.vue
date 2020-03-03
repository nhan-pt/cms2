<template>
  <button class="btn btn-csv" @click="csvExport()">{{$i('cms_employer_list_csv_dowload')}}</button>
</template>

<script>
import {
    mapActions
} from "vuex";
import {
    ExportToCsv
} from "export-to-csv";
import {BranchSection} from '../../types/enum'

export default {
    name: "export",
    data() {
        return {
            detail: [],
            listSection: [
                {
                    id: BranchSection.PRIVATE,
                    name: 'employer_private'
                },
                {
                    id: BranchSection.PUBLIC,
                    name: 'employer_public'
                }
            ],
        };
    },

    methods: {
        ...mapActions(['getListBranch']),

        getSection(section) {
            return this.$i(this.listSection.find(st => st.id ==  section).name) || ''
        },
        // export csv
        csvExport() {
            let obj = JSON.parse(localStorage.getItem("search-branch")) || {}
            if(!obj.searchQuery) delete obj.searchQuery
            else obj.searchQuery = obj.searchQuery.trim()
            if(!obj.provinceId) delete obj.provinceId
            if(!obj.stationIds || !obj.stationIds.length) delete obj.stationIds
            else obj.stationIds = obj.stationIds.toString()
            if(!obj.districtId) delete obj.districtId
            obj.pageSize = 999
            obj.pageIndex = 1
            this.getListBranch(obj)
                .then(response => {
                    const options = {
                        fieldSeparator: ",",
                        quoteStrings: '"',
                        decimalSeparator: ".",
                        filename: this.$i('employer_branch'),
                        useTextFile: false,
                        useBom: true,
                        useKeysAsHeaders: true
                    };
                    let title = [
                        '#',
                        'ID',
                        this.$i('cms_employer_list_employer'),
                        this.$i('employer_name_branch'),
                        this.$i('employer_job_post_detail_location'),
                        this.$i('cms_job_post_nearest_station'),
                        this.$i('employer_name_section'),
                    ];
                    this.detail = response.data;
                    this.detail.map(e => {  
                        e.sectionName = this.getSection(e.section)
                        e.addressBranch = e.address.provinceName + e.address.districtName + e.address.townName + e.address.address
                        e.stations = "";
                        if (e.address && e.address.stations.length != 0)
                        e.stations = e.address.stations
                            .map(i => i.trainStationName)
                            .toString(", ");
                    });
                    let dataExport = [];
                    dataExport[0] = title;
                    let index = 1
                    this.detail.map(e => {
                        let tmp = {
                            index: index,
                            id: e.id,
                            employerCompanyName: e.employerCompanyName,
                            name: e.name,
                            address: e.addressBranch,
                            stations: e.stations,
                            sectionName: e.sectionName,
                        }
                        index++
                        dataExport.push(Object.values(tmp))
                    });
                    const csvExporter = new ExportToCsv(options);
                    csvExporter.generateCsv(dataExport);
                })
                .catch(error => {
                  this.$error(error.message);
                });
        }
    }
};
</script>

<style scoped>

</style>
