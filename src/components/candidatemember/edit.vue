<template>
  <div class="template w-100 bg-white position-relative">
    <div class="d-flex align-items-center template-title ">
      <i class="fas fa-bars mr-20"></i>
        <p class="m-0" v-if="$route.params.id">{{$i('cms_candidate_edit')}}</p>
      <p class="m-0" v-else>{{$i('cms_candidate_create')}}</p>
    </div>
    <section class="group-content-candidate__ha">
  <section class="group-tab-candidate__ha" id="tab-candidate__ha">
    <div class="group-panelhead-create-candidate mb-5">
      <div class="list-item-create-candidate">
        <div v-for="(e,i) in listTab" :key="i" class="item-create-candidate" :class="{ 'active': e.status == 'active'}">
          <div class="text">{{$i(e.label)}}</div>
        </div>
      </div>
    </div>
    <div class="tab-content panel-body__ha">
      <div v-if="currentTab==1">
        <basicInfo v-model="objData" @nextTab="nextTab" @confirmTab="clickTab(6)"></basicInfo>
      </div>
      <div v-if="currentTab==2">
        <school v-model="objData" @nextTab="nextTab" @previousTab="previousTab" @confirmTab="clickTab(6)"></school>
      </div>
      <div v-if="currentTab==3">
        <education v-model="objData" @nextTab="nextTab" @previousTab="previousTab" @confirmTab="clickTab(6)"></education>
      </div>
      <div v-if="currentTab==4">
        <workdesires v-model="objData" @nextTab="nextTab" @previousTab="previousTab" @confirmTab="clickTab(6)"></workdesires>
      </div>
      <div v-if="currentTab==5">
        <introductionvideo v-model="objData" @nextTab="nextTab" @previousTab="previousTab"></introductionvideo>
      </div>
      <div v-if="currentTab==6">
        <review v-model="objData" @nextTab="nextTab" @previousTab="previousTab" @tab="editTab" @save="createCdd"></review>
      </div>
    </div>
  </section>
</section>
  </div>
</template>

<script>
import {
  mapActions,
  mapGetters,
} from 'vuex'
import {
  _,
  isArray,
  isObject,
  assign,
  isEmpty
} from "lodash";

