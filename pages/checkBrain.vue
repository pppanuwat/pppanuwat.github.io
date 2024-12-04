<template>
  <div
    class="flex items-center justify-center min-h-screen bg-gray-200 text-gray-800"
  >
    <!-- Container -->
    <div
      v-if="!isUnlocked"
      class="p-8 bg-white rounded-xl shadow-lg w-full max-w-md text-center space-y-6 border-4 border-dashed border-blue-500"
    >
      <!-- คำถาม -->
      <h2 class="text-2xl font-bold text-blue-700 mb-4">
        🎵 เกมทายเพลงจาก Siri 🎤
      </h2>
      <p class="text-lg font-bold">
        "ฟังเสียงเพลงแล้วลองทายดูว่าชื่อเพลงคืออะไร? 🤔"
      </p>

      <!-- ปุ่มเล่นเสียง -->
      <button
        @click="playSong"
        class="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold px-4 py-2 rounded-lg shadow-md hover:scale-105 transition-transform"
      >
        ▶️ ฟังเสียงเพลง!
      </button>

      <!-- กล่องกรอกคำตอบ -->
      <input
        v-model="userAnswer"
        type="text"
        placeholder="พิมพ์ชื่อเพลงที่คุณคิดว่าใช่!"
        class="w-full px-4 py-2 rounded-lg border-2 border-dashed border-blue-400 text-gray-900 text-center focus:ring focus:ring-blue-500"
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
    <!-- <div
      v-else
      class="p-8 bg-gradient-to-tr from-green-400 to-blue-500 rounded-xl shadow-lg w-full max-w-md text-center space-y-6 flex flex-col items-center border-4 border-yellow-500"
    >
      <h1 class="text-3xl font-extrabold text-white">🥳 ถูกต้อง! 🎉</h1>
      <p class="text-lg font-medium text-yellow-100">
        "ยินดีด้วย! คุณเดาชื่อเพลงถูกแล้ว 🤩"
      </p>
      <button
        @click="goToNextSong"
        class="w-full max-w-xs bg-white text-blue-800 font-bold px-5 py-3 rounded-lg shadow-lg hover:scale-110 transition-transform"
      >
        🔥 เล่นเพลงถัดไป!
      </button>
    </div> -->
    <!-- เมื่อคำตอบถูกต้อง -->
    <!-- เมื่อคำตอบถูกต้อง -->
    <div
      v-else
      class="p-8 bg-gradient-to-tr from-green-400 to-blue-500 rounded-xl shadow-lg w-full max-w-md text-center space-y-6 flex flex-col items-center border-4 border-yellow-500"
    >
      <h1 class="text-3xl font-extrabold text-white">🥳 คุณคืออัจฉริยะฮิฮิ! 🎉</h1>
      <iframe
        src="https://www.youtube.com/embed/q0T_nEdXSfY?autoplay=1&mute=1"
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
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const userAnswer = ref(""); // เก็บคำตอบของผู้ใช้
const isUnlocked = ref(false); // เก็บสถานะว่าปลดล็อคหรือยัง
const errorMessage = ref(""); // เก็บข้อความแสดงข้อผิดพลาด
const randomGif = ref(""); // เก็บ URL ของ GIF ที่จะสุ่ม
const router = useRouter(); // ใช้เปลี่ยนหน้า

// ข้อมูลเพลง (ตัวอย่าง)
const correctAnswer = ref("ซ่อนกลิ่น"); // คำตอบที่ถูกต้อง
const songs = [
  {
    name: "ซ่อนกลิ่น",
    audio: "/audio/quiz.mp3", // URL ของไฟล์เสียง
  },

];

const currentSong = ref(0); // เพลงปัจจุบัน
const audioPlayer = ref(null); // เก็บ audio element

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

// ฟังก์ชันสำหรับเล่นเสียง
const playSong = () => {
  if (audioPlayer.value) {
    audioPlayer.value.pause();
  }
  audioPlayer.value = new Audio(songs[currentSong.value].audio);
  audioPlayer.value.play();
};

// ฟังก์ชันสำหรับยืนยันคำตอบ
const confirmAnswer = () => {
  if (
    userAnswer.value.trim().toLowerCase() === correctAnswer.value.toLowerCase()
  ) {
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
};

// ฟังก์ชันเปลี่ยนไปยังเพลงถัดไป
const goToNextSong = () => {
  currentSong.value++;
  if (currentSong.value >= songs.length) {
    currentSong.value = 0; // รีเซ็ตเป็นเพลงแรกถ้าครบแล้ว
  }
  correctAnswer.value = songs[currentSong.value].name;
  userAnswer.value = "";
  isUnlocked.value = false;
  playSong();
};
</script>
