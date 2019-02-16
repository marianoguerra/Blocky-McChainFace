//@format
/*globals Vue*/
import {getOpenOrders, transact} from './api.js';
import {notify} from './notify.js';

const COMPANY_FOR_USERNAME = {
  atu: {
    name: 'ATU',
    type: 'service'
  },
  tuv: {
    name: 'TÜV Süd (TÜV Rheinland)',
    type: 'certifier'
  }
};

function main() {
  new Vue({
    el: '#app',
    methods: {
      login: function() {
        const companyInfo = COMPANY_FOR_USERNAME[this.ui.login.username];

        if (companyInfo) {
          this.session.username = this.ui.login.username;
          this.session.id = this.ui.login.username;
          this.ui.login.password = '';
          this.loadOrders();

          document.title = companyInfo.name;
          for (let key in companyInfo) {
            this.company[key] = companyInfo[key];
          }
        } else {
          this.ui.login.error = 'Authentication Error';
        }
      },
      logout: function() {
        this.session.username = null;
      },
      loadOrders: function() {
        getOpenOrders(this.session.id)
          .then(resp => resp.json())
          .then(data => {
            const orderList = [];
            for (let id in data) {
              const v = data[id];
              v.id = id;
              orderList.push(v);
            }

            orderList.sort((a, b) => a.car.name.localeCompare(b.car.name));

            this.orders.loading = false;
            this.orders.data = orderList;
          });
      },
      viewOrderDetails: function(order) {
        this.ui.currentOrder.info = order;
      },
      closeOrderDetails: function() {
        this.ui.currentOrder.info = null;
      },
      completeOrderStart: function() {
        this.ui.currentOrder.completeForm = {
          type: '',
          summary: ''
        };
      },
      completeOrderCommit: function() {
        const order = this.ui.currentOrder.completeForm;

        transact(this.session.id, 'completeOrder', order).then(_resp =>
          notify('Order Completed')
        );

        this.ui.currentOrder.info = null;
        this.ui.currentOrder.completeForm = null;
      }
    },
    computed: {
      isLoggedIn: function() {
        return this.session.username !== null;
      }
    },
    data: {
      session: {
        id: null,
        username: null
      },
      orders: {
        loading: true,
        data: []
      },
      company: {
        name: '',
        type: ''
      },
      ui: {
        login: {
          username: '',
          password: '',
          error: ''
        },
        currentOrder: {
          info: null,
          completeForm: null
        }
      }
    }
  });
}

window.addEventListener('load', main);
