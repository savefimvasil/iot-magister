import Vue from 'vue'

// Or as a directive
import VueMask, { VueMaskDirective } from 'v-mask'

// Or only as a filter
Vue.use(VueMask)
Vue.directive('mask', VueMaskDirective)
