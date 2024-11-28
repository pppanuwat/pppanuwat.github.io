<template>
  <div
    class="flex items-center justify-center min-h-screen bg-pink-200 text-gray-800"
  >
    <!-- Container -->
    <div
      v-if="!isUnlocked"
      class="p-8 bg-white rounded-xl shadow-lg w-full max-w-md text-center space-y-6 border-4 border-dashed border-purple-500"
    >
      <!-- คำถาม -->
      <h2 class="text-2xl font-bold text-purple-700 mb-4">
        ⚠️ คำถามทดสอบ IQ 🌟
      </h2>
      <p class="text-lg font-bold">
        "เมื่อวานคือวันอังคาร แล้ววันนี้วันอะไร? 🤔"
      </p>

      <!-- กล่องกรอกคำตอบ -->
      <input
        v-model="userAnswer"
        type="text"
        placeholder="ทายมาเลยจ้า"
        class="w-full px-4 py-2 rounded-lg border-2 border-dashed border-pink-400 text-gray-900 text-center focus:ring focus:ring-pink-500"
      />

      <!-- ปุ่มยืนยัน -->
      <button
        @click="confirmAnswer"
        class="w-full bg-gradient-to-r from-yellow-400 to-red-500 text-white font-bold px-4 py-2 rounded-lg shadow-md hover:scale-105 transition-transform"
      >
        ✅ ส่งคำตอบ!
      </button>

      <!-- แสดง GIF ตลกเมื่อคำตอบผิด -->
      <div v-if="errorMessage" class="mt-4 space-y-2">
        <p class="text-red-500 font-bold text-xl animate-bounce">
          ❌ {{ errorMessage }}
        </p>
        <img
          :src="randomGif"
          alt="ผิดแล้วนะ"
          class="rounded-lg mx-auto shadow-md"
        />
      </div>
    </div>

    <!-- เมื่อคำตอบถูกต้อง -->
    <div
      v-else
      class="p-8 bg-gradient-to-tr from-green-400 to-blue-500 rounded-xl shadow-lg w-full max-w-md text-center space-y-6 flex flex-col items-center border-4 border-yellow-500"
    >
      <h1 class="text-3xl font-extrabold text-white">🥳 คุณคืออัจฉริยะ! 🎉</h1>
      <iframe
        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        width="100%"
        height="281"
        class="rounded-xl shadow-lg border-4 border-red-400"
        style="border: none; overflow: hidden"
        scrolling="no"
        frameborder="0"
        allowfullscreen
      ></iframe>
      <p class="text-lg font-medium text-yellow-100">
        "ยินดีด้วย! คุณผ่านด่านความยากนี้แล้ว 🤩"
      </p>
      <button
        @click="goToContent"
        class="w-full max-w-xs bg-white text-purple-800 font-bold px-5 py-3 rounded-lg shadow-lg hover:scale-110 transition-transform"
      >
        🔥 ลุยต่อเลย!
      </button>
    </div>

    <!-- Modal for confirmation -->
    <div
      v-if="showConfirmModal"
      class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    >
      <div
        class="bg-yellow-100 p-8 rounded-lg shadow-2xl w-96 space-y-6 border-4 border-dashed border-pink-500"
      >
        <h3 class="text-2xl font-extrabold text-gray-800">🤔 แน่ใจเหรอ?</h3>
        <p class="text-gray-700 text-center">
          "โยมจะตอบว่า
          <span class="font-semibold text-red-500">"{{ userAnswer }}"</span>
          จริงดิ?"
        </p>
        <div class="flex justify-between gap-4">
          <button
            @click="checkAnswer"
            class="bg-green-500 text-white px-5 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform w-full"
          >
            ✅ แน่สิ!
          </button>
          <button
            @click="cancelConfirmation"
            class="bg-red-500 text-white px-5 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform w-full"
          >
            ❌ ยกเลิก!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const userAnswer = ref(""); // เก็บคำตอบของผู้ใช้
const isUnlocked = ref(false); // เก็บสถานะว่าปลดล็อคหรือยัง
const errorMessage = ref(""); // เก็บข้อความแสดงข้อผิดพลาด
const showConfirmModal = ref(false); // ใช้แสดง/ซ่อน modal การยืนยันคำตอบ
const router = useRouter(); // ใช้เปลี่ยนหน้า
const randomGif = ref(""); // เก็บ URL ของ GIF ที่จะสุ่ม

// คำตอบที่ถูกต้อง
const correctAnswer = "พฤหัสบดี";

const errorMessages = [
  "😂 ผิดแล้วนะจ๊ะ!",
  "ยังไม่ใช่! ลองใหม่หน่อยเร็ว!",
  "โอ้โน้ว~ ไม่ถูกอีกแล้วว",
  "คำตอบนี้ดูแปลกไปหน่อยนะ~",
];

const gifs = [
  "https://media.giphy.com/media/3o7aD4smA5RdFdcTUg/giphy.gif",
  "https://media.giphy.com/media/L95W4wv8nnb9K/giphy.gif",
  "https://media.giphy.com/media/l4FGuhL4U2WyjdkaY/giphy.gif",
  "https://media.giphy.com/media/l0MYEqEzwMWFCg8rm/giphy.gif",
];

// ฟังก์ชันสำหรับแสดง modal ยืนยันคำตอบ
const confirmAnswer = () => {
  showConfirmModal.value = true; // แสดง modal การยืนยัน
};

// ฟังก์ชันยกเลิกการยืนยันคำตอบ
const cancelConfirmation = () => {
  showConfirmModal.value = false; // ซ่อน modal
};

// ฟังก์ชันสำหรับตรวจคำตอบ
const checkAnswer = () => {
  if (userAnswer.value.trim().toLowerCase() === correctAnswer) {
    isUnlocked.value = true;
    errorMessage.value = ""; // เคลียร์ข้อความ error
    randomGif.value = ""; // เคลียร์ GIF
  } else {
    const randomIndex = Math.floor(Math.random() * errorMessages.length);
    errorMessage.value = errorMessages[randomIndex];

    // เลือก GIF สุ่มจาก array
    const randomIndexGif = Math.floor(Math.random() * gifs.length);
    randomGif.value = gifs[randomIndexGif];
  }

  showConfirmModal.value = false; // ซ่อน modal หลังจากตรวจคำตอบ
};

// ฟังก์ชันเปลี่ยนหน้าไปที่เนื้อหา
const goToContent = () => {
  router.push("/quiz"); // เปลี่ยนไปยังหน้าเนื้อหา
};
</script>

<style scoped>
/* Optional: Style animations */
</style>
