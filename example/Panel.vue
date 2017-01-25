<template>
  <div class="panel">
    <div class="panel__container">
      <div class="panel__body">
        <h1>Panel: Testing</h1>
        <p>This is a test panel. These are some details.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .panel {
    max-width: 500px;

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
