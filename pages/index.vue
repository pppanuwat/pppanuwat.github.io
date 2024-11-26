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

        <!-- section 0 -->
<div
  v-if="selectedMenu.id == 0"
  class="p-6 bg-gray-900 text-gray-200 rounded-lg shadow-md mt-1 max-h-[550px] overflow-x-auto"
>
  <div class="space-y-6">
    <!-- Introduction -->
    <h2 class="text-lg font-bold border-l-4 border-purple-400 pl-4 mb-4">
      Quiz: ทดสอบความรู้เกี่ยวกับ JavaScript และ Nuxt 3
    </h2>
    <p class="text-md">
      ตอบคำถามต่อไปนี้ให้ดีที่สุด แล้วเราจะมาสรุปคะแนนพร้อมคำอธิบายกัน!
    </p>

    <!-- Quiz Questions -->
    <div v-if="!isQuizComplete">
      <div v-for="(question, index) in questions" :key="index" class="mt-4">
        <p class="text-md font-medium">
          {{ index + 1 }}. {{ question.question }}
        </p>
        <div class="space-y-2">
          <label
            v-for="(option, idx) in question.options"
            :key="idx"
            class="block"
          >
            <input
              type="radio"
              :name="'question-' + index"
              :value="option"
              v-model="question.selected"
              class="mr-2"
            />
            {{ option }}
          </label>
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
        หนูได้คะแนน {{ score }}/{{ questions.length }} นะจ้ะฮิฮิ
      </h3>
      <ul class="list-disc list-inside mt-4 text-md">
        <li v-for="(question, index) in questions" :key="index">
          <p class="font-medium">
            {{ index + 1 }}. {{ question.question }}
          </p>
          <p
            :class="{
              'text-green-400': question.isCorrect,
              'text-red-400': !question.isCorrect
            }"
          >
            - คำตอบของยูววว: {{ question.selected }} ({{ question.isCorrect ? 'ถูกต้อง' : 'ผิด' }})
          </p>
          <p class="text-gray-400">- คำตอบที่ถูกต้อง: {{ question.correct }}</p>
        </li>
      </ul>
    </div>
  </div>
