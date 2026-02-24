import React from 'react'
import { applyVueInReact } from 'veaury'
import PhotoGalleryVue from '../components/vue/PhotoGallery.vue'

const PhotoGallery = applyVueInReact(PhotoGalleryVue)

// Placeholder images for testing without local files. Replace with /images/*.JPG for production.
const photos = [
  { src: 'https://picsum.photos/600/600?random=1', caption: 'Cape Palliser, New Zealand 2022' },
  { src: 'https://picsum.photos/600/600?random=2', caption: 'Bondi Beach, Sydney, Australia, 2024' },
  { src: 'https://picsum.photos/600/600?random=3', caption: 'Cuba Street, Wellington, New Zealand 2024' },
  { src: 'https://picsum.photos/600/600?random=4', caption: 'Cape Palliser, New Zealand 2022' },
  { src: 'https://picsum.photos/600/600?random=5', caption: 'Havelock, New Zealand 2023' },
  { src: 'https://picsum.photos/600/600?random=6', caption: 'Nelson, New Zealand 2023' },
  { src: 'https://picsum.photos/600/600?random=7', caption: 'Island Bay, New Zealand 2023' },
  { src: 'https://picsum.photos/600/600?random=8', caption: 'Island Bay, New Zealand, 2022' },
  { src: 'https://picsum.photos/600/600?random=9', caption: 'Island Bay, New Zealand, 2022' },
  { src: 'https://picsum.photos/600/600?random=10', caption: 'Red Rocks, New Zealand, 2022' },
  { src: 'https://picsum.photos/600/600?random=11', caption: 'Island Bay, New Zealand, 2023' },
  { src: 'https://picsum.photos/600/600?random=12', caption: 'Bondi Beach, Australia, 2024' },
]

export default function GalleryPage() {
  return (
    <section className="gallery-page">
      <h1 className="gallery-header">Photo Gallery</h1>
      <PhotoGallery photos={photos} />
    </section>
  )
}
