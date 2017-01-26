*This package is only a prototype for now. Let me know if you find this useful and I will continue to work on it.*

Have you ever wanted to build a vue component that was responsive to the containing element, rather than the window size? Now you can :)

I built this directive from looking at the amazing package [css-element-queries](https://github.com/marcj/css-element-queries). I ran into some performance issues using css-element-queries with dynamic elements coming in and out of vue, so I rewrote some of the core implementation with Vue in mind.

I plan to replace ResizeSensor at some point, and there may be many, many bugs as it's not nearly as flexible as css-media-queries. Send me feedback please!

**How To Use VueElementQuery**

Take the package for a spin using `vue build example`

Install the plugin as you normally would with `Vue.use(VueElementQuery)`

```
import VueElementQuery from 'vue-element-queries'

Vue.use(VueElementQuery)
```

This makes the directive `v-query` available to you. Add this directive to the containing element you want your components to respond to.

```
<div v-query class="grid">
  <div class="row">
    <panel class="item"></panel>
    <panel class="item"></panel>
    <panel class="item"></panel>
    <panel class="item"></panel>
    <panel class="item"></panel>
  </div>
</div>
```

This will watch the container and apply tags to the element for `min-width` and `max-width`. You can then target these tags in your css to make your components responsive.

```
<style scoped> // scoped is required

  .grid[min-width="500px"] .item {
    flex-basis: 50%;
  }

</style>
```

*Note: stylesheets must be scoped for the current implementation of vue-element-queries.*

Take a look at `Example.vue` in the example directory. You can use the sass mixins provided to clean up your css quite a bit.

```
<style lang="scss" scoped>
  @import './sass/grid';
  @import './sass/mixins';

  .grid {
    @include query(500) {
      .item {
        @include span(6)
      }
    }
    @include query(800) {
      .item {
        @include span(4)
      }
    }
  }
  </style>
```