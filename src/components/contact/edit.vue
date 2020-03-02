<template>
    <div>
        <div class="row" v-if="objData">
            <div class="col-lg-12">
                <div class="form-group">
                    <label>{{$i('Email')}}</label>
                    <input type="text" class="form-control" :placeholder="$i('Email')"
                           v-model="objData.email" disabled/>
                </div>
                <div class="form-group">
                    <label>{{$i('Content')}}</label>
                    <input type="text" class="form-control" :placeholder="$i('Content')"
                           v-model="objData.content" disabled/>
                </div>
                <div class="form-group">
                    <label>{{$i('Subject')}}</label>
                    <input type="text" class="form-control" :placeholder="$i('Subject')"
                           v-model="objData.subject" disabled/>
                </div>
                <div class="form-group" v-if="objData.userName">
                    <label>{{$i('ExecutedBy')}}</label>
                    <input type="text" class="form-control" :placeholder="$i('UserName')"
                           v-model="objData.userName" disabled/>
                </div>
                <div class="form-group">
                    <label>{{$i('Status')}}</label>
                    <select class="form-control" v-model="objData.status">
                        <option v-for="v in listStatus" :key="v.id" :value="v.id">{{ $i(v.status) }}</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="form-group">
            <button class="btn btn-primary" v-on:click="editContact()">
                <span>{{ $i('Save') }}</span>
            </button>
        </div>
    </div>
</template>
<script>
    import { mapActions} from 'vuex';

    export default {
        props: ['contactId', 'listStatus'],
        data() {
            return {
                objData: null,
            }
        },
        methods: {
            ...mapActions(['getDetailContact', 'updateContact']),
            getContact() {
                this.getDetailContact(this.contactId).then(res => {
                    this.objData = res.data;
                }).catch((error) => {
                    return this.$message(error.message, 'error');
                });
            },
            editContact() {
                this.updateContact(this.objData).then((response) => {
                    if (response.success) {
                        this.$message(this.$i('Successful'));
                        this.$emit('closePopup');
                    }
                }).catch((error) => {
                    return this.$message(error.message, 'error');
                });
            }
        },
        created() {
            this.getContact();
        },
    }
</script>