</div>


        <!-- section 1 -->
        <div
          v-if="selectedMenu.id == 1"
          class="p-6 bg-gray-900 text-gray-200 rounded-lg shadow-md mt-1 max-h-[550px] overflow-x-auto"
        >
          <div class="space-y-6">
            <!-- คำอธิบาย -->
            <p class="text-lg">
              Nuxt คือ Framework ที่เอา Vue มาปรับปรุงประสิทธิภาพ
              และปรับแต่งให้ทำงานได้ดีกับ
              <span class="text-blue-400">SSR (Server Side Rendering)</span>
              ทำให้รองรับ
              <span class="text-blue-400">SEO (Better SEO)</span>
              เว็บแสดงผลได้เร็วขึ้น (<span class="text-green-400"
                >Faster time-to-content</span
              >) และช่วยให้ Google Page Speed ดีขึ้นกว่าแบบ SPA
            </p>

            <!-- หัวข้อย่อย -->
            <div>
              <h2
                class="text-lg font-bold border-l-4 border-blue-400 pl-4 mb-4"
              >
                - อธิบายโครงสร้างโปรเจค Nuxt.js
              </h2>
              <ul class="space-y-4 list-disc list-inside text-md">
                <li>
                  <span class="text-yellow-300">assets</span> คือ
                  ส่วนของการเก็บไฟล์ที่ต้องนำไปใช้และ compile เช่นไฟล์พวก
                  <span class="text-green-400">Scss, less หรือ fonts</span> ต่าง
                  ๆ
                </li>
                <li>
                  <span class="text-yellow-300">components</span>
                  คือ ส่วนสำหรับ Component ต่าง ๆ ของ Vue.js
                  ในส่วนนี้จะไม่สามารถใช้งาน
                  <span class="text-blue-300">asyncData</span> หรือ
                  <span class="text-blue-300">fetch</span> ได้
                </li>
                <li>
                  <span class="text-yellow-300">layouts</span> คือ เป็นส่วนของ
                  <span class="text-green-400">root layout</span> ครับ
                  สามารถนำไป implement ใช้กับ
                  <span class="text-green-400">page</span> ต่าง ๆ ได้
                </li>
                <li>
                  <span class="text-yellow-300">middleware</span>
                  คือ ส่วนของ Middleware ที่จะนำไปใช้กับ Nuxt.js
                  ในการเรียกใช้ฟังก์ชันก่อนที่จะมีการ render
                </li>
                <li>
                  <span class="text-yellow-300">pages</span> คือ
                  ส่วนของหน้าเว็บเรา ในส่วนนี้ การตั้งชื่อไฟล์หรือชื่อโฟลเดอร์
                  จะมีส่วนกับการกำหนด
                  <span class="text-blue-400">URL</span> ของเว็บ
                </li>
                <li>
                  <span class="text-yellow-300">server</span> คือ ส่วนของตัว
                  <span class="text-blue-400">Express.js</span>
                  จะเป็นไฟล์ที่ใช้ในการรัน server ทั้งหมด
                </li>
                <li>
                  <span class="text-yellow-300">store</span> คือ ส่วนของตัว
                  <span class="text-blue-400">Vuex</span>
                  ที่ใช้ในการจัดการ state ของ Vue.js
                </li>
                <li>
                  <span class="text-yellow-300">.env</span> คือ
                  ไฟล์ในการกำหนดค่าตัวแปรที่ใช้ควบคุม
                  <span class="text-green-400">Environment</span>
                </li>
                <li>
                  <span class="text-yellow-300">.nuxt.config.js</span>
                  คือ ไฟล์ที่ใช้กำหนดค่าสำหรับ Nuxt.js ไม่ว่าจะเป็นการกำหนด
                  <span class="text-blue-400">meta</span>, การเพิ่ม
                  <span class="text-blue-400">plugins</span> หรือ
                  <span class="text-blue-400">assets</span> ต่าง ๆ
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- section 2 -->
        <div
          v-if="selectedMenu.id == 2"
          class="p-6 bg-gray-900 text-gray-200 rounded-lg shadow-md mt-1 max-h-[550px] overflow-x-auto"
        >
          <div class="space-y-6">
            <!-- หัวข้อหลัก -->
            <h2 class="text-xl font-bold border-l-4 border-blue-400 pl-4">
              การติดตั้ง Nuxt 3 ลงในเครื่อง
            </h2>

            <!-- คำอธิบาย -->
            <p class="text-lg leading-relaxed">
              ในการติดตั้ง Nuxt 3 สามารถทำตามขั้นตอนด้านล่างได้อย่างง่ายดาย
              โดยเริ่มต้นจากการสร้างโปรเจกต์ใหม่ และติดตั้งเครื่องมือที่จำเป็น
            </p>

            <!-- ขั้นตอนการติดตั้ง -->
            <ul class="space-y-4 list-decimal list-inside">
              <li>
                <span class="font-semibold text-yellow-300"
                  >ติดตั้ง Node.js:</span
                >
                ดาวน์โหลดและติดตั้ง
                <a
                  href="https://nodejs.org"
                  target="_blank"
                  class="text-blue-400 hover:underline"
                  >Node.js</a
                >
                (แนะนำให้ใช้เวอร์ชัน LTS)
              </li>
              <li>
                <span class="font-semibold text-yellow-300"
                  >สร้างโปรเจกต์ใหม่:</span
                >
                เปิด Terminal และพิมพ์คำสั่งต่อไปนี้:
                <div class="bg-gray-800 p-4 mt-2 rounded-lg">
                  <code class="text-green-400"
                    >npx nuxi init nuxt-app-byPOND</code
                  >
                </div>
                คำสั่งนี้จะสร้างโครงสร้างโปรเจกต์พื้นฐานสำหรับ Nuxt 3
                ในโฟลเดอร์ชื่อ <code>nuxt-app-byPOND</code>
              </li>
              <li>
                <span class="font-semibold text-yellow-300"
                  >เข้าไปในโฟลเดอร์โปรเจกต์:</span
                >
                <div class="bg-gray-800 p-4 mt-2 rounded-lg">
                  <code class="text-green-400">cd nuxt-app-byPOND</code>
                </div>
              </li>
              <li>
                <span class="font-semibold text-yellow-300"
                  >ติดตั้ง Dependencies:</span
                >
                ใช้คำสั่งนี้เพื่อดาวน์โหลด dependencies ทั้งหมดที่จำเป็น:
                <div class="bg-gray-800 p-4 mt-2 rounded-lg">
                  <code class="text-green-400">yarn install</code>
                </div>
              </li>
              <li>
                <span class="font-semibold text-yellow-300"
                  >เริ่มต้นเซิร์ฟเวอร์พัฒนา:</span
                >
                รันคำสั่งนี้เพื่อเริ่มเซิร์ฟเวอร์พัฒนา:
                <div class="bg-gray-800 p-4 mt-2 rounded-lg">
                  <code class="text-green-400">yarn run</code>
                </div>
                สามารถเข้าถึงแอปพลิเคชันได้ที่
                <span class="text-blue-400">http://localhost:3000</span>
              </li>
            </ul>

            <!-- หมายเหตุ -->
            <p class="text-sm text-gray-400">
              หมายเหตุ: สามารถใช้
              <span class="text-blue-400 font-semibold">pnpm</span> หรือ
              <span class="text-blue-400 font-semibold">yarn</span> แทน
              <code class="text-green-400">npm</code> ได้
            </p>
          </div>
        </div>

        <!-- section 3 -->
        <div
          v-if="selectedMenu.id == 3"
          class="p-6 bg-gray-900 text-gray-200 rounded-lg shadow-md mt-1 max-h-[550px] overflow-x-auto"
        >
          <div class="space-y-6 pr-4">
            <!-- หัวข้อหลัก -->
            <h2 class="text-xl font-bold border-l-4 border-green-400 pl-4">
              การติดตั้ง Tailwind CSS ใน Nuxt 3
            </h2>

            <!-- คำอธิบาย -->
            <p class="text-lg leading-relaxed">
              Tailwind CSS เป็น utility-first CSS framework ที่ช่วยให้การพัฒนา
              UI รวดเร็วและมีประสิทธิภาพมากขึ้น โดยสามารถติดตั้งใน Nuxt 3
              ได้ตามขั้นตอนด้านล่าง:
            </p>

            <!-- ขั้นตอนการติดตั้ง -->
            <ul class="space-y-4 list-decimal list-inside">
              <li>
                <span class="font-semibold text-yellow-300"
                  >ติดตั้งแพ็กเกจ Tailwind CSS:</span
                >
                ใช้คำสั่งต่อไปนี้ใน Terminal เพื่อเพิ่ม Tailwind CSS ในโปรเจกต์:
                <div class="bg-gray-800 p-4 mt-2 rounded-lg">
                  <code class="text-green-400">
                    npm install -D tailwindcss postcss autoprefixer
                  </code>
                </div>
              </li>
              <li>
                <span class="font-semibold text-yellow-300"
                  >สร้างไฟล์ config:</span
                >
                ใช้คำสั่งนี้เพื่อสร้างไฟล์ `tailwind.config.js` และ
                `postcss.config.js`:
                <div class="bg-gray-800 p-4 mt-2 rounded-lg">
                  <code class="text-green-400">npx tailwindcss init</code>
                </div>
                หลังจากนั้นจะได้ไฟล์ `tailwind.config.js` สำหรับปรับแต่ง
                Tailwind CSS
              </li>
              <li>
                <span class="font-semibold text-yellow-300"
                  >ตั้งค่าไฟล์ Tailwind CSS:</span
                >
                เพิ่มตำแหน่งไฟล์ที่ Tailwind CSS ควรตรวจสอบใน
                `tailwind.config.js`:
                <div class="bg-gray-800 p-4 rounded-lg">
                  <pre class="text-green-400">
