<template>
  <div>
    <div
      class="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200"
    >
      <!-- Container -->
      <div
        v-if="!isUnlocked"
        class="p-8 bg-gray-800 rounded-lg shadow-md w-full max-w-md text-center space-y-6"
      >
        <!-- คำถาม -->
        <h2 class="text-xl font-bold mb-4">
          ตอบคำถามเพื่อเข้าถึงเนื้อหานาจาาา
        </h2>
        <p class="text-lg">คำถาม:อย่าง Yellow คืออ (ไม่ใช่สีเหลืองฮุฮุ) ?</p>

        <!-- กล่องกรอกคำตอบ -->
        <input
          v-model="userAnswer"
          type="text"
          placeholder="พิมพ์คำตอบของคุณ"
          class="w-full px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring focus:ring-blue-400"
        />

        <!-- ปุ่มยืนยัน -->
        <button
          @click="confirmAnswer"
          class="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          ยืนยันคำตอบ
        </button>

        <!-- แสดง GIF ตลกเมื่อคำตอบผิด -->
        <div v-if="errorMessage" class="mt-4">
          <p class="text-red-400 mb-2">{{ errorMessage }}</p>
          <img :src="randomGif" alt="ผิดแล้วนะ" class="rounded-md mx-auto" />
        </div>
      </div>

      <!-- เมื่อคำตอบถูกต้อง -->
      <div
        v-else
        class="p-8 bg-blue-500 rounded-lg shadow-md w-full max-w-md text-center space-y-4"
      >
        <h2 class="text-xl font-bold text-green-400">
          <span class="text-red-500 font-bold text-3xl">ยังอีก</span>
          เดี๋ยวเอากะโถนฟาดปาก
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

    <!-- Modal for confirmation -->
    <div
      v-if="showConfirmModal"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-80">
        <h3 class="text-xl font-bold mb-4">ยืนยันคำตอบบบบบ</h3>
        <p class="mb-4">โยมแน่ใจหรือไม่ว่าต้องการตอบว่า "{{ userAnswer }}" ?</p>
        <div class="flex justify-between gap-2">
          <button
            @click="checkAnswer"
            class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            แมน
          </button>
          <button
            @click="cancelConfirmation"
            class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full"
          >
           บ่
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
const correctAnswer = "มะม่วง";

const errorMessages = [
  "ผิดฮาฟฟ! ลองอีกที yellow ยูโน้วว",
  "ยังไม่ถูก อีกทีๆ",
  "อุ๊บส์! คำตอบผิดจ้า",
  "คิดใหม่หน่อย",
  "อย่าหลงทางงหนู",
];

const gifs = [
  "https://media.giphy.com/media/l3q2K5jinAlChoCLS/giphy.gif", // GIF ตลก
  "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExanpxYjBxN3VxbWxwODI3Z2d6anhmOTB2aGdrYXV2Y2VkNXRhOTN6dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/61lpuBy8xTVARQewI5/giphy.gif", // GIF ที่แสดงความตกใจ
  "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmVtNW15OG9ibjA2czcwczl6cW1qcDVudjh2d2RibGtsNDk0eTg2cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8lgqAbycBjosxjfi9k/giphy.gif", // GIF ตลก
  "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTg0dnFlZW52ZDBmOGc2eGVtcTBtZ3J3b210YWE1anVuNWo5NTdpdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Lk023zZqHJ3Zz4rxtV/giphy.gif", // GIF สุนัข
];

// ฟังก์ชันสำหรับแสดง modal ยืนยันคำตอบ
function confirmAnswer() {
  showConfirmModal.value = true; // แสดง modal การยืนยัน
}

// ฟังก์ชันยกเลิกการยืนยันคำตอบ
function cancelConfirmation() {
  showConfirmModal.value = false; // ซ่อน modal
}

// ฟังก์ชันสำหรับตรวจคำตอบ
function checkAnswer() {
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
}

// ฟังก์ชันเปลี่ยนหน้าไปที่เนื้อหา
function goToContent() {
  router.push("/content"); // เปลี่ยนไปยังหน้าเนื้อหา
}
</script>

<style scoped>
/* Optional: Style modal to make it look better */
</style>
