<template>
  <div>
    <h1>Example Vue Element Query</h1>
    <label>Adjust the container width</label>
    <input type="number" name="width" v-model="adjustWidth" step="10">
    <div class="content">
<!--       <div v-query class="grid" :style="style">
        <div class="row">
          <panel class="item"></panel>
          <panel class="item"></panel>
          <panel class="item"></panel>
          <panel class="item"></panel>
          <panel class="item"></panel>
        </div>
      </div> -->
      <grid :style="style">
        <div class="row">
          <responsive-panel class="item"></responsive-panel>
          <responsive-panel class="item"></responsive-panel>
          <responsive-panel class="item"></responsive-panel>
          <responsive-panel class="item"></responsive-panel>
          <responsive-panel class="item"></responsive-panel>
        </div>
      </grid>
    </div>
  </div>
</template>

<script>
  import Panel from './Panel'
  import ResponsivePanel from './ResponsivePanel'
  import Grid from './Grid'

  export default {
    name: 'VueElementQuery',
    components: {
      Grid,
      Panel,
      ResponsivePanel
    },
    data () {
      return {
        adjustWidth: 1000
      }
    },
    computed: {
      style () {
        return {
          border: '1px solid rgba(0,0,0,0.2)',
          padding: '20px',
          width: this.adjustWidth + 'px'
        }
      }
    }
  }
</script>

<style lang="scss">
  @import './sass/grid';

  * {
    box-sizing: border-box;
  }

  .content {
    font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    margin: 40px;
  }

  .title {
    text-decoration: none;
    font-size: 35px;
    text-align: center;
    margin-bottom: 25px;
    font-weight: 300;
    margin-top: 10%;
    color: #444;
  }
</style>

<style lang="scss" scoped> // scoped is required
  @import './sass/mixins';

  .item {
    @include span(12)
  }

  .grid {
    margin-bottom: 20px;
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
