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
                            <button class="btn btn-primary"><i class="fas fa-plus"></i> Add ship</button>&nbsp;
                            <button class="btn btn-danger"><i class="fas fa-trash"></i> Clear my fleet</button>
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
                        <div v-for="ship in filteredList" :key="ship.id" class="col-12 col-md-6 col-lg-3">
                            <ShipCard :id="ship._id" :uuid="ship._uuid" :name="ship.name" :quantity="ship.quantity" :image="ship.image" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import ShipCard from '../components/ShipCard.vue';

export default {
    components: {
        ShipCard
    },
    data() {
        return {
            ships: [],
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
        api.get('ships').then(response => {
            response.data.forEach(element => {
                this.ships.push(element);
            });
        });
    }
}
</script>