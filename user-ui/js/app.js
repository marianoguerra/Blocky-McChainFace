//@format
/*globals Vue*/
import {getServiceProviders, getCertifierProviders, transact} from './api.js';
import {notify} from './notify.js';

const USERS = {
  michael: {}
};

function sortItems(items) {
  const result = [];
  for (let key in items) {
    const v = items[key];
    v.id = key;
    result.push(v);
  }

  return result;
}

function main() {
  new Vue({
    el: '#app',
    methods: {
      login: function() {
        const userInfo = USERS[this.ui.login.username];

        if (userInfo) {
          this.session.username = this.ui.login.username;
          this.session.id = this.ui.login.username;
          this.ui.login.password = '';
        } else {
          this.ui.login.error = 'Authentication Error';
        }
      },
      logout: function() {
        this.session.username = null;
      },
      goToLanding: function() {
        this.setView('landing');
        this.ui.viewInfo.info = null;
      },
      goToServiceList: function() {
        this.setView('service-list');
        this.loadServiceList();
      },
      goToCertifierList: function() {
        this.setView('certifier-list');
        this.loadCertifierList();
      },
      goToBuyNewCar: function() {
        this.setView('buy-new-car');
      },
      goToBuyUsedCar: function() {
        this.setView('buy-used-car');
      },
      setView: function(viewName) {
        this.ui.view = viewName;
      },
      loadServiceList: function() {
        this.services.loading = true;
        getServiceProviders()
          .then(res => res.json())
          .then(data => {
            this.services.loading = false;
            this.services.items = sortItems(data.data);
          });
      },
      loadCertifierList: function() {
        this.services.loading = true;
        getCertifierProviders()
          .then(res => res.json())
          .then(data => {
            this.certifiers.loading = false;
            this.certifiers.items = sortItems(data.data);
          });
      },
      goToService: function(info) {
        this.ui.view = 'service';
        this.ui.viewInfo.info = info;
      },
      goToCertifier: function(info) {
        this.ui.view = 'certifier';
        this.ui.viewInfo.info = info;
      },
      serviceCommit: function() {
        const info = this.ui.viewInfo.info;

        info.date = this.ui.viewInfo.date;
        this.goToLanding();
        transact(info.id, 'sheduleService', info).then(_res =>
          notify('Service Scheduled')
        );
      },
      certifierCommit: function() {
        const info = this.ui.viewInfo.info;

        info.date = this.ui.viewInfo.date;
        this.goToLanding();
        transact(info.id, 'sheduleCertifier', info).then(_res =>
          notify('Certifier Scheduled')
        );
      }
    },
    computed: {
      isLoggedIn: function() {
        return this.session.username !== null;
      },
      isLanding: function() {
        return this.ui.view === 'landing';
      },
      isServiceList: function() {
        return this.ui.view === 'service-list';
      },
      isCertifierList: function() {
        return this.ui.view === 'certifier-list';
      },
      isBuyNewCar: function() {
        return this.ui.view === 'buy-new-car';
      },
      isBuyUsedCar: function() {
        return this.ui.view === 'buy-used-car';
      },
      isServiceView: function() {
        return this.ui.view === 'service';
      },
      isCertifierView: function() {
        return this.ui.view === 'certifier';
      },
      setCurrentCar: function(id) {
        this.myCars.current = id;
      }
    },
    data: {
      session: {
        id: null,
        username: null
      },
      myCars: {
        loading: false,
        current: 'car1',
        items: [
          {
            id: 'car1',
            name: 'Mercedes Class S',
            code: 'mb-class-s'
          }
        ]
      },
      services: {
        loading: true,
        items: []
      },
      certifiers: {
        loading: true,
        items: []
      },
      usedCars: {
        loading: true,
        items: []
      },
      newCars: {
        loading: true,
        items: []
      },
      ui: {
        view: 'landing',
        viewInfo: {
          info: null,
          date: new Date()
            .toISOString()
            .split('.')[0]
            .slice(0, -3)
        },
        login: {
          username: '',
          password: '',
          error: ''
        }
      }
    }
  });
}

window.addEventListener('load', main);
