<template id="repo-template">
  <div>
    <div>
      <label>{{ name }}</label>
      <label>{{ owner }}</label>
      <label>{{ description }}</label>
    </div>
  </div>
</template>

<script>
  module.exports = {
    template: '#repo-template',
    props: ['name', 'owner', 'description']
  }
</script>
