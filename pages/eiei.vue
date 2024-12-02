<template>
  <div class="min-h-screen flex items-center justify-center bg-pink-50">
    <div class="w-full max-w-sm bg-white rounded-lg shadow-lg p-6 text-center">
      <h1 class="text-2xl font-bold text-pink-500 mb-4">
        🌸 ถามมมมม 🌸
      </h1>
      <p class="text-lg font-semibold text-gray-700 mb-4">
        {{ currentQuestion }}
      </p>
      <input
        v-model="userAnswer"
        type="text"
        placeholder="พิมพ์คำตอบของเนยที่นี่"
        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none mb-4"
        :disabled="isProcessing || isCorrect"
      />
      <button
        @click="handleAnswer"
        :disabled="isProcessing || isCorrect"
        class="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition disabled:bg-gray-300"
      >
        ตอบคำถาม ✨
      </button>

      <p v-if="isCorrect" class="text-green-500 text-lg font-bold mt-4">
        {{ answerMessage }}
      </p>

      <iframe
        v-if="isCorrect"
        width="0"
        height="0"
        src="https://www.youtube.com/embed/nr2CsEtXxmI?autoplay=1"
        frameborder="0"
        allow="autoplay"
      ></iframe>
    </div>
  </div>
</template>

<script lang="ts" setup>

// เริ่มต้นคำถาม
const initialQuestion = "อะไรที่ใช้คำว่าน่ารักได้?";
const correctAnswer = "เนย";
const userAnswer = ref("");
const isCorrect = ref(false);
const isProcessing = ref(false);
const currentQuestion = ref(initialQuestion);
const answerCount = ref(0); // ตัวแปรนับจำนวนการตอบ
const answerMessage = ref("");

// ฟังก์ชันจัดการคำตอบ
const handleAnswer = () => {
  if (isProcessing.value) return;

  answerCount.value++; // เพิ่มจำนวนการตอบทุกครั้งที่คลิก

  if (userAnswer.value.trim() === correctAnswer) {
    isCorrect.value = true;
    if (answerCount.value === 1) {
      answerMessage.value = `เห้ย ตอบครั้งเดียวก็ถูกเลยไง๊!`;
    } else {
      answerMessage.value = `ถูกค้าบบ "${correctAnswer}" ไงง`;
    }

    // ตั้งค่า currentQuestion.value กลับเป็นคำถามเริ่มต้น
    currentQuestion.value = initialQuestion;

  } else {
    const userResponse = userAnswer.value.trim();
    // เปลี่ยนคำถามเป็นการถามเหตุผล หากตอบผิด
    if (!isCorrect.value) {
      currentQuestion.value = `ทำไมถึงคิดว่า "${userResponse}" ใช้กับคำว่าน่ารักล่ะ?`;
    }
    userAnswer.value = ""; // ล้างคำตอบ
    isProcessing.value = true;

    // โยงกลับคำถามแรกหลังจาก 3 วินาที
    setTimeout(() => {
      if (!isCorrect.value) {
        currentQuestion.value = `${userResponse} ก็ใช้ได้นะ แต่... ยังไม่ถูกลองตอบใหม่?`;
      }
      isProcessing.value = false;
    }, 3000);
  }
};
</script>

<style>
/* ใช้ Tailwind CSS */
</style>
