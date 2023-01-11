<template>
  <HeaderView />
  <div class="container map">
    <l-map
      ref="map"
      v-model:zoom="zoom"
      :center="[48.3794, 31.1656]"
      @click="createMarker"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>

      <l-marker
        v-for="(item, i) in coordinates"
        :key="i"
        :lat-lng="[item.lat, item.lng]"
      >
        <l-tooltip> {{ item.name }} </l-tooltip>
      </l-marker>
    </l-map>
  </div>
  <div class="modal" v-if="modal">
    <div class="modal-body">
      <span class="close-button" @click="closeModal">x</span>
      <label>
        <span>Lat:</span>
        <input type="text" v-model="lat" />
      </label>
      <label>
        <span>Lng:</span>
        <input type="text" v-model="lng" />
      </label>
      <label>
        <span>Name:</span>
        <input type="text" v-model="name" />
      </label>
      <button type="submit" class="submit" @click="submitModal">
        Add marker
      </button>
    </div>
  </div>
</template>

<script>
import HeaderView from "./HeaderView";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LTooltip } from "@vue-leaflet/vue-leaflet";

export default {
  name: "MapView",
  components: {
    HeaderView,
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
  },
  data() {
    return {
      zoom: 6,
      coordinates: [],
      lat: "",
      lng: "",
      name: "Change my name",
      modal: false,
    };
  },
  mounted() {
    const mapData = JSON.parse(localStorage.getItem("map-info"));
    if (mapData) {
      this.coordinates = mapData;
    }
  },
  methods: {
    createMarker(e) {
      if (e.latlng) {
        console.log(e.latlng);
        this.modal = true;
        this.lat = e.latlng.lat;
        this.lng = e.latlng.lng;
      }
    },
    closeModal() {
      this.modal = false;
    },
    submitModal() {
      this.coordinates.push({
        lat: this.lat,
        lng: this.lng,
        name: this.name,
      });
      localStorage.setItem("map-info", JSON.stringify(this.coordinates));
      this.modal = false;
    },
  },
};
</script>

<style scoped lang="scss">
.map {
  height: 600px;
}

.modal {
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  .modal-body {
    background: #fff;
    border-radius: 4px;
    padding: 30px 20px;
    position: relative;
    .close-button {
      cursor: pointer;
      right: 5px;
      top: 5px;
      position: absolute;
      padding: 5px;
      &:hover {
        opacity: 0.5;
      }
    }
    .submit {
      width: 100%;
      height: 46px;
      border-radius: 4px;
      border: 0;
      color: #fff;
      background: #2c3e50;
      cursor: pointer;
      &:hover {
        background: dodgerblue;
      }
    }
    label {
      span {
        display: block;
        margin-bottom: 5px;
        text-align: left;
        font-weight: bold;
      }
    }
    input {
      width: 100%;
      height: 46px;
      padding-left: 15px;
      margin-bottom: 15px;
      display: block;
      font-size: 18px;
      border: 1px solid lightgray;
      border-radius: 4px;
      box-sizing: border-box;
      &::placeholder {
        color: dodgerblue;
      }
    }
  }
}
</style>
