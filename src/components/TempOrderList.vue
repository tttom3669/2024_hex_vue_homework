<script setup>
import { defineProps, defineEmits } from 'vue'
defineProps(['product'])
const emit = defineEmits(['count-total', 'delete-product', 'change-item-num'])
</script>
<template>
  <td>
    <button type="button" class="btn btn-sm" @click="emit('delete-product', product)">x</button>
  </td>
  <td>{{ product?.name }}</td>
  <td>
    <small>{{ product?.description }}</small>
  </td>
  <td>
    <select
      class="form-select"
      @change="emit('count-total'), emit('change-item-num', $event, product)"
    >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
    </select>
  </td>
  <td>{{ product.price }}</td>
  <td>{{ product.price * product.num }}</td>
</template>
