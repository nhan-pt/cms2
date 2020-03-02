<template>
  <button class="btn btn-csv" @click="csvExport()">{{$i('cms_employer_list_csv_dowload')}}</button>
</template>

<script>
import { mapActions } from "vuex";
import { ExportToCsv } from "export-to-csv";

export default {
  name: "export",
  props: {
    objData: {
      type: Object
    }
  },
  data() {
    return {
      detail: []
    };
  },

  methods: {
    ...mapActions(["exportEmployer"]),
// export csv
    csvExport() {
      this.exportEmployer(this.objData)
        .then(response => {
          const options = {
            fieldSeparator: ",",
            quoteStrings: '"',
            decimalSeparator: ".",
            filename: "Employer",
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders:true
          };
          let title = [
            "id",
            this.$i('cms_employer_list_employer'), 
            this.$i('cms_employer_list_location_num'),
            this.$i('cms_employer_list_Address'), 
            this.$i('cms_employer_list_Station'), 
            this.$i('cms_employer_list_Employee _num '), 
            this.$i('cms_employer_list_capital'), 
            this.$i('cms_employer_list_Section'), 
            this.$i('cms_employer_list_Status'),
            ];
          this.detail = response.data;
          this.detail.map(e => {
            e.Employer = e.companyName ? e.companyName : "";
            e.Locations_Num = e.totalBranches ? e.totalBranches : "";
            e.Employee_num = e.totalEmployee ? e.totalEmployee : "";
            e.section =
              e.section == 1 ? this.$i('cms_employer_list_public') : e.section == 0 ? this.$i('cms_employer_list_private') : "";
            e.status =
              e.status == 1 ? this.$i('cms_employer_list_active') : e.status == 2 ? this.$i('cms_employer_list_unconfirm') : "";
            e.capital = e.capital ? e.capital : "";
            e.Station = "";
            if (e.address && e.address.stations.length != 0)
              e.Station = e.address.stations
                .map(i => i.trainStationName)
                .toString(", ");
            e.Address = e.address && e.address.districtName && e.address.provinceName &&e.address.townName&& e.address.address
              ? (e.address.provinceName )  + "" + (e.address.districtName  )+""+(e.address.townName)+""+(e.address.address)
              : ( e.address && e.address.districtName && e.address.provinceName && e.address.address ) ?  (e.address.provinceName )  + "" + (e.address.districtName  )+""+(e.address.address):"" ;
            delete e.address;
            delete e.companyName;
            delete e.totalBranches;
            delete e.totalEmployee;
            // Object.push(e.Employer,e.Locations_Num,e.Address,e.Station,e.Employee_num,e.capital,e.section,e.status)
          });
          let dataExport = [];       
          dataExport[0] = title;
          this.detail.map(e =>{
            let tmp = {
              id:e.id,
              Employer:e.Employer,
              Locations_Num:e.Locations_Num,
              Address:e.Address,
              Station:e.Station,
              Employee_num:e.Employee_num,
              capital:e.capital,
              section:e.section,
              status:e.status
            }
            dataExport.push(Object.values(tmp))
          } );
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
