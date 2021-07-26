<template>
    <div>
        <div class="card mb-3">
            <div class="card-body">
                <div class="row">
                    <div class="col-11">
                        <h5 class="card-title">{{ name }}</h5>
                    </div>
                    <div class="col-1 d-flex justify-content-end">
                        <i class="fas fa-pen edit-ship" data-bs-toggle="modal" :data-bs-target="'#' + uuid"></i>
                    </div>
                </div>
            </div>
            <div :style="cardImg">
                <span class="card-quantity">{{ quantity }}</span>
            </div>
        </div>
        <!-- Edit Ship Modal -->
        <EditShip :id="id" :uuid="uuid" :name="name" :quantity="quantity" :image="image" />
    </div>
</template>

<style lang="scss">
.card-quantity {
    color: #e4e7ea;
    font-size: 3rem;
    position: absolute;
    bottom: 0;
    right: .6rem;
    text-shadow: 0 0 4px #1e1e1e;
}
</style>

<script>
import EditShip from './Modals/EditShip.vue';

export default {
    components: {
        EditShip
    },
    props: {
        id: String,
        uuid: String,
        name: String,
        quantity: Number,
        image: String
    },
    computed: {
        cardImg() {
            return {
                "background-image": "url('" + this.image + "')",
                "height": "200px",
                "background-size": "cover",
                "background-position": "50%"
            }
        }
    }
}
</script>