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
          <div class="space-y-6  pr-4">
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// รายการเมนู
const menus = [
  { id: 1, name: "บทเรียนที่ 1", content: "nuxt.js คืออะไร" },
  { id: 2, name: "บทเรียนที่ 2", content: "nuxt 3" },
  { id: 3, name: "บทเรียนที่ 3", content: "tailwind" },
  { id: 4, name: "บทเรียนที่ 4", content: "ยังไม่คิดดดดดด" },
];

// เมนูที่ถูกเลือก
const selectedMenu = ref(menus[0]);

// ฟังก์ชันเลือกเมนู
const selectMenu = (menu: (typeof menus)[0]) => {
  selectedMenu.value = menu;
};
</script>

<style scoped></style>