content: [
    "./pages/**/*.{vue,js,ts}",
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.{vue,js,ts}",
    "./app.vue",
]
          </pre
                  >
                </div>
              </li>
              <li>
                <span class="font-semibold text-yellow-300"
                  >เพิ่ม Tailwind ใน CSS หลัก:</span
                >
                ในไฟล์ `assets/css/main.css` (หรือสร้างไฟล์ใหม่)
                ให้เพิ่มบรรทัดต่อไปนี้:
                <div class="bg-gray-800 p-4 rounded-lg">
                  <pre class="text-green-400">
@tailwind base;
@tailwind components;
@tailwind utilities;
          </pre
                  >
                </div>
              </li>
              <li>
                <span class="font-semibold text-yellow-300"
                  >ตั้งค่า Nuxt ให้ใช้ Tailwind CSS:</span
                >
                เพิ่ม CSS ไฟล์ใน `nuxt.config.ts`:
                <div class="bg-gray-800 p-4 rounded-lg">
                  <pre class="text-green-400">
export default defineNuxtConfig({
    css: ["@/assets/css/main.css"],
    postcss: {
        plugins: {
        tailwindcss: {},
        autoprefixer: {},
        },
    },
});
          </pre
                  >
                </div>
              </li>
            </ul>

            <!-- ตัวอย่างการใช้งาน Tailwind CSS -->
            <div class="mt-8">
              <h3 class="text-lg font-semibold border-b border-gray-600 pb-2">
                ตัวอย่างการใช้งาน Tailwind CSS:
              </h3>
              <p class="text-gray-300">
                เมื่อการติดตั้งเสร็จสิ้น สามารถเริ่มใช้งาน Tailwind CSS
                ได้ในไฟล์ `.vue` ตัวอย่างเช่น:
              </p>
              <div class="bg-gray-800 p-4 rounded-lg mt-4">
                <pre class="text-green-400">
