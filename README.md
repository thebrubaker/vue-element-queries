This package is only a prototype for now. Let me know if you find this useful and I will continue to work on it.

Have you ever wanted to build a vue component that was responsive to the containing element, rather than the window size? Now you can :)

I built this directive from looking at the amazing package [css-element-queries](https://github.com/marcj/css-element-queries). I ran into some performance issues using css-element-queries with dynamic elements coming in and out of vue, so I rewrote some of the core implementation with Vue in mind.

I plan to replace ResizeSensor at some point, and there may be many, many bugs as it's not nearly as flexible as css-media-queries. Send me feedback please!

*How To Use VueElementQuery*

Install the plugin as you normally would with Vue.use(VueElementQuery)

This makes the directive `v-query` available to you. Add this directive to the containing element you want your components to respond to.

Note: stylesheets must be scoped for the current implementation of vue-element-queries.

This will watch the container and apply tags to the element for min-width and max-width. You can then target these tags in your css to make your components responsive.

I provided an example in the `example` directory.