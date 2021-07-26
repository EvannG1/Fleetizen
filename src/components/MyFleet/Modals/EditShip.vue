<template>
    <div>
        <div class="modal fade" :id="uuid" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit ship</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group mb-3">
                                <label for="ship-model" class="form-label">Ship Model</label>
                                <input type="text" class="form-control" id="ship-model" v-model="newName" required>
                            </div>
                            <div class="from-group mb-3">
                                <label for="ship-image-url" class="form-label">Image URL</label>
                                <input type="text" class="form-control" id="ship-image-url" v-model.lazy="newImage" @change="loadImage()">
                                <small v-if="shipImageFailed" class="text-danger fw-bold"><i class="fas fa-exclamation-triangle"></i> {{ shipImageFailedMessage }}</small>
                            </div>

                            <img v-if="!shipImageFailed" :src="newImage" class="mb-3" alt="ship-image" width="100%">

                            <div class="from-group mb-3">
                                <label for="ship-quantity" class="form-label">Quantity</label>
                                <input type="number" class="form-control" id="ship-quantity" v-model="newQuantity" required>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer d-flex justify-content-center">
                        <button v-if="!shipImageFailed" @click="editShip" type="button" class="btn btn-success" data-bs-dismiss="modal"><i class="fas fa-check"></i> Save changes</button>
                        <button v-else type="button" class="btn btn-success" disabled><i class="fas fa-check"></i> Save changes</button>
                        <button @click="deleteShip" type="button" class="btn btn-danger" data-bs-dismiss="modal"><i class="fas fa-trash"></i> Delete ship</button>
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
            newImage: '',
            newName: '',
            newQuantity: ''
        }
    },
    props: {
        id: String,
        uuid: String,
        name: String,
        quantity: Number,
        image: String
    },
    mounted() {
        this.newName = this.name;
        this.newImage = this.image;
        this.newQuantity = this.quantity;
    },
    methods: {
        loadImage() {
            let url = this.newImage;
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
        editShip() {
            if(!this.shipImageFailed) {
                api.put('ships/' + this.id, {
                    name: this.newName,
                    image: this.newImage,
                    quantity: this.newQuantity
                }).then(response => {
                    this.$root.$refs.MyFleet.getData();
                });
            }
        },
        deleteShip() {
            api.delete('ships/' + this.id).then(response => {
                this.$root.$refs.MyFleet.getData();
            });
        }
    }
}
</script>