&lt;template&gt;
&lt;div class="flex items-center justify-center h-screen bg-gray-800"&gt;
    &lt;h1 class="text-4xl font-bold text-green-400"&gt;สวัสดีจาก Tailwind CSS!&lt;/h1&gt;
&lt;/div&gt;
&lt;/template&gt;
        </pre
                >
              </div>
            </div>

            <!-- หมายเหตุเพิ่มเติม -->
            <div class="mt-8">
              <p class="text-sm text-gray-400">
                หมายเหตุ: สามารถปรับแต่ง Tailwind CSS เพิ่มเติมได้ในไฟล์
                <code class="text-green-400">tailwind.config.js</code>
                เช่น การเพิ่มสีหรือฟอนต์ใหม่ในส่วน
                <code class="text-green-400">theme.extend</code> เป็นต้น
              </p>
            </div>
          </div>
        </div>

        <!-- section 4 -->
        <div
          v-if="selectedMenu.id == 4"
          class="p-6 bg-gray-900 text-gray-200 rounded-lg shadow-md mt-1 max-h-[550px] overflow-x-auto"
        >
          <div class="space-y-6">
            <!-- คำอธิบาย -->
            <p class="text-lg">
              App Page และ Layout ใน Nuxt 3
              เป็นสิ่งสำคัญที่ช่วยให้การจัดการโครงสร้างแอปเป็นระเบียบและยืดหยุ่นมากขึ้น
            </p>

            <!-- หัวข้อย่อย -->
            <div>
              <h2
                class="text-lg font-bold border-l-4 border-blue-400 pl-4 mb-4"
              >
                app.vue
              </h2>
              <ul class="space-y-4 list-disc list-inside text-md">
                <li>
                  ในไฟล์
                  <span class="text-yellow-300">app.vue</span>
                  ใช้โครงสร้างพื้นฐานดังนี้:
                  <pre class="bg-gray-800 text-white rounded p-2 mt-2">
&lt;template&gt;
  &lt;NuxtLayout&gt;
    &lt;NuxtPage /&gt;
  &lt;/NuxtLayout&gt;
&lt;/template&gt;
          </pre
                  >
                  <!-- โดย `<NuxtLayout>` และ `<NuxtPage>` ช่วยให้จัดการเลย์เอาท์และเพจได้ง่าย -->
                </li>
              </ul>
            </div>

            <div>
              <h2
                class="text-lg font-bold border-l-4 border-blue-400 pl-4 mb-4"
              >
                การสร้าง Layout
              </h2>
              <ul class="space-y-4 list-disc list-inside text-md">
                <li>
                  สร้างโฟลเดอร์
                  <span class="text-yellow-300">`layouts`</span> และเพิ่มไฟล์
                  `default.vue`:
                  <pre class="bg-gray-800 text-white rounded p-2 mt-2">
