<template>
  <div class="panel" v-responsive="breakpoints">
    <div class="panel__container">
      <div class="panel__body">
        <h2>Large</h2>
        <h3>Medium</h3>
        <h4>Small</h4>
        <h1>Panel: Testing</h1>
        <p>This is a test panel. These are some details.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      breakpoints: {
        0: 'small',
        300: 'medium',
        500: 'large',
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .panel {
    max-width: 500px;

    h2, h3, h4 {
      display: none;
    }

    &[data-responsive='small'] h4 {
      display: initial;
    }

    &[data-responsive='medium'] h3 {
      display: initial;
    }

    &[data-responsive='large'] h2 {
      display: initial;
    }

    &__container {
      border-radius: 1px;
      border: 1px solid rgba(0,0,0,0.2);
      box-shadow: 0 1px 5px 0 rgba(0,0,0,0.2), 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12);
    }

    &__body {
      padding: 20px;

      h1 {
        font-size: 18px;
      }
    }
  }
</style>
