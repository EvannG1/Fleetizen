<template>
    <div>
        <div class="modal fade" id="addShipModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add ship</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group mb-3">
                                <label for="ship-model" class="form-label">Ship Model</label>
                                <input type="text" class="form-control" id="ship-model" v-model="name" required>
                            </div>
                            <div class="from-group mb-3">
                                <label for="ship-image-url" class="form-label">Image URL</label>
                                <input type="text" class="form-control" id="ship-image-url" v-model.lazy="image" @change="loadImage()">
                                <small v-if="shipImageFailed" class="text-danger fw-bold"><i class="fas fa-exclamation-triangle"></i> {{ shipImageFailedMessage }}</small>
                            </div>

                            <img v-if="image == ''" class="mb-3" style="display:none;">
                            <img v-else-if="!shipImageFailed" :src="image" class="mb-3" alt="ship-image" width="100%">

                            <div class="from-group mb-3">
                                <label for="ship-quantity" class="form-label">Quantity</label>
                                <input type="number" class="form-control" id="ship-quantity" v-model="quantity" required>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer d-flex justify-content-center">
                        <button v-if="!shipImageFailed" @click="addShip" type="button" class="btn btn-success" data-bs-dismiss="modal"><i class="fas fa-check"></i> Save changes</button>
                        <button v-else type="button" class="btn btn-success" disabled><i class="fas fa-check"></i> Save changes</button>
                        <button type="button" class="btn btn-danger"><i class="fas fa-trash"></i> Delete ship</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            shipImageFailed: false,
            shipImageFailedMessage: '',
            image: '',
            name: '',
            quantity: ''
        }
    },
    methods: {
        loadImage() {
            let url = this.image;
            if(url == '') {
                this.shipImageFailedMessage = "This field is required.";
                this.shipImageFailed = true;
            } else if (!url.includes("robertsspaceindustries.com") && !url.includes("starcitizen.tools")) {
                this.shipImageFailedMessage = "Only from RSI or starcitizen.tools.";
                this.shipImageFailed = true;
            } else {
                this.shipImageFailed = false;
            }
        },
        addShip() {
            if(!this.shipImageFailed) {
                api.post('ships', {
                    name: this.name,
                    image: this.image,
                    quantity: this.quantity,
                    citizen_id: 'test'
                }).then(response => {
                    this.$root.$refs.MyFleet.getData();
                });
            }
        }
    }
}
</script>