&lt;template&gt;
  &lt;div&gt;
    &lt;header&gt;Header&lt;/header&gt;
  &lt;slot /&gt;
    &lt;footer&gt;Footer&lt;/footer&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;style&gt;
/* เพิ่มสไตล์ตามต้องการ */
&lt;/style&gt;
          </pre
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- section 5 -->
        <div
          v-if="selectedMenu.id == 5"
          class="p-6 bg-gray-900 text-gray-200 rounded-lg shadow-md mt-1 max-h-[550px] overflow-x-auto"
        >
          <div class="space-y-6">
            <!-- คำอธิบาย -->
            <p class="text-lg">
              ใน Nuxt 3 การใช้ Component ช่วยเพิ่มการจัดการโค้ดให้ง่ายขึ้น
              โดยแบ่งโครงสร้างออกเป็นส่วน ๆ และนำกลับมาใช้ซ้ำได้ในหลายหน้า
            </p>

            <!-- หัวข้อย่อย -->
            <div>
              <h2
                class="text-lg font-bold border-l-4 border-green-400 pl-4 mb-4"
              >
                สร้าง Component
              </h2>
              <ul class="space-y-4 list-disc list-inside text-md">
                <li>
                  สร้างโฟลเดอร์
                  <span class="text-yellow-300">`components`</span>
                  และเพิ่มไฟล์ เช่น `MyButton.vue`:
                  <pre class="bg-gray-800 text-white rounded p-2 mt-2">
&lt;template&gt;
  &lt;button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"&gt;
  &lt;/button&gt;
&lt;/template&gt;

&lt;script setup&gt;
// สามารถเพิ่ม Props หรือการตั้งค่าต่างๆ ได้
&lt;/script&gt;

&lt;style scoped&gt;
button {
  transition: background-color 0.3s ease;
}
&lt;/style&gt;
          </pre
                  >
                </li>
              </ul>
            </div>

            <div>
              <h2
                class="text-lg font-bold border-l-4 border-green-400 pl-4 mb-4"
              >
                การนำ Component ไปใช้
              </h2>
              <p class="text-md">
                เมื่อสร้าง Component เสร็จแล้ว สามารถนำไปใช้ในหน้าเพจหรือ Layout
                ได้เลย ตัวอย่าง:
              </p>
              <pre class="bg-gray-800 text-white rounded p-2 mt-2">
&lt;template&gt;
  &lt;div&gt;
    &lt;h1&gt;หน้าแสดงปุ่ม&lt;/h1&gt;
    &lt;MyButton&gt;คลิกฉัน!&lt;/MyButton&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import MyButton from '~/components/MyButton.vue';
&lt;/script&gt;
      </pre
              >
            </div>

            <div>
              <h2
                class="text-lg font-bold border-l-4 border-green-400 pl-4 mb-4"
              >
                การทำ Component แบบ Global
              </h2>
              <p class="text-md">
                หากต้องการให้ Component ใช้งานได้โดยไม่ต้อง Import ทุกครั้ง
                ให้เพิ่มไฟล์ใน
                <span class="text-yellow-300">`components`</span> แล้ว Nuxt
                จะโหลดให้โดยอัตโนมัติ เช่น:
              </p>
              <ul class="space-y-2 list-disc list-inside text-md">
                <li>
                  ไฟล์ `components/Header.vue` สามารถใช้งานได้เลยใน template:
                  <pre class="bg-gray-800 text-white rounded p-2 mt-2">
&lt;template&gt;
  &lt;Header /&gt;
&lt;/template&gt;
          </pre
                  >
                </li>
              </ul>
            </div>

            <div>
              <h2
                class="text-lg font-bold border-l-4 border-green-400 pl-4 mb-4"
              >
                การจัดการ Props ใน Component
              </h2>
              <p class="text-md">
                ใช้ Props เพื่อส่งข้อมูลไปยัง Component ตัวอย่างการเพิ่ม Props:
              </p>
              <pre class="bg-gray-800 text-white rounded p-2 mt-2">
