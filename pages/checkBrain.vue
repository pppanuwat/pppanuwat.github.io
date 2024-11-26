<template>
  <div
    class="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200"
  >
    <!-- Container -->
    <div
      v-if="!isUnlocked"
      class="p-8 bg-gray-800 rounded-lg shadow-md w-full max-w-md text-center space-y-6"
    >
      <!-- คำถาม -->
      <h2 class="text-xl font-bold mb-4">ตอบคำถามเพื่อเข้าถึงเนื้อหานาจาาา</h2>
      <p class="text-lg">คำถาม: Yellow คืออะไรรรรรรรรรรร ?</p>

      <!-- กล่องกรอกคำตอบ -->
      <input
        @keypress.enter="checkAnswer"
        v-model="userAnswer"
        type="text"
        placeholder="พิมพ์คำตอบของคุณ"
        class="w-full px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring focus:ring-blue-400"
      />

      <!-- ปุ่มยืนยัน -->
      <button
        @click="checkAnswer"
        class="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        ยืนยันคำตอบ
      </button>

      <!-- แสดง GIF ตลกเมื่อคำตอบผิด -->
      <div v-if="errorMessage" class="mt-4">
        <p class="text-red-400 mb-2">{{ errorMessage }}</p>
        <img
          src="https://media.giphy.com/media/l3q2K5jinAlChoCLS/giphy.gif"
          alt="ผิดแล้วนะ"
          class="rounded-md mx-auto"
        />
      </div>
    </div>

    <!-- เมื่อคำตอบถูกต้อง -->
    <div
      v-else
      class="p-8 bg-blue-500 rounded-lg shadow-md w-full max-w-md text-center space-y-4"
    >
      <h2 class="text-xl font-bold text-green-400">
       <span class="text-red-500 font-bold text-2xl">ยังอีก</span>  เดี๋ยวเอากะโถนฟาดปาก 
      </h2>
      <span class="text-xs">หยอก! ถูกแล้ว 🎉</span>
      <button
        @click="goToContent"
        class="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-green-600"
      >
        เข้าสู่เนื้อหากันเลยวัยรุ่น
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const userAnswer = ref(""); // เก็บคำตอบของผู้ใช้
const isUnlocked = ref(false); // เก็บสถานะว่าปลดล็อคหรือยัง
const errorMessage = ref(""); // เก็บข้อความแสดงข้อผิดพลาด
const router = useRouter(); // ใช้เปลี่ยนหน้า

// คำตอบที่ถูกต้อง
const correctAnswer = "มะม่วง";

function checkAnswer() {
  if (userAnswer.value.trim().toLowerCase() === correctAnswer) {
    isUnlocked.value = true;
    errorMessage.value = ""; // เคลียร์ข้อความ error
  } else {
    errorMessage.value = "ผิดฮาฟฟ! ลองอีกที yellow ยูโน้วว ";
  }
}

function goToContent() {
  router.push("/content"); // เปลี่ยนไปยังหน้าเนื้อหา
}
</script>

<style></style>
