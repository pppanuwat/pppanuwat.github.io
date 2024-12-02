<template>
  <div class="h-screen flex bg-gray-900 text-gray-100">
    <!-- Sidebar -->
    <div class="bg-gray-800 w-1/5 p-4 flex flex-col space-y-4 shadow-lg">
      <h2 class="text-lg tracking-wider text-gray-200 mb-4">เมนู</h2>
      <button
        v-for="menu in menus"
        :key="menu.id"
        @click="selectMenu(menu)"
        class="w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ease-in-out"
        :class="
          menu.id === selectedMenu.id
            ? 'bg-blue-700 text-white shadow-md'
            : 'bg-gray-700 hover:bg-gray-600'
        "
      >
        {{ menu.name }}
      </button>
    </div>

    <!-- Content -->
    <div class="flex-1 bg-gray-900 p-8 h-full">
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <h1 class="text-3xl font-bold mb-4 text-blue-500">
          {{ selectedMenu.name }}
        </h1>
        <p class="text-gray-300 font-bold text-xl">
          - {{ selectedMenu.content }}
        </p>

        <!-- Quiz Section -->
        <div
          v-if="selectedMenu.id === 0"
          class="p-6 bg-gray-900 text-gray-200 rounded-lg shadow-md mt-4 max-h-[550px] overflow-auto"
        >
          <div class="space-y-6">
            <!-- Introduction -->
            <h2
              class="text-lg font-bold border-l-4 border-purple-400 pl-4 mb-4"
            >
              Quiz: ทดสอบความรู้เกี่ยวกับ Nuxt 3
            </h2>
            <p class="text-md">
              ตอบคำถามเกี่ยวกับ Nuxt 3 แล้วดูผลลัพธ์พร้อมคำอธิบายได้เลย!
            </p>

            <!-- Quiz Questions -->
            <div v-if="!isQuizComplete">
              <div
                v-for="(question, index) in questions"
                :key="index"
                class="mt-4"
              >
                <p class="text-md font-medium">
                  {{ index + 1 }}. {{ question.question }}
                </p>
                <div class="mt-2">
                  <input
                    type="text"
                    v-model="question.answer"
                    placeholder="กรอกคำตอบของคุณ"
                    class="w-full px-4 py-2 bg-gray-800 text-gray-200 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-purple-400"
                  />
                </div>
              </div>

              <button
                class="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                @click="submitQuiz"
              >
                ส่งคำตอบ
              </button>
            </div>

            <!-- Quiz Results -->
            <div v-else>
              <h3 class="text-md font-bold text-green-400 mt-4">
                คุณได้คะแนน {{ scorePercentage }}% ({{ score }}/
                {{ maxScore }})
              </h3>
              <ul class="list-disc list-inside mt-4 text-md">
                <li v-for="(question, index) in questions" :key="index">
                  <p class="font-medium">
                    {{ index + 1 }}. {{ question.question }}
                  </p>
                  <p
                    :class="{
                      'text-green-400': question.isCorrect,
                      'text-red-400': !question.isCorrect,
                    }"
                  >
                    - คำตอบของคุณ: {{ question.answer }} ({{
                      question.isCorrect ? "ถูกต้อง" : "ผิด"
                    }})
                  </p>
                  <p class="text-gray-400">
                    - คำตอบที่ถูกต้อง: {{ question.keywords.join(", ") }}
                  </p>
                </li>
              </ul>
              <button
                class="mt-6 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                @click="resetQuiz"
              >
                ทำแบบทดสอบใหม่
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

// รายการเมนู
const menus = [
  { id: 0, name: "ทำควิชเกี่ยวกับ Nuxt 3", content: "ทดสอบความรู้เกี่ยวกับ Nuxt 3" },
];

// เมนูที่ถูกเลือก
const selectedMenu = ref(menus[0]);

// ฟังก์ชันเลือกเมนู
const selectMenu = (menu: (typeof menus)[0]) => {
  selectedMenu.value = menu;
};

// คำถามในแบบทดสอบ
const questions = reactive([
  {
    question: "Nuxt 3 คืออะไร?",
    keywords: ["framework", "vue", "server-side rendering", "ssr"],
    answer: "",
    score: 0,
    maxScore: 2,
    isCorrect: false,
  },
  {
    question: "ใน Nuxt 3 ฟังก์ชัน `asyncData` ใช้ทำอะไร?",
    keywords: ["fetch data", "async", "server-side"],
    answer: "",
    score: 0,
    maxScore: 2,
    isCorrect: false,
  },
  {
    question: "Nuxt 3 รองรับโหมดการทำงานอะไรบ้าง?",
    keywords: ["server-side rendering", "static site generation", "ssr", "ssg"],
    answer: "",
    score: 0,
    maxScore: 2,
    isCorrect: false,
  },
  {
    question: "ใน Nuxt 3 เราสามารถใช้ Layout ได้อย่างไร?",
    keywords: ["layouts", "default", "custom layout"],
    answer: "",
    score: 0,
    maxScore: 2,
    isCorrect: false,
  },
  {
    question: "ใน Nuxt 3 การทำ Navigation Guard ใช้คำสั่งอะไร?",
    keywords: ["middleware", "route guard"],
    answer: "",
    score: 0,
    maxScore: 2,
    isCorrect: false,
  },
  {
    question: "ไฟล์ `.vue` ประกอบด้วยส่วนใดบ้าง?",
    keywords: ["template", "script", "style"],
    answer: "",
    score: 0,
    maxScore: 3,
    isCorrect: false,
  },
  {
    question: "ใน Nuxt 3 เราสามารถใช้ Pinia เพื่อทำอะไร?",
    keywords: ["state management", "store"],
    answer: "",
    score: 0,
    maxScore: 2,
    isCorrect: false,
  },
  {
    question: "บอกประโยชน์ของ TypeScript ในโปรเจค Nuxt 3?",
    keywords: ["type safety", "error prevention", "better intellisense"],
    answer: "",
    score: 0,
    maxScore: 2,
    isCorrect: false,
  },
  {
    question: "ใน Nuxt 3, คำสั่ง `useState` ใช้ทำอะไร?",
    keywords: ["reactive state", "shared state", "state management"],
    answer: "",
    score: 0,
    maxScore: 2,
    isCorrect: false,
  },
  {
    question: "ส่วนประกอบหลักของ Nuxt 3 มีอะไรบ้าง?",
    keywords: ["pages", "layouts", "components", "middleware"],
    answer: "",
    score: 0,
    maxScore: 3,
    isCorrect: false,
  },
]);

const score = ref(0);
const maxScore = computed(() =>
  questions.reduce((sum: any, q: any) => sum + q.maxScore, 0)
);
const scorePercentage = computed(() =>
  ((score.value / maxScore.value) * 100).toFixed(2)
);
const isQuizComplete = ref(false);

// ฟังก์ชันส่งคำตอบ
const submitQuiz = () => {
  score.value = 0;

  questions.forEach((question: any) => {
    const userAnswer = question.answer.toLowerCase().split(/[ ,]+/);
    const matchedKeywords = userAnswer.filter((answer: any) =>
      question.keywords.includes(answer)
    );

    question.score = matchedKeywords.length;
    question.isCorrect = question.score > 0;
    score.value += question.score;
  });

  isQuizComplete.value = true;
};

// ฟังก์ชันรีเซ็ตแบบทดสอบ
const resetQuiz = () => {
  score.value = 0;
  isQuizComplete.value = false;

  questions.forEach((question: any) => {
    question.answer = "";
    question.score = 0;
    question.isCorrect = false;
  });
};
</script>

<style scoped>
/* Custom Styling */
</style>
