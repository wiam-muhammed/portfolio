<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="page-title" data-aos="fade">
    <div class="heading">
      <div class="container">
        <div class="row d-flex justify-content-center text-center">
          <div class="col-lg-8">
            <h1>{{ title }}</h1>

            <!-- default slot = description text -->
            <p v-if="$slots.default" class="mb-0">
              <slot />
            </p>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
