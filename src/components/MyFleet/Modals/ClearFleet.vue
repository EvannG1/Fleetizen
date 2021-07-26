<template>
    <div>
        <div class="modal fade" id="deleteShipModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Clear fleet</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Do you really want to remove all the ships from your fleet ?</p>
                    </div>
                    <div class="modal-footer d-flex justify-content-center">
                        <button @click="clearFleet" type="button" class="btn btn-danger" data-bs-dismiss="modal"><i class="fas fa-trash"></i> Delete</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><i class="fas fa-times"></i> Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        ids: Array,
    },
    methods: {
        clearFleet() {
            this.ids.forEach(id => {
                api.delete('ships/' + id).then(response => {
                    this.$root.$refs.MyFleet.getData();
                });
            });
        },
    }
}
</script>