export default {
  name: "edit",
  data() {
    return {
      listTab: [{
          id: 1,
          label: 'basic_information',
          status: 'active',
        },
        {
          id: 2,
          label: 'cms_school',
          status: 'deactive',
        },
        {
          id: 3,
          label: 'cms_education',
          status: 'deactive',
        },
        {
          id: 4,
          label: 'cms_work_desires',
          status: 'deactive',
        },
        {
          id: 5,
          label: 'cms_self_introduction_video',
          status: 'deactive',
        },
        {
          id: 6,
          label: 'cms_confirmation',
          status: 'deactive',
        },
      ],
      currentTab: 1,
      objData: {
        fullName: '',
        mobile: '',
        katakanaName: '',
        birthday: null,
        regime: [],
        video: '',
        email: '',
        password: '',
        confirmPassword: '',
        lineUserId: '',
        facebookUrl: '',
        memberCard: {
          residentTypeId: null,
          cardCode: '',
          cardDate: null,
          cardImage1: '',
          cardImage2: '',
        },
        address: {
          zipCode: null,
          provinceId: null,
          districtId: null,
          townName: '',
          address: '',
          provinceId: '',
          stations: [{
            stationId: null,
            description: '',
          }],
        },
        candidateLanguage: {
          japaneseReadLevelId: null,
          japaneseWriteLevelId: null,
          languageLevelId: null,
          memberLanguageId: null,
          japaneseCertificationId: null,
          otherLanguage: [],
        },
        candidateSchool: {
          name: '',
          description: '',
          schoolTime: '',
          address: {
            zipCode: null,
            provinceId: null,
            districtId: null,
            townName: '',
            provinceId: '',
            address: '',
            stations: [{
              stationId: null,
              description: '',
            }],
          },
        },
        learningHistorys: [],
        workingHistorys: []
      }
    }
  },
  components: {
    basicInfo: () => import('./edit/basic-info'),
    school: () => import('./edit/school'),
    education: () => import('./edit/education'),
    workdesires: () => import('./edit/work-desires'),
    introductionvideo: () => import('./edit/self-introduction-video'),
    review: () => import('./edit/review'),
  },
  methods: {
    ...mapActions(['createCandidate', 'getDetailCandidateMember', 'updateCandidate']),

    getDetail() {
      let loading = this.$loading.show();
      this.getDetailCandidateMember({
          id: this.$route.params.id
        })
        .then((res) => {
          loading.hide();
          if (res.data.address) {
            res.data.address.stations.map(val => {
              for (let i in val) {
                if (i != 'description' && i != 'stationId') delete val[i]
              }
            });
          }

          if (res.data.school && res.data.school.address) {
            res.data.school.address.stations.map(val => {
              for (let i in val) {
                if (i != 'description' && i != 'stationId') delete val[i]
              }
            });
          }
          let learningHistory = []
          res.data.learningHistory.filter(val => {
            let obj = {}
            for (let i in val) {
              if (i == 'learningCategoryId' || i == 'title' || i == 'name') obj[i] = val[i]
              else if (i == 'startDate' || i == 'endDate') obj[i] = this.formatDate(val[i])
            }
            learningHistory.push(obj)
          });

          let workingHistory = []
          res.data.workingHistory.filter(val => {
            let obj = {}
            for (let i in val) {
              if (i == 'workingCategoryId' || i == 'title' || i == 'name') obj[i] = val[i]
              else if (i == 'startDate' || i == 'endDate') obj[i] = this.formatDate(val[i])
            }
            workingHistory.push(obj)
          });

          this.objData = assign({},this.objData, {
            id: res.data.id,
            fullName: res.data.fullName,
            mobile: res.data.mobile,
            katakanaName: res.data.katakanaName,
            birthday: this.formatDate(res.data.birthday),
            regime: res.data.regime.map(e => e.id),
            video: res.data.video,
            email: res.data.contactEmail,
            lineUserId: res.data.lineUserId,
            facebookUrl: res.data.facebookUrl,
            memberCard: {
              residentTypeId: res.data.residentTypeId,
              cardCode: res.data.cardCode,
              cardDate: this.formatDate(res.data.cardDate),
              cardImage1: res.data.cardImage1,
              cardImage2: res.data.cardImage2,
            },
            candidateLanguage: {
              memberLanguageId: res.data.memberLanguageId,
              japaneseCertificationId: res.data.japaneseCertificationId,
              languageLevelId: res.data.languageLevelId,
              otherLanguage: res.data.otherLanguage ? res.data.otherLanguage.split(",").map(e => parseInt(e)) : []
            },
            learningHistorys: learningHistory,
            workingHistorys: workingHistory,
            
          }); 

          if(res.data.address){
             this.objData.address = {
              zipCode: res.data.address.zipCode,
              provinceId: res.data.address.provinceId,
              districtId: res.data.address.districtId,
              address: res.data.address.address,
              townName: res.data.address.townName,
              stations: res.data.address.stations,

            }
          }

          if(res.data.school){
             this.objData.candidateSchool = {
              name: res.data.school.name,
              description: res.data.school.description,
              schoolTime: res.data.school.schoolTime,
              address: res.data.school.address ? {
                zipCode: res.data.school.address.zipCode,
                provinceId: res.data.school.address.provinceId,
                districtId: res.data.school.address.districtId,
                townName: res.data.school.address.townName,
                provinceId: res.data.school.address.provinceId,
                address: res.data.school.address.address,
                stations: res.data.school.address.stations,
              }:this.objData.candidateSchool.address,
            }
          }

        })
        .catch(err => {
          loading.hide();
          this.$error(err.message);
        })
    },
    editTab(tab) {
      this.clickTab(tab);
    },
    clickTab(item) {
      this.listTab.map(e => {
        e.status = 'deactive'
        if (e.id != item) return;
        else {
          e.status = 'active'
          this.currentTab = e.id
        }
      })
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    nextTab() {
      let futureTab = this.currentTab + 1
      if (this.currentTab < this.listTab.length) {
        this.clickTab(futureTab);
      }
    },
    previousTab() {
      let futureTab = this.currentTab - 1
      if (this.currentTab > 1) {
        this.clickTab(futureTab);
      }
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    formatData(object) {
      for (let property in object) {
        let value = object[property]
        if (value === '' || value === null) delete object[property]
        else if (isArray(value)) {
          if (!value.length) delete object[property]
          else {
            object[property] = value.filter(val => {
              if (!isObject(val)) return true;
              else {
                for (let i in val) {
                  if (val[i] === '' || val[i] == null) return false
                }
                return true;
              }
            })
            if(!object[property].length) delete object[property]
          }
        } else if (isObject(value)) {
          object[property] = this.formatData(value)
        }
      }
      return object
    },
    createCdd() {
      if (this.objData.confirmPassword) delete this.objData.confirmPassword
      let data = {
        ...this.objData
      };
      data = this.formatData(data);
      if(isEmpty(data.candidateSchool.address)) delete data.candidateSchool.address
      if(isEmpty(data.candidateSchool)) delete data.candidateSchool
      setTimeout(() => {
        if (this.$route.params.id) this.updateCandidateMember(data);
        else this.insertCandidate(data);
      }, 200);
    },
    insertCandidate(data) {
      let loading = this.$loading.show();
      this.createCandidate(data).then((res) => {
        if (res.success) {
          this.$message(this.$i('Successful'));
          loading.hide();
        }
        setTimeout(() => {
          this.$router.push('/candidatemember');
        }, 1500)
      }).catch(err => {
        loading.hide();
        this.$message(err.message, 'error');
      })
    },
    updateCandidateMember(data) {
      let loading = this.$loading.show();
      this.updateCandidate(data).then((res) => {
        if (res.success) {
          loading.hide();
          this.$message(this.$i('Successful'));
        }
        setTimeout(() => {
          this.$router.push('/candidatemember');
        }, 1500)
      }).catch(err => {
        loading.hide();
        this.$message(err.message, 'error');
      })
    }

  },
  mounted() {
    if (this.$route.params.id) this.getDetail();
  }
}
</script>

<style scoped>

</style>
