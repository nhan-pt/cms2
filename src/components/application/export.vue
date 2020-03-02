<template>
<button class="btn btn-csv-applicant" @click="csvExport()">CSV Dowload</button>
</template>

<script>
import {
    mapActions
} from "vuex";
import {
    ExportToCsv
} from "export-to-csv";
import {Gender} from '../../types/enum'
export default {
    name: "export",
    props: {
        objData: {
            type: Object
        }
    },
    data() {
        return {
            detail: [],
            listGender: Gender,
        };
    },
    methods: {
        ...mapActions(["exportApplicant"]),
        getGender(genderId) {
            if(genderId > 0) return this.$i(this.listGender.find(gender => gender.id ==  genderId).name) || ''
            return ''
        },
        // export csv
        csvExport() {
            this.objData.pageSize = 999
            this.exportApplicant(this.objData)
                .then(response => {
                    const options = {
                        fieldSeparator: ",",
                        quoteStrings: '"',
                        decimalSeparator: ".",
                        filename: "Applicant",
                        useTextFile: false,
                        useBom: true,
                        useKeysAsHeaders: true
                    };
                    let title = [
                        '#',
                        this.$i('ID'),
                        this.$i('cms_applied_date'),
                        this.$i('cms_candidate_name'),
                        this.$i('cms_csv_katakana'),
                        this.$i('Cellphone'),
                        this.$i('cms_applicant_email_address'),
                        this.$i('gender'),
                        this.$i('birthday'),
                        this.$i('japanese_level'),
                        this.$i('cms_csv_address'),
                        this.$i('cms_job_post_input_search_location'),
                        this.$i('cms_status_residence'),
                        this.$i('cms_recruitment_shift'),
                        this.$i('cms_interview_schedule'),
                    ];
                    this.detail = response.data;
                    this.detail.map(e => {
                        e.createdDate = e.createdDate ? this.formatDate(e.createdDate) : "";
                        e.mobile = e.candidate && e.candidate.mobile != null ? e.candidate.mobile : ""
                        e.japaneseSkillName = e.candidate && e.candidate.japaneseSkillName != null ? e.candidate.japaneseSkillName : ""
                        e.gender = e.candidate && e.candidate.gender != null ? this.getGender(e.candidate.gender) : ""
                        e.birthday = e.candidate && e.candidate.birthday != null ? this.formatDate(e.candidate.birthday) : ""
                        e.residentName = e.candidate && e.candidate.residentName != null ? e.candidate.residentName : ""
                        e.katakanaName = e.candidate && e.candidate.katakanaName != null ? e.candidate.katakanaName : ""
                        e.name = e.candidate && e.candidate.name != null ? e.candidate.name : ""
                        e.location = e.employerPost && e.employerPost.shopName != null ? e.employerPost.shopName : ""
                        e.interviewSchedules = e.interviewSchedules && e.interviewSchedules.length != 0 ? e.interviewSchedules.map(i => this.formatDate(i.interviewDate) + " " + this.formatShift(i.startHour) + "~" + this.formatShift(i.endHour)).toString(", ") : ""
                        e.applyShiftJobInPosts = e.applyShiftJobInPosts && e.applyShiftJobInPosts.length != 0 ? e.applyShiftJobInPosts.map(i => i.name + " " + this.formatShift(i.startWorking) + "~" + this.formatShift(i.endWorking)).toString(", ") : ""
        
                        if (e.candidate && e.candidate.address != null) {
                            e.address = '' 
                            e.address = e.candidate.address.provinceName ? e.candidate.address.provinceName : ''
                            e.address = e.candidate.address.districtName ? e.address + e.candidate.address.districtName : e.address
                            e.address = e.candidate.address.townName ? e.address + e.candidate.address.townName : e.address
                            e.address = e.candidate.address.address ? e.address + e.candidate.address.address : e.address
                        } else {
                            e.address = ""
                        }
                    });
                    let dataExport = [];
                    dataExport[0] = title;
                    let index= 1
                    this.detail.map(e => {
                        let tmp = {
                            index: index,
                            id: e.id,
                            createdDate: e.createdDate,
                            fullName: e.name,
                            katakanaName: e.katakanaName,
                            mobile: e.mobile,
                            email: e.candidate.email,
                            gender: e.gender,
                            birthday: e.birthday,
                            japaneseSkillName: e.japaneseSkillName,
                            address: e.address,
                            location: e.location,
                            residentName: e.residentName,
                            applyShiftJobInPosts: e.applyShiftJobInPosts,
                            interviewSchedules: e.interviewSchedules

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
.export-data:hover {
    color: #5bc0de;
}
</style>
