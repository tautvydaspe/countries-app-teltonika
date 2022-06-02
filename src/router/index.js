import Vue from 'vue'
import Router from 'vue-router'
import Countries from '../views/Countries'
import Cities from '../views/Cities'
import CitiesNormal from '../views/CitiesNormal'
import NotFound from '../views/404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Countries',
      component: Countries
    },
    {
      path: '/cities',
      name: 'Cities',
      component: Cities
    },
    {
      path: '/:id',
      name: 'CitiesNormal',
      component: CitiesNormal
    },
    {
        path: '/*',
        name: '404',
        component: NotFound

    }
  ]
})