export default defineNuxtRouteMiddleware((to, from) => {
    const isUnlocked = useState("isUnlocked").value;
    if (!isUnlocked) {
      return navigateTo("/checkBrain"); // ส่งกลับไปหน้าล็อค
    }
  });
  