<template>
  <div>
    <repo v-for="repo in repos" :name="repo.name" :owner="repo.owner" :description="repo.description"></repo>
  </div>
</template>

<script>
  var repo = require('../app/repo.vue');

  module.exports = {
    components: {repo},
    data: function() {
      return {};
    }
  };
</script>
