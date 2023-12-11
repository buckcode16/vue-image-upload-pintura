<template>
  <div class="grid grid-cols-10">
    <div class="col-span-5">
      <img
        src="https://www.socialprintstudio.com/img/products/grid-poster/slider-new/grid-poster-8.jpg"
        alt=""
      />
    </div>
    <div class="flex justify-center items-center m-5 col-span-4">
      <div class="w-[300px]">
        <div class="flex justify-center mb-4">
          <button
            class="border-2 rounded-lg border-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-secondary hover:bg-secondary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            @click="uploadImages"
            :disabled="files.length === 0 || loading"
          >
            {{ loading ? 'Loading...' : 'Upload' }}
          </button>
        </div>
        <file-pond
          ref="pond"
          accepted-file-types="image/jpeg, image/png, image/jpg"
          allow-multiple="true"
          :imageEditorAfterWriteImage="handleImageEditorUpdate"
          :files="files"
          :imageEditor="myEditor"
          @init="handleFilePondInit"
          @updatefiles="handleFilePondUpdate"
        />
      </div>
    </div>
    <div class="col-span-1 flex flex-col justify-center animate-pulse">
      <img src="../assets/images/star.png" style="transform: rotate(150deg);" alt="" />
      <h1
        style="writing-mode: vertical-rl; transform: rotate(210deg);"
        class="text-4xl font-bold font-cbyg text-secondary"
      >
        We Appreciate Your <span class="underline"> Memory</span>
      </h1>
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
import { toRaw } from 'vue'
// Import store
import { useAuthStore } from '../store/auth'
import { useProductStore } from '../store/product'
const authStore = useAuthStore()
const productStore = useProductStore()
// Import Vue FilePond
import vueFilePond, { setOptions } from 'vue-filepond'
import FilePondPluginFilePoster from 'filepond-plugin-file-poster'
import FilePondPluginImageEditor from '@pqina/filepond-plugin-image-editor'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-file-poster/dist/filepond-plugin-file-poster.min.css'

// Import Pintura styles
import '@pqina/pintura/pintura.css'

// Import Pintura
import {
  // editor
  findNode,
  createDefaultImageReader,
  createDefaultImageWriter,
  locale_en_gb,

  // plugins
  setPlugins,
  plugin_crop,
  plugin_crop_locale_en_gb,
  plugin_filter,
  plugin_filter_defaults,
  plugin_filter_locale_en_gb,
  plugin_finetune,
  plugin_finetune_defaults,
  plugin_finetune_locale_en_gb,
  plugin_annotate,
  plugin_annotate_locale_en_gb,
  markup_editor_defaults,
  markup_editor_locale_en_gb,

  // filepond
  openEditor,
  processImage,
  createDefaultImageOrienter,
  legacyDataToImageState
} from '@pqina/pintura'

// import kodak_overlay from '../../src/assets/images/kodak-overlay.png'

setPlugins(plugin_crop, plugin_finetune, plugin_filter, plugin_annotate)
const router = useRouter()
// Create FilePond component
const FilePond = vueFilePond(FilePondPluginImageEditor, FilePondPluginFilePoster)

// setOptions({
//   filePosterMaxHeight: 100
//   server: {
//     url: 'http://localhost:8080',
//     process: '/print/tmp'
//   }
// })

