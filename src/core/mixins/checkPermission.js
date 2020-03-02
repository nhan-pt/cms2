import Vue from 'vue';
import CONSTANTS from '../../core/utils/constants';

Vue.mixin({
    methods: {
        $isPermiss(key){
            if(typeof(localStorage) && localStorage.getItem(CONSTANTS.CURRENT_USER)){
                let userCurrent = JSON.parse(localStorage.getItem(CONSTANTS.CURRENT_USER));
                let permission = JSON.parse(localStorage.getItem(CONSTANTS.USER_PERMISSIONS));
                for(let i = 0; i< permission.length; i++){
                    if(permission[i].userId == userCurrent.id && permission[i].permissionId == key) {
                        return true;
                    }
                }
            }
            return false;
        }
    }
});