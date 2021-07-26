<template>
    <div>
        <div class="container">

            <div class="card mt-5">
                <div class="card-header">
                    <div class="row">
                        <div class="col-12 col-md-8">
                            <h4>My fleet</h4>
                        </div>
                        <div class="col-12 col-md-4 d-flex justify-content-end">
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addShipModal"><i class="fas fa-plus"></i> Add ship</button>&nbsp;
                            <button @click="getIds" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteShipModal"><i class="fas fa-trash"></i> Clear my fleet</button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <form>
                        <div class="input-group mb-4 w-50">
                            <span class="input-group-text"><i class="fas fa-search"></i></span>
                            <input type="text" class="form-control" v-model="searchBar" placeholder="Search ship">
                        </div>
                    </form>
                    <div class="row">
                        <div v-for="ship in filteredList" :key="ship.id" class="col-12 col-md-6 col-xl-4">
                            <ShipCard :id="ship._id" :uuid="ship._uuid" :name="ship.name" :quantity="ship.quantity" :image="ship.image" />
                        </div>
                    </div>
                </div>
            </div>

            <AddShip />
            <ClearFleet :ids="ships_ids" />

        </div>
    </div>
</template>

<script>
import ShipCard from '../components/MyFleet/ShipCard.vue';
import AddShip from '../components/MyFleet/Modals/AddShip.vue';
import ClearFleet from '../components/MyFleet/Modals/ClearFleet.vue';

export default {
    components: {
        ShipCard,
        AddShip,
        ClearFleet
    },
    data() {
        return {
            ships: [],
            ships_ids: [],
            searchBar: ''
        }
    },
    computed: {
        filteredList() {
            return Object.values(this.ships).filter(ship => {
                return ship.name.toLowerCase().includes(this.searchBar.toLowerCase());
            });
        }
    },
    mounted() {
        this.getData();
    },
    created() {
        this.$root.$refs.MyFleet = this;
    },
    methods: {
        getData() {
            this.ships = [];
            api.get('ships').then(response => {
                response.data.forEach(element => {
                    this.ships.push(element);
                });
            });
        },
        getIds() {
            this.ships.forEach(ship => this.ships_ids.push(ship._id));
        }
    }
}
</script>