<template>
  <div class="flex justify-center items-center">
    <div class="w-[80%] h-screen flex">
      <div class="w-[300px] h-full">
        <div
          class="h-[50px] flex justify-start items-center pattern-isometric pattern-gray-100 pattern-bg-primary pattern-size-20 pattern-opacity-100 border rounded-lg border-primary"
        >
          <div class="px-[20px]">
            <h3 class="text-xl font-bold text-black uppercase">Dashboard</h3>
          </div>
        </div>
        <div class="h-[calc(100vh-50px)] py-[20px] font-bold uppercase">
          <div
            class="flex flex-col justify-between h-full px-[20px] space-y-[10px] pattern-isometric pattern-gray-100 pattern-bg-primary pattern-size-20 pattern-opacity-100 border rounded-lg border-primary"
          >
            <div class="flex flex-col justify-between p-4">
              <router-link
                to="/admin"
                class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800 transition duration-400 ease-in-out"
              >
                <svg
                  viewBox="0 0 1024 1024"
                  fill="#000000"
                  class="w-[25px] h-[25px] mr-2"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    class
                    <path
                      d="M53.6 1023.2c-6.4 0-12.8-2.4-17.6-8-4.8-4.8-7.2-11.2-6.4-18.4L80 222.4c0.8-12.8 11.2-22.4 24-22.4h211.2v-3.2c0-52.8 20.8-101.6 57.6-139.2C410.4 21.6 459.2 0.8 512 0.8c108 0 196.8 88 196.8 196.8 0 0.8-0.8 1.6-0.8 2.4v0.8H920c12.8 0 23.2 9.6 24 22.4l49.6 768.8c0.8 2.4 0.8 4 0.8 6.4-0.8 13.6-11.2 24.8-24.8 24.8H53.6z m25.6-48H944l-46.4-726.4H708v57.6h0.8c12.8 8.8 20 21.6 20 36 0 24.8-20 44.8-44.8 44.8s-44.8-20-44.8-44.8c0-14.4 7.2-27.2 20-36h0.8v-57.6H363.2v57.6h0.8c12.8 8.8 20 21.6 20 36 0 24.8-20 44.8-44.8 44.8-24.8 0-44.8-20-44.8-44.8 0-14.4 7.2-27.2 20-36h0.8v-57.6H125.6l-46.4 726.4zM512 49.6c-81.6 0-148.8 66.4-148.8 148.8v3.2h298.4l-0.8-1.6v-1.6c0-82.4-67.2-148.8-148.8-148.8z"
                      fill=""
                    ></path>
                  </g>
                </svg>
                Order
              </router-link>
              <router-link
                to="/admin/product"
                class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm rounded-md border-gray-200 hover:bg-gray-300 hover:text-gray-800 transition duration-400 ease-in-out"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-[25px] h-[25px] mr-2"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <line
                      x1="5"
                      y1="3"
                      x2="5"
                      y2="21"
                      stroke="#333333"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></line>
                    <line
                      x1="19"
                      y1="3"
                      x2="19"
                      y2="21"
                      stroke="#333333"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></line>
                    <line
                      x1="21"
                      y1="5"
                      x2="3"
                      y2="5"
                      stroke="#333333"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></line>
                    <line
                      x1="21"
                      y1="19"
                      x2="3"
                      y2="19"
                      stroke="#333333"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></line>
                  </g>
                </svg>
                Product
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full h-full">
        <div
          class="h-[50px] flex items-center shadow-sm px-[20px] w-full py-[10px] z-10 pattern-isometric pattern-gray-100 pattern-bg-primary pattern-size-20 pattern-opacity-100"
        ></div>
        <div class="h-[calc(100vh-50px)] p-[20px]">
          <div class="border border-primary rounded-lg p-[20px] h-full">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script></script>

<style></style>
