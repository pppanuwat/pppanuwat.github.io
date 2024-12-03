export default defineNuxtRouteMiddleware((to, from) => {
    const isUnlocked = useState("isUnlocked").value;
    if (!isUnlocked) {
      return navigateTo("/checkBrain"); // ส่งกลับไปหน้าล็อค
    }
  });
  


//  import { verify } from '../composables/useAuth'
// import { useIndexStore } from '~/store/main'

// export default defineNuxtRouteMiddleware(async (to, from) => {
//   const store = useIndexStore()

//   const refToken = useStatefulCookie('token')
//   if (!refToken.value) {
//     return navigateTo('/login')
//   }

// })
