<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const apiPath = 'https://todolist-api.hexschool.io'

function getToken() {
  return document.cookie.replace(/(?:(?:^|.*;\s*)todoListToken\s*\=\s*([^;]*).*$)|^.*$/, '$1')
}

// 註冊資料
const signUpData = ref({
  email: '',
  password: '',
  nickname: ''
})

/**
 * 註冊
 */
const signUp = async () => {
  try {
    const response = await axios.post(`${apiPath}/users/sign_up`, {
      email: signUpData.value.email,
      password: signUpData.value.password,
      nickname: signUpData.value.nickname
    })
    signUpData.value = {
      email: '',
      password: '',
      nickname: ''
    }
    alert('已註冊成功')

    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

// 登入資料
const signInData = ref({
  email: '',
  password: ''
})

/**
 * 登入
 */
const signIn = async () => {
  try {
    const response = await axios.post(`${apiPath}/users/sign_in`, {
      email: signInData.value.email,
      password: signInData.value.password
    })
    const token = response.data.token

    document.cookie = `todoListToken=${token}; expires=${new Date(response.data.exp * 1000)}; path=/`
    console.log(response)
    signInData.value = {
      email: '',
      password: ''
    }
    checkout()
  } catch (error) {
    alert('登入失敗')
    console.log(error)
  }
}

// 驗證登入資料
const user = ref({
  nickname: '',
  uid: ''
})
/**
 * 驗證登入
 */
const checkout = async () => {
  try {
    const token = getToken()

    const response = await axios.get(`${apiPath}/users/checkout`, {
      headers: {
        Authorization: token
      }
    })
    console.log(response)
    user.value = response.data
  } catch (error) {
    console.log(error)
  }
}
/**
 * 登出
 */
const signOut = async () => {
  try {
    const token = getToken()
    const response = await axios.post(
      `${apiPath}/users/sign_out`,
      {},
      {
        headers: {
          Authorization: token
        }
      }
    )
    user.value = {
      nickname: '',
      uid: ''
    }
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

// 待辦資料
const toDoList = ref([])
/**
 * 取得待辦
 */
const getToDo = async () => {
  const token = getToken()
  try {
    const response = await axios.get(`${apiPath}/todos/`, {
      headers: {
        Authorization: token
      }
    })
    toDoList.value = response.data.data
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}
// 待辦資料 (暫時)
const tempToDo = ref({
  content: ''
})

/**
 *  新增待辦
 */
const addTodo = async () => {
  const token = getToken()
  try {
    const response = await axios.post(
      `${apiPath}/todos/`,
      {
        content: tempToDo.value.content
      },
      {
        headers: {
          Authorization: token
        }
      }
    )
    console.log(response)
    getToDo()
  } catch (error) {
    alert(error.response.data.message[0])
    console.log(error)
  }
}

/**
 *  編輯待辦
 */
const todoEdit = ref({
  status: false,
  content: ''
})
/**
 * 編輯待辦內容
 * @param id
 */
const updateTodo = async (id) => {
  const token = getToken()
  try {
    const response = await axios.put(
      `${apiPath}/todos/${id}`,
      {
        content: todoEdit.value.content
      },
      {
        headers: {
          Authorization: token
        }
      }
    )
    console.log(response)
    getToDo()
  } catch (error) {
    console.log(error)
  }
}
/**
 * 編輯待辦勾選狀態
 * @param id
 */
const updateTodoToggle = async (id) => {
  const token = getToken()
  try {
    const response = await axios.patch(
      `${apiPath}/todos/${id}/toggle`,
      {},
      {
        headers: {
          Authorization: token
        }
      }
    )
    console.log(response)
    getToDo()
  } catch (error) {
    console.log(error)
  }
}
const updateTodoEdit = async (event, id) => {
  todoEdit.value = toDoList.value.filter((item) => item.id === id)[0]
  todoEdit.value.content = event.target.value ? event.target.value : todoEdit.value.content
  event.target.value = ''
}
/**
 * 刪除待辦
 * @param id
 */
const deleteTodo = async (id) => {
  const token = getToken()
  try {
    const response = await axios.delete(`${apiPath}/todos/${id}`, {
      headers: {
        Authorization: token
      }
    })
    console.log(response)
    getToDo()
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  checkout()
  getToDo()
})
</script>

<template>
  <div class="container">
    <div class="row" v-if="!user.uid">
      <div class="col-12 col-md-10 col-lg-8 mx-auto">
        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              class="nav-link active"
              id="nav-home-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-home"
              type="button"
              role="tab"
              aria-controls="nav-home"
              aria-selected="true"
            >
              登入
            </button>
            <button
              class="nav-link"
              id="nav-profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-profile"
              type="button"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
            >
              註冊
            </button>
          </div>
        </nav>
        <div class="tab-content pt-4" id="nav-tabContent">
          <div
            class="tab-pane fade show active"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
            tabindex="0"
          >
            <form @submit.prevent>
              <div class="row mb-3">
                <label for="singInEmail" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                  <input
                    type="email"
                    class="form-control"
                    id="singInEmail"
                    v-model="signInData.email"
                  />
                </div>
              </div>
              <div class="row mb-3">
                <label for="singInPassword" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-10">
                  <input
                    type="password"
                    class="form-control"
                    id="singInPassword"
                    v-model="signInData.password"
                  />
                </div>
              </div>
              <button type="submit" class="btn btn-primary" @click="signIn(signInData)">
                Sign in
              </button>
            </form>
          </div>
          <div
            class="tab-pane fade pt-4"
            id="nav-profile"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
            tabindex="0"
          >
            <form @submit.prevent>
              <div class="row mb-3">
                <label for="singUpEmail" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                  <input
                    type="email"
                    class="form-control"
                    id="singUpEmail"
                    v-model="signUpData.email"
                  />
                </div>
              </div>
              <div class="row mb-3">
                <label for="singUptPassword" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-10">
                  <input
                    type="password"
                    class="form-control"
                    id="singUptPassword"
                    v-model="signUpData.password"
                  />
                </div>
              </div>
              <div class="row mb-3">
                <label for="singUptNickname" class="col-sm-2 col-form-label">Nickname</label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    class="form-control"
                    id="singUptNickname"
                    v-model="signUpData.nickname"
                  />
                </div>
              </div>
              <button type="submit" class="btn btn-primary" @click="signUp(signUpData)">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="card mb-2" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title">歡迎 {{ user.nickname }}</h5>
          <p class="card-text">已登入</p>
          <a href="#" class="btn btn-primary" @click.prevent="signOut">登出</a>
        </div>
      </div>
      <div>
        <h2 class="mb-2">Todo list</h2>
        <div class="d-flex align-items-center gap-2 mb-5">
          <label class="form-check-label" for="todoAddItem">待辦事項</label>
          <input
            type="text"
            class="form-control flex-none w-25"
            name="todoAddItem"
            id="todoAddItem"
            v-model="tempToDo.content"
          />
          <button class="btn btn-primary" type="button" @click="addTodo">新增待辦</button>
        </div>
        <form @submit.prevent>
          <div v-if="toDoList.length" class="row row-cols-1 gy-4">
            <div class="col" v-for="item in toDoList" :key="item.id">
              <div class="row g-2">
                <div class="col-2">
                  <div class="d-flex align-items-center gap-2">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :id="item.id"
                      :checked="item.status"
                      @change="updateTodoToggle(item.id)"
                    />
                    <label class="form-check-label" for="flexCheckChecked">{{
                      item.content
                    }}</label>
                  </div>
                </div>
                <div class="col-4">
                  <input
                    type="text"
                    name=""
                    id=""
                    class="w-100"
                    @change="updateTodoEdit($event, item.id)"
                  />
                </div>
                <div class="col-4">
                  <div class="d-flex align-items-center gap-2">
                    <button type="button" class="btn btn-primary" @click="updateTodo(item.id)">
                      編輯
                    </button>
                    <button type="button" class="btn btn-danger" @click="deleteTodo(item.id)">
                      刪除
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>目前未有待辦事項</div>
        </form>
      </div>
    </div>
  </div>
</template>
