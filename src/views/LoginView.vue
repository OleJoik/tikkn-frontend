<template>
  <div class="fullscreen fixed-top d-flex align-items-center">
    <div class="
    container
    border border-primary
    bg-light 
    p-4 mb-5
    " 
    style="text-align: center">
      <h1 v-if="changingPassword">Bytt passord</h1>
      <h1 v-else>Logg inn</h1>
      <form @submit.prevent="submit">
        <label 
          for="inputEmail" 
          class="mt-3"
        >
          Din e-post
        </label>
        <input 
          style="text-align: center"
          placeholder="Din@epost.no"
          v-model="email"
          type="email" 
          id="inputEmail"
          class="form-control"
        >
        
        <label 
          for="inputPassword" 
          class="mt-3"
        >
          Ditt passord
        </label>
        <input 
          style="text-align: center"
          placeholder="Passord"
          v-model="password"
          id="inputPassword"
          class="form-control"
          type="password"
          aria-describedby="passwordHelpBlock"
          :disabled="changingPassword"
        >

        <small 
          v-if="message"
          id="passwordHelpBlock" 
          class="form-text text-muted"
        >
          {{ message }}
        </small>

        <br>
        <button 
          type="button" 
          class="btn btn-link"
          @click="_toggleResetPassword"
        >
          Gjenopprett passord
        </button>
        

        <div 
          class="row"
          v-if="!changingPassword"
        >
          <div class="col-sm-6">
            <button 
              style="width: 100%"
              class="btn btn-primary btn-block mt-3"
              type="submit"
            >
              Logg inn
            </button>
          </div>
          <div class="col-sm-6">
            <button
              style="width: 100%"
              type="button"
              class="btn btn-secondary btn-block mt-3"
              @click="newUser"
              :disabled="changingPassword"
            >
              Ny bruker
            </button>
          </div>
        </div>

        <div 
          v-else
          class="row"
        >
          <div class="col-sm-3"></div>
          <div class="col-sm-6">
            <button 
              style="width: 100%"
              class="btn btn-primary btn-block mt-3"
              type="button"
              @click="_resetPassword"
            >
              Bytt passord
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { loginUser, resetPassword } from '../utilities/Auth'

const email = ref<string|null>(null);
const password = ref<string|null>(null);
const changingPassword = ref(false);
const message = ref<string|null>(null);

const route = useRoute()
const router = useRouter()

const submit = async () => {
  if(!email.value){
    message.value = "Du må skrive inn en epostadresse."
    return;
  }

  if(!password.value){
    message.value = "Du må skrive inn et passord."
    return;
  }

  const response = await loginUser(email.value, password.value);

  if(response === 'auth/missing-email'){
    message.value = "Du må skrive inn en epostadresse."
    return;
  }
  else if(response === 'auth/internal-error'){
    message.value = "Det skjedde en feil. Prøv igjen."
    return;
  }
  else if(response === "auth/wrong-password"){
    message.value = "Feil passord. Prøv igjen, eller gjenopprett passord."
    return;
  }

  console.log(response.uid, route.query.next)
  if(response.uid){
    router.push({path: route.query.next as any})
  }
}

const newUser = () => {
  router.push("/ny-bruker")
}

const _toggleResetPassword = async () => {
  changingPassword.value = !changingPassword.value;
  if(changingPassword.value){
    message.value = "Skriv inn en epostadresse for å bytte passord"
    email.value = null;
    password.value = null;
  }
  else
  {
    message.value = null;
  }
}

const _resetPassword = async () => {
  if(!email.value){
    message.value = "Du må skrive inn en epostadresse."
    return;
  }

  const response = await resetPassword(email.value);
  if(response === "auth/missing-email"){
    message.value = "Skriv inn en epostadresse for å bytte passord"
    changingPassword.value = true;
    return;
  }

  message.value = null;
}
</script>
