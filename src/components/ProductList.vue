<script setup>
import { defineProps } from 'vue'
defineProps(['product'])
const emit = defineEmits(['order-products'])
</script>

<template>
  <a
    href="#"
    class="list-group-item list-group-item-action"
    @click.prevent="emit('order-products', product)"
  >
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">{{ product.name }}</h5>
      <small>${{ product.price }}</small>
    </div>
    <p class="mb-1">{{ product.description }}</p>
  </a>
</template>
