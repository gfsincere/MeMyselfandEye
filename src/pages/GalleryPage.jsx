import React from 'react'
import { applyVueInReact } from 'veaury'
import PhotoGalleryVue from '../components/vue/PhotoGallery.vue'

const PhotoGallery = applyVueInReact(PhotoGalleryVue)

const photos = [
  { src: '/images/DJI_0051.JPG', caption: 'Cape Palliser, New Zealand 2022' },
  { src: '/images/DSC03146.JPG', caption: 'Bondi Beach, Sydney, Australia, 2024' },
  { src: '/images/DSC04934.JPG', caption: 'Cuba Street, Wellington, New Zealand 2024' },
  { src: '/images/DJI_0055.JPG', caption: 'Cape Palliser, New Zealand 2022' },
  { src: '/images/DJI_0133.JPG', caption: 'Havelock, New Zealand 2023' },
  { src: '/images/DJI_0160.JPG', caption: 'Nelson, New Zealand 2023' },
  { src: '/images/DSC00980.JPG', caption: 'Island Bay, New Zealand 2023' },
  { src: '/images/DSC00997.JPG', caption: 'Island Bay, New Zealand, 2022' },
  { src: '/images/DSC01002.JPG', caption: 'Island Bay, New Zealand, 2022' },
  { src: '/images/DSC01034.JPG', caption: 'Red Rocks, New Zealand, 2022' },
  { src: '/images/DSC01003.JPG', caption: 'Island Bay, New Zealand, 2023' },
  { src: '/images/DSC03085.JPG', caption: 'Bondi Beach, Australia, 2024' },
]

export default function GalleryPage() {
  return (
    <section className="gallery-page">
      <h1 className="gallery-header">Photo Gallery</h1>
      <PhotoGallery photos={photos} />
    </section>
  )
}