&lt;template&gt;
  &lt;button :class="buttonClass"&gt; label &lt;/button&gt;
&lt;/template&gt;

&lt;script setup&gt;
defineProps({
  label: {
    type: String,
    required: true
  },
  buttonClass: {
    type: String,
    default: 'px-4 py-2 bg-blue-500 text-white rounded'
  }
});
&lt;/script&gt;
      </pre
              >
            </div>
          </div>
        </div>

        <!-- section 6 -->
        <div
          v-if="selectedMenu.id == 6"
          class="p-6 bg-gray-900 text-gray-200 rounded-lg shadow-md mt-1 max-h-[550px] overflow-x-auto"
        >
          <div class="space-y-6">
            <!-- คำอธิบาย -->
            <p class="text-lg">
              การจัดการ State ด้วย Pinia
              ช่วยให้โยมสามารถจัดการข้อมูลที่ใช้ร่วมกันระหว่าง Component
              อย่างมีประสิทธิภาพใน Nuxt 3
            </p>

            <!-- หัวข้อย่อย -->
            <div>
              <h2
                class="text-lg font-bold border-l-4 border-purple-400 pl-4 mb-4"
              >
                ติดตั้ง Pinia
              </h2>
              <p class="text-md">
                เริ่มต้นด้วยการติดตั้ง Pinia ในโปรเจค Nuxt 3:
              </p>
              <pre class="bg-gray-800 text-white rounded p-2 mt-2">
# ใช้ Yarn
yarn add pinia
      </pre
              >
              <p class="text-md">
                จากนั้นเพิ่ม Pinia ไปที่ไฟล์ `nuxt.config.ts`:
              </p>
              <pre class="bg-gray-800 text-white rounded p-2 mt-2">
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
});
      </pre
              >
            </div>

            <div>
              <h2
                class="text-lg font-bold border-l-4 border-purple-400 pl-4 mb-4"
              >
                การสร้าง Store
              </h2>
              <p class="text-md">
                สร้างโฟลเดอร์
                <span class="text-yellow-300">`stores`</span> และไฟล์ Store เช่น
                `counter.ts`:
              </p>
              <pre class="bg-gray-800 text-white rounded p-2 mt-2">
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
  },
});
      </pre
              >
            </div>

            <div>
              <h2
                class="text-lg font-bold border-l-4 border-purple-400 pl-4 mb-4"
              >
                การใช้งาน Store ใน Component
              </h2>
              <p class="text-md">ใช้ Store ที่สร้างใน Component ดังนี้:</p>
              <pre class="bg-gray-800 text-white rounded p-2 mt-2">
&lt;template&gt;
  &lt;div&gt;
    &lt;p&gt;Count: counter.count &lt;/p&gt;
    &lt;button @click="counter.increment"&gt;+ เพิ่ม&lt;/button&gt;
    &lt;button @click="counter.decrement"&gt;- ลด&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { useCounterStore } from '~/stores/counter';

const counter = useCounterStore();
&lt;/script&gt;
      </pre
              >
            </div>

            <div>
              <h2
                class="text-lg font-bold border-l-4 border-purple-400 pl-4 mb-4"
              >
                ตัวอย่างเพิ่มเติม: ใช้ Getter ใน Store
              </h2>
              <p class="text-md">เพิ่ม Getter สำหรับการคำนวณข้อมูลใน Store:</p>
              <pre class="bg-gray-800 text-white rounded p-2 mt-2">
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
});
      </pre
              >
              <p class="text-md">ใช้ Getter ใน Component:</p>
              <pre class="bg-gray-800 text-white rounded p-2 mt-2">