export default {
  name: 'PinturaEditor',
  components: {
    FilePond
  },
  methods: {
    handleImageEditorUpdate(event) {
      const indexToUpdate = this.files.findIndex(
        (file) => file.lastModified === event.src.lastModified
      )
      this.files[indexToUpdate] = event.dest
    },
    handleFilePondUpdate(files) {
      // Update the local files array whenever FilePond updates
      this.files = files.map((file) => file.file)
    },
    handleFilePondInit: function () {
      console.log('FilePond has initialized')

      // example of instance method call on pond reference
      // this.$refs.pond.getFiles()
    },
    async uploadImages() {
      const formData = new FormData()

      for (const file of this.files) {
        // Create a canvas element to handle the image data
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        // Load the image file
        const image = new Image()
        const fileDataUrl = URL.createObjectURL(file)
        image.src = fileDataUrl

        // Wait for the image to load
        await new Promise((resolve) => {
          image.onload = () => {
            // Set canvas size to match image size
            canvas.width = image.width
            canvas.height = image.height

            // Draw the image on the canvas
            ctx.drawImage(image, 0, 0)

            // Load the overlay image
            const overlayImage = new Image()
            overlayImage.src = this.kodak_overlay

            // Wait for the overlay image to load
            overlayImage.onload = () => {
              // Draw the overlay image on top of the existing image
              ctx.drawImage(overlayImage, 0, 0, image.width, image.height)

              // Convert the canvas content back to a Blob
              canvas.toBlob((blob) => {
                // Append the modified file (Blob) to the FormData
                formData.append('images', blob, file.name)

                // Resolve the promise
                resolve()
              }, file.type)
            }
          }
        })

        // Revoke the object URL to free up resources
        URL.revokeObjectURL(fileDataUrl)
      }

      // Add additional form data or send an API request to persist the images
      this.loading = true
      try {
        formData.append('productId', this.product.id)
        const userId = authStore.user.id
        const response = await fetch(`http://localhost:8080/upload/${userId}`, {
          method: 'POST',
          body: formData
        })

        setTimeout(() => {
          this.loading = false
          this.router.push({ name: 'my-prints' })
        }, 2000)
        console.log('Images uploaded:', response)
      } catch (error) {
        console.error('Error uploading images:', error)
      }
    }
  },
  mounted() {
    this.product = productStore.product
    console.log(this.product)
    this.kodak_overlay = this.product.overlay
    console.log(this.kodak_overlay)
  },
  data() {
    return {
      myEditor: {
        // map legacy data objects to new imageState objects
        legacyDataToImageState: legacyDataToImageState,

        // used to create the editor, receives editor configuration, should return an editor instance
        createEditor: openEditor,

        // Required, used for reading the image data
        imageReader: [createDefaultImageReader],

        // optionally. can leave out when not generating a preview thumbnail and/or output image
        imageWriter: [
          createDefaultImageWriter,
          {
            postprocessImageData: (imageData) =>
              new Promise((resolve) => {
                // create a canvas element to handle the imageData
                const canvas = document.createElement('canvas')
                canvas.width = imageData.width
                canvas.height = imageData.height
                const ctx = canvas.getContext('2d')
                ctx.putImageData(imageData, 0, 0)

                // Load the overlay image
                const overlayImage = new Image()
                overlayImage.src = this.kodak_overlay

                // Wait for the overlay image to load
                overlayImage.onload = () => {
                  // Draw the overlay image on top of the existing image
                  ctx.drawImage(overlayImage, 0, 0, imageData.width, imageData.height)

                  // Resolve the promise with the modified imageData
                  resolve(ctx.getImageData(0, 0, canvas.width, canvas.height))
                }
              })
          }
        ],

        // used to generate poster images, runs an editor in the background
        imageProcessor: processImage,

        // editor options
        editorOptions: {
          utils: ['crop', 'finetune', 'filter', 'annotate'],
          imageOrienter: createDefaultImageOrienter(),
          ...plugin_finetune_defaults,
          ...plugin_filter_defaults,
          ...markup_editor_defaults,
          locale: {
            ...locale_en_gb,
            ...plugin_crop_locale_en_gb,
            ...plugin_finetune_locale_en_gb,
            ...plugin_filter_locale_en_gb,
            ...plugin_annotate_locale_en_gb,
            ...markup_editor_locale_en_gb
          },
          willRenderToolbar: (toolbar) => {
            // get the export button
            const exportButton = findNode('export', toolbar)

            // get a reference to the options
            const exportButtonOptions = exportButton[2]

            // show the label
            exportButtonOptions.hideLabel = false

            // // set the label
            // exportButtonOptions.label = 'Preview'

            // disable the icon
            exportButtonOptions.icon = false

            // return the toolbar for drawing
            return toolbar
          }
        }
      },
      // PROPERTIES
      result: undefined,
      kodak_overlay: '',
      files: [],
      router: useRouter(),
      loading: false,
      product: {}
    }
  }
}
</script>

<style>
/* bright / dark mode */
.pintura-editor {
  --color-background: 255, 255, 255;
  --color-foreground: 10, 10, 10;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
}

.font-cbyg {
  font-family: 'Covered By Your Grace', cursive;
}
</style>
