<template>
  <div class="gallery-container">
    <div
      v-for="(photo, index) in photos"
      :key="index"
      :class="['gallery-item', { show: visibleItems.has(index) }]"
      :ref="el => setItemRef(el, index)"
    >
      <img
        :src="photo.src"
        :alt="photo.caption"
        loading="lazy"
        @click="openLightbox(index)"
        @error="handleImgError($event, photo)"
      />
      <div class="description-gallery">
        <hr />
        <p>{{ photo.caption }}</p>
      </div>
    </div>

    <div v-if="lightboxIndex !== null" class="lightbox" @click="closeLightbox">
      <button class="lightbox-close" @click.stop="closeLightbox">&times;</button>
      <button class="lightbox-prev" @click.stop="prevPhoto">&lsaquo;</button>
      <img
        :src="photos[lightboxIndex].src"
        :alt="photos[lightboxIndex].caption"
        class="lightbox-img"
        @click.stop
      />
      <p class="lightbox-caption">{{ photos[lightboxIndex].caption }}</p>
      <button class="lightbox-next" @click.stop="nextPhoto">&rsaquo;</button>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

export default {
  name: 'PhotoGallery',
  props: {
    photos: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const visibleItems = reactive(new Set())
    const lightboxIndex = ref(null)
    const itemRefs = {}
    let observer = null

    function setItemRef(el, index) {
      if (el) itemRefs[index] = el
    }

    function openLightbox(index) {
      lightboxIndex.value = index
      document.body.style.overflow = 'hidden'
    }

    function closeLightbox() {
      lightboxIndex.value = null
      document.body.style.overflow = ''
    }

    function nextPhoto() {
      if (lightboxIndex.value < props.photos.length - 1) {
        lightboxIndex.value++
      } else {
        lightboxIndex.value = 0
      }
    }

    function prevPhoto() {
      if (lightboxIndex.value > 0) {
        lightboxIndex.value--
      } else {
        lightboxIndex.value = props.photos.length - 1
      }
    }

    const placeholderSvg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23dee2e6'/%3E%3Ctext x='300' y='190' text-anchor='middle' fill='%236c757d' font-family='sans-serif' font-size='18'%3EPhoto%20unavailable%3C/text%3E%3Ctext x='300' y='220' text-anchor='middle' fill='%23adb5bd' font-family='sans-serif' font-size='14'%3EAdd%20images%20to%20public/images/%3C/text%3E%3C/svg%3E`

    function handleImgError(event, photo) {
      event.target.src = placeholderSvg
    }

    function handleKeydown(e) {
      if (lightboxIndex.value === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextPhoto()
      if (e.key === 'ArrowLeft') prevPhoto()
    }

    onMounted(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const idx = parseInt(entry.target.dataset.idx, 10)
            if (entry.isIntersecting) {
              visibleItems.add(idx)
            }
          })
        },
        { threshold: 0.15 }
      )

      Object.entries(itemRefs).forEach(([idx, el]) => {
        el.dataset.idx = idx
        observer.observe(el)
      })

      document.addEventListener('keydown', handleKeydown)
    })

    onUnmounted(() => {
      if (observer) observer.disconnect()
      document.removeEventListener('keydown', handleKeydown)
      document.body.style.overflow = ''
    })

    return {
      visibleItems,
      lightboxIndex,
      setItemRef,
      openLightbox,
      closeLightbox,
      nextPhoto,
      prevPhoto,
      handleImgError,
    }
  },
}
</script>

<style scoped>
.gallery-container {
  padding: 60px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.gallery-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;
  max-width: 100%;
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.gallery-item.show {
  opacity: 1;
  transform: translateY(0);
}

.gallery-item:nth-child(odd) {
  flex-direction: row;
}

.gallery-item:nth-child(even) {
  flex-direction: row-reverse;
}

.gallery-item img {
  max-width: 600px;
  max-height: 600px;
  width: 60%;
  height: auto;
  border: 3px solid black;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  object-fit: contain;
  flex-shrink: 0;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.gallery-item img:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
}

.description-gallery {
  flex: 1;
  max-width: 300px;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
}

.description-gallery hr {
  border: none;
  border-top: 2px solid black;
  margin-bottom: 10px;
}

.description-gallery p {
  font-size: 16px;
  line-height: 1.5;
  font-family: 'Manrope', sans-serif;
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  flex-direction: column;
}

.lightbox-img {
  max-width: 90vw;
  max-height: 80vh;
  object-fit: contain;
  border: none !important;
  box-shadow: none !important;
}

.lightbox-caption {
  color: #ccc;
  font-size: 1rem;
  margin-top: 16px;
  font-family: 'Manrope', sans-serif;
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 3rem;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  line-height: 1;
}

.lightbox-prev,
.lightbox-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 3rem;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  padding: 20px;
}

.lightbox-prev { left: 20px; }
.lightbox-next { right: 20px; }

@media (max-width: 768px) {
  .gallery-item {
    flex-direction: column !important;
  }

  .gallery-item img {
    max-width: 100%;
    width: 100%;
    margin-bottom: 20px;
  }

  .description-gallery {
    max-width: 100%;
    padding-left: 0;
  }
}
</style>