&lt;p&gt;Double Count:  counter.doubleCount &lt;/p&gt;
      </pre
              >
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
  { id: 0, name: "ทำควิชเล่นๆ นะ ฮาฟฟู่วววว", content: "ฮิฮิ" },
  { id: 1, name: "บทเรียนที่ 1", content: "nuxt.js คืออะไร" },
  { id: 2, name: "บทเรียนที่ 2", content: "nuxt 3" },
  { id: 3, name: "บทเรียนที่ 3", content: "tailwind" },
  { id: 4, name: "บทเรียนที่ 4", content: "layout" },
  { id: 5, name: "บทเรียนที่ 5", content: "component" },
  { id: 6, name: "บทเรียนที่ 6", content: "component" },
];

// เมนูที่ถูกเลือก
const selectedMenu = ref(menus[0]);

// ฟังก์ชันเลือกเมนู
const selectMenu = (menu: (typeof menus)[0]) => {
  selectedMenu.value = menu;
};





// into

const questions = reactive([
  {
    question: "JavaScript ใช้ Loop ใดในการวนซ้ำ Array?",
    options: ["for", "while", "forEach", "ทั้งหมดถูกต้อง"],
    correct: "ทั้งหมดถูกต้อง",
    selected: null,
    isCorrect: false,
  },
  {
    question: "ใน Nuxt 3 ไฟล์ใดที่ใช้กำหนด Layout?",
    options: ["app.vue", "nuxt.config.ts", "layouts/default.vue", "pages/index.vue"],
    correct: "layouts/default.vue",
    selected: null,
    isCorrect: false,
  },
  {
    question: "Interface ใน TypeScript ใช้สำหรับอะไร?",
    options: [
      "กำหนดรูปแบบของข้อมูล",
      "ใช้แทน Object",
      "จัดการ DOM",
      "สร้างฟังก์ชัน",
    ],
    correct: "กำหนดรูปแบบของข้อมูล",
    selected: null,
    isCorrect: false,
  },
  {
    question: "JavaScript ใช้คำสั่งใดเพื่อวนซ้ำ Object?",
    options: ["for-in", "for-of", "forEach", "while"],
    correct: "for-in",
    selected: null,
    isCorrect: false,
  },
  {
    question: "Ref ใน Vue 3 ใช้ทำอะไร?",
    options: [
      "สร้าง Reactive Variable",
      "จัดการ Event",
      "เชื่อมต่อกับ DOM",
      "ทั้งหมดถูกต้อง",
    ],
    correct: "ทั้งหมดถูกต้อง",
    selected: null,
    isCorrect: false,
  },
  {
    question: "Nuxt 3 ใช้คำสั่งใดเพื่อดึง Query Parameter?",
    options: ["useRoute", "useQuery", "useParams", "useFetch"],
    correct: "useRoute",
    selected: null,
    isCorrect: false,
  },
  {
    question: "คำสั่ง JavaScript ใดที่ใช้สำหรับทำให้คำสั่ง Async ทำงานได้ง่ายขึ้น?",
    options: ["Promise", "await", "async/await", "setTimeout"],
    correct: "async/await",
    selected: null,
    isCorrect: false,
  },
  {
    question: "คำสั่งใดใน TypeScript ใช้กำหนดประเภทของตัวแปร?",
    options: ["let", "const", "type", "interface"],
    correct: "type",
    selected: null,
    isCorrect: false,
  },
  {
    question: "ใน Nuxt 3, Middleware ใช้สำหรับอะไร?",
    options: [
      "จัดการ Routing",
      "ตรวจสอบการเข้าถึงเพจ",
      "ดึงข้อมูลจาก API",
      "ทั้งหมดถูกต้อง",
    ],
    correct: "ตรวจสอบการเข้าถึงเพจ",
    selected: null,
    isCorrect: false,
  },
  {
    question: "JavaScript มีวิธีการเรียกใช้ฟังก์ชันใด?",
    options: ["Call", "Apply", "Bind", "ทั้งหมดถูกต้อง"],
    correct: "ทั้งหมดถูกต้อง",
    selected: null,
    isCorrect: false,
  },
]);


const score = ref(0);
const isQuizComplete = ref(false);

function submitQuiz() {
  score.value = 0;

  questions.forEach((question :any) => {
    question.isCorrect = question.selected === question.correct;
    if (question.isCorrect) score.value++;
  });

  isQuizComplete.value = true;
}
</script>

<style scoped></style>
