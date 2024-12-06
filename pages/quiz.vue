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
              Quiz: ทดสอบความรู้เกี่ยวกับ Backend (Go + PostgreSQL)
            </h2>
            <p class="text-md">
              ตอบคำถามเกี่ยวกับ Backend (Go + PostgreSQL)
              แล้วดูผลลัพธ์พร้อมคำอธิบายได้เลย!
            </p>

            <!-- Quiz Questions -->
            <div v-if="!isQuizComplete">
              <div
                v-for="(question, index) in questions"
                :key="question.id"
                class="mt-4"
              >
                <p class="text-md font-medium">
                  {{ index + 1 }}. {{ question.question }}
                </p>
                <div class="mt-2">
                  <input
                    type="text"
                    v-model="answers[question.id]"
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
                คุณได้คะแนน {{ scorePercentage }}% ({{ score }}/ {{ maxScore }})
              </h3>
              <ul class="list-disc list-inside mt-4 text-md">
                <li v-for="(question, index) in questions" :key="question.id">
                  <p class="font-medium">
                    {{ index + 1 }}. {{ question.question }}
                  </p>
                  <p
                    :class="{
                      'text-green-400': question.isCorrect,
                      'text-red-400': !question.isCorrect,
                    }"
                  >
                    - คำตอบของคุณ: {{ answers[question.id] || "ไม่ได้ตอบ" }} ({{
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
// เมนู
const menus = [
  {
    id: 0,
    name: "แบบทดสอบ Backend",
    content: "ตอบคำถามเกี่ยวกับ Go + PostgreSQL",
  },
];

// เมนูที่เลือก
const selectedMenu = ref(menus[0]);

const selectMenu = (menu: (typeof menus)[0]) => {
  selectedMenu.value = menu;
};

// คำถามในแบบทดสอบ
interface Question {
  id: number;
  question: string;
  keywords: string[];
  max_score: number;
  isCorrect: boolean;
}

const questions: Question[] = reactive([
  {
    id: 1,
    question: "Go ใช้ทำอะไรในระบบ Backend?",
    keywords: ["server", "api", "backend"],
    max_score: 2,
    isCorrect: false,
  },
  {
    id: 2,
    question: "PostgreSQL เป็นประเภทฐานข้อมูลแบบใด?",
    keywords: ["relational", "sql", "database"],
    max_score: 2,
    isCorrect: false,
  },
  {
    id: 3,
    question: "Middleware ใน Gin Framework ใช้ทำอะไร?",
    keywords: ["handle request", "authentication", "logging"],
    max_score: 2,
    isCorrect: false,
  },
  {
    id: 4,
    question: "ORM (Object-Relational Mapping) ใน Go คืออะไร?",
    keywords: ["database abstraction", "gorm", "query"],
    max_score: 2,
    isCorrect: false,
  },
  {
    id: 5,
    question: "บอกข้อดีของ PostgreSQL เมื่อเทียบกับฐานข้อมูลอื่น?",
    keywords: ["performance", "features", "open source"],
    max_score: 2,
    isCorrect: false,
  },
]);

// คำตอบ
const answers = reactive<Record<number, string | undefined>>({});
const isQuizComplete = ref(false);
const score = ref(0);
const maxScore = computed(() => {
  return questions.reduce((sum, question) => sum + question.max_score, 0);
});
const scorePercentage = computed(() =>
  ((score.value / maxScore.value) * 100).toFixed(2)
);

// ตรวจคำตอบ
const submitQuiz = () => {
  score.value = 0;

  questions.forEach((question) => {
    const userAnswer = (answers[question.id] || "")
      .toLowerCase()
      .split(/[ ,]+/);
    const matchedKeywords = userAnswer.filter((answer:any) =>
      question.keywords.includes(answer)
    );

    question.isCorrect = matchedKeywords.length > 0;
    score.value += matchedKeywords.length;
  });

  isQuizComplete.value = true;
};

// รีเซ็ตแบบทดสอบ
const resetQuiz = () => {
  isQuizComplete.value = false;
  score.value = 0;
  Object.keys(answers).forEach((key) => (answers[Number(key)] = ""));
};
</script>

<style scoped>
/* Custom Styling */
</style>
