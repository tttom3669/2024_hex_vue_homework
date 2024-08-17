<script setup>
import { ref } from 'vue'
import ProductList from '@/components/ProductList.vue'
import TempOrderList from '@/components/TempOrderList.vue'
import OrderCard from '@/components/OrderCard.vue'

const data = ref([
  {
    id: 1,
    name: '珍珠奶茶',
    description: '香濃奶茶搭配QQ珍珠',
    price: 50
  },
  {
    id: 2,
    name: '冬瓜檸檬',
    description: '清新冬瓜配上新鮮檸檬',
    price: 45
  },
  {
    id: 3,
    name: '翡翠檸檬',
    description: '綠茶與檸檬的完美結合',
    price: 55
  },
  {
    id: 4,
    name: '四季春茶',
    description: '香醇四季春茶，回甘無比',
    price: 45
  },
  {
    id: 5,
    name: '阿薩姆奶茶',
    description: '阿薩姆紅茶搭配香醇鮮奶',
    price: 50
  },
  {
    id: 6,
    name: '檸檬冰茶',
    description: '檸檬與冰茶的清新組合',
    price: 45
  },
  {
    id: 7,
    name: '芒果綠茶',
    description: '芒果與綠茶的獨特風味',
    price: 55
  },
  {
    id: 8,
    name: '抹茶拿鐵',
    description: '抹茶與鮮奶的絕配',
    price: 60
  }
])

// 訂單資料
const orderData = ref([])
// 訂單總計
const orderTotal = ref(0)
const orderNote = ref('')
// 送出訂單資料
const outputOrder = ref({})

/**
 * 點餐
 * @param product
 */
const orderProducts = (product) => {
  if (orderData.value.filter((item) => item.id === product.id).length > 0) return
  orderData.value.push(product)
  product.num = 1
  countTotal()
}
/**
 * 更改項目數量
 */
function changeItemNum($event, product) {
  const idx = orderData.value.findIndex((item) => item.id === product.id)
  orderData.value[idx].num = $event.target.value
  countTotal()
}

/**
 * 計算總計
 */
function countTotal() {
  orderTotal.value = orderData.value.reduce((sum, product) => sum + product.price * product.num, 0)
}
/**
 * 刪除產品
 * @param product
 */
const deleteProduct = (product) => {
  const idx = orderData.value.findIndex((item) => item.id === product.id)
  orderData.value.splice(idx, 1)
  countTotal()
}
/**
 * 送出訂單
 */
const orderSubmit = () => {
  outputOrder.value.order = [...orderData.value]
  outputOrder.value.orderTotal = orderTotal.value
  outputOrder.value.note = orderNote.value

  orderData.value = []
  orderTotal.value = 0
  orderNote.value = ''
}
</script>

<template>
  <div id="root">
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-4">
          <div class="list-group" v-for="item in data" :key="item.id">
            <ProductList :product="item" @orderProducts="orderProducts"></ProductList>
          </div>
        </div>
        <div class="col-md-8">
          <table class="table">
            <thead>
              <tr>
                <th scope="col" width="50">操作</th>
                <th scope="col">品項</th>
                <th scope="col">描述</th>
                <th scope="col" width="90">數量</th>
                <th scope="col">單價</th>
                <th scope="col">小計</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="orderData.length">
                <!--這邊應改-->
                <tr v-for="item in orderData" :key="item.id">
                  <TempOrderList
                    :product="item"
                    @changeItemNum="changeItemNum"
                    @deleteProduct="deleteProduct"
                    @countTotal="countTotal"
                  ></TempOrderList>
                </tr>
              </template>
            </tbody>
          </table>
          <template v-if="!orderData.length">
            <div class="alert alert-primary text-center" role="alert">請選擇商品</div>
          </template>
          <div class="text-end mb-3">
            <h5>
              總計: <span>${{ orderTotal }}</span>
            </h5>
          </div>
          <textarea
            class="form-control mb-3"
            rows="3"
            placeholder="備註"
            v-model="orderNote"
          ></textarea>
          <div class="text-end">
            <button class="btn btn-primary" @click="orderSubmit()">送出</button>
          </div>
        </div>
      </div>
      <hr />
      <div class="row justify-content-center" v-if="outputOrder?.order?.length">
        <div class="col-8">
          <OrderCard :outputOrder="outputOrder"></OrderCard>
        </div>
      </div>
    </div>
  </div>
</template>
