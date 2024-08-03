<script setup>
import { ref } from 'vue'

const dataArray = ref([
  {
    id: 1,
    name: '珍珠奶茶',
    description: '香濃奶茶搭配QQ珍珠',
    price: 50,
    stock: 20
  },
  {
    id: 2,
    name: '冬瓜檸檬',
    description: '清新冬瓜配上新鮮檸檬',
    price: 45,
    stock: 18
  },
  {
    id: 3,
    name: '翡翠檸檬茶',
    description: '綠茶與檸檬的完美結合',
    price: 55,
    stock: 34
  },
  {
    id: 4,
    name: '四季春茶',
    description: '香醇四季春茶，回甘無比',
    price: 45,
    stock: 10
  },
  {
    id: 5,
    name: '阿薩姆奶茶',
    description: '阿薩姆紅茶搭配香醇鮮奶',
    price: 50,
    stock: 25
  },
  {
    id: 6,
    name: '檸檬冰茶',
    description: '檸檬與冰茶的清新組合',
    price: 45,
    stock: 20
  },
  {
    id: 7,
    name: '芒果綠茶',
    description: '芒果與綠茶的獨特風味',
    price: 55,
    stock: 18
  },
  {
    id: 8,
    name: '抹茶拿鐵',
    description: '抹茶與鮮奶的絕配',
    price: 60,
    stock: 20
  }
])
const tempEdit = ref({})

// 增加產品庫存
const stockAdd = (product) => {
  const idx = dataArray.value.findIndex((item) => item.id === product.id)
  dataArray.value[idx].stock++
}
// 減少產品庫存
const stockMinus = (product) => {
  const idx = dataArray.value.findIndex((item) => item.id === product.id)
  dataArray.value[idx].stock--
}
// 取得目前編輯產品
const editProduct = (product) => {
  tempEdit.value = { ...product }
}
// 更換產品名稱
const changeName = () => {
  const idx = dataArray.value.findIndex((item) => item.id === tempEdit.value.id)
  dataArray.value[idx] = tempEdit.value
  tempEdit.value = {}
}
</script>
<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">品項</th>
        <th scope="col">描述</th>
        <th scope="col">價格</th>
        <th scope="col">庫存</th>
        <th scope="col">編輯</th>
      </tr>
    </thead>
    <tbody v-for="item in dataArray" :key="item.name">
      <tr>
        <td>{{ item.name }}</td>
        <td>
          <small>{{ item.description }}</small>
        </td>
        <td>{{ item.price }}</td>
        <td class="">
          <button class="btn btn-light" @click="stockMinus(item)" :disabled="item.stock <= 0">
            -</button
          >{{ item.stock }}<button class="btn btn-light" @click="stockAdd(item)">+</button>
        </td>
        <td class="">
          <button type="button" @click="editProduct(item)" class="d-inline-block btn btn-light">
            {{ tempEdit.id === item.id ? '取消' : '編輯' }}
          </button>
          <input
            type="text"
            name=""
            id=""
            v-model="tempEdit.name"
            :class="{ 'd-none': tempEdit.id !== item.id }"
          />
          <button
            type="button"
            @click="changeName()"
            class="btn btn-light"
            :class="{ 'd-none': tempEdit.id !== item.id }"
          >
            確定
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
