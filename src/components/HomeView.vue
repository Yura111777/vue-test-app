<template>
  <HeaderView />
  <div class="flex container">
    <ul v-if="list.length">
      <li>
        <input
          type="text"
          v-model="search"
          @input="listShow"
          placeholder="Search on title"
        />
      </li>
      <li
        v-for="item in collections"
        :key="item.id"
        @click="loadChart(item.quantity)"
      >
        <h2 class="title">{{ item.title }}</h2>
        <p class="text">
          {{ item.body }}
        </p>
        <span class="comments">Comments: {{ item.quantity.length }}</span>
      </li>
      <li v-if="!search.length">
        <button
          :class="[i === 0 ? 'act btn' : 'btn']"
          :key="i"
          v-for="(p, i) in listPagination.pages"
          @click="setPage(p, $event)"
        >
          {{ p }}
        </button>
      </li>
    </ul>
    <div style="height: 500px">
      <h2 class="chart-title">
        Please click on list item to change chart data
      </h2>
      <Pie :data="chartData" :options="options" />
    </div>
  </div>
</template>

<script>
import HeaderView from "@/components/HeaderView";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);
import _ from "lodash";
import axios from "axios";
export default {
  name: "HomeView",
  components: {
    HeaderView,
    Pie,
  },
  data() {
    return {
      list: [],
      listPagination: {},
      perPage: 10,
      collections: [],
      search: "",
      comments: "",
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
      data: {
        labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
        datasets: [
          {
            backgroundColor: [
              "#41B883",
              "#E46651",
              "#00D8FF",
              "#DD1B16",
              "#f6f6f6",
            ],
            data: [40, 20, 80, 10],
          },
        ],
      },
    };
  },
  computed: {
    chartData: function () {
      return this.data;
    },
  },
  methods: {
    loadChart(chart) {
      this.data = {
        labels: [],
        datasets: [
          {
            backgroundColor: [
              "#41B883",
              "#E46651",
              "#00D8FF",
              "#DD1B16",
              "#9c27b0",
            ],
            data: [],
          },
        ],
      };

      chart.forEach((el) => {
        this.data.labels.push(el.name);
        this.data.datasets[0].data.push(el.body.length);
      });

      this.$forceUpdate();
    },
    listShow() {
      if (this.search) {
        this.collections = this.list.filter((el) =>
          el.title.includes(this.search.toLowerCase())
        );
      } else {
        this.collections = this.paginate(this.list);
      }
    },
    async getData() {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      return await res.data;
    },

    // Can`t do simple with one func and parameters
    // since axios throw strange an error about missing the protocol but even with this error all works fine,
    // but don`t want to have a mess in web browser console
    async getDataComments() {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/comments",
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      return await res.data;
    },
    setPage(p, e) {
      if (e) {
        document.querySelectorAll(".btn").forEach((el) => {
          el.classList.remove("act");
        });
        e.target.classList.add("act");
      }
      this.listPagination = this.paginator(this.list.length, p);
    },
    paginate(data) {
      return _.slice(
        data,
        this.listPagination.startIndex,
        this.listPagination.endIndex + 1
      );
    },
    paginator(totalItems, currentPage) {
      let startIndex = (currentPage - 1) * this.perPage,
        endIndex = Math.min(startIndex + this.perPage - 1, totalItems - 1);
      return {
        currentPage: currentPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: _.range(1, Math.ceil(totalItems / this.perPage) + 1),
      };
    },
  },
  async created() {
    this.list = await this.getData();
    this.comments = await this.getDataComments();
    this.list.forEach((el) => {
      let commentsQuantity = this.comments.filter(
        (com) => com.postId === el.id
      );
      el.quantity = commentsQuantity;
    });
    this.setPage(1);
  },

  watch: {
    listPagination() {
      this.collections = this.paginate(this.list);
    },
  },
  async mounted() {
    this.list = await this.getData();
  },
};
</script>

<style scoped lang="scss">
.chart-title {
  text-align: left;
  font-size: 16px;
  color: lightslategray;
}
.flex {
  display: flex;
}
.title {
  font-size: 18px;
  margin-bottom: 0;
  text-transform: capitalize;
}
.text {
  margin-top: 0;
  margin-bottom: 5px;
  font-size: 14px;
  text-transform: capitalize;
}
.comments {
  font-size: 16px;
  font-weight: bold;
  color: gray;
}
input {
  width: 100%;
  height: 46px;
  font-size: 18px;
  padding-left: 15px;
  border-radius: 4px;
  border: 1px solid lightblue;
  &::placeholder {
    color: lightblue;
  }
}
ul {
  list-style: none;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0;
  li {
    text-align: left;
    margin-bottom: 15px;
    max-width: 500px;
    cursor: pointer;
    transition: opacity 0.25s ease-in-out;
    &:hover {
      opacity: 0.5;
    }
  }
}
.btn {
  color: #fff;
  margin: 0 2px;
  border-radius: 2px;
  background: dodgerblue;
  padding: 4px 10px;
  border: 0;
  font-size: 16px;
  cursor: pointer;
  transition: background-color, color 0.25s ease-in-out;
  &.act {
    background-color: lightblue;
    color: #2c3e50;
  }
  &:hover {
    background-color: #2c3e50;
    color: #ffffff;
  }
}
</style>
