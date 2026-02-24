import React from 'react'
import { applyVueInReact } from 'veaury'
import PhotoGalleryVue from '../components/vue/PhotoGallery.vue'

const PhotoGallery = applyVueInReact(PhotoGalleryVue)

const photos = [
  { src: 'https://picsum.photos/id/1015/1200/800', caption: 'Coastline sample photo' },
  { src: 'https://picsum.photos/id/1035/1200/800', caption: 'Beach sample photo' },
  { src: 'https://picsum.photos/id/1025/1200/800', caption: 'Street sample photo' },
  { src: 'https://picsum.photos/id/1043/1200/800', caption: 'Landscape sample photo' },
  { src: 'https://picsum.photos/id/1003/1200/800', caption: 'Harbor sample photo' },
  { src: 'https://picsum.photos/id/1059/1200/800', caption: 'Mountain sample photo' },
  { src: 'https://picsum.photos/id/1069/1200/800', caption: 'City sample photo' },
  { src: 'https://picsum.photos/id/1074/1200/800', caption: 'Sunset sample photo' },
  { src: 'https://picsum.photos/id/1084/1200/800', caption: 'Nature sample photo' },
  { src: 'https://picsum.photos/id/1081/1200/800', caption: 'Road sample photo' },
  { src: 'https://picsum.photos/id/1049/1200/800', caption: 'Ocean sample photo' },
  { src: 'https://picsum.photos/id/1070/1200/800', caption: 'Evening sample photo' },
]

export default function GalleryPage() {
  return (
    <section className="gallery-page">
      <h1 className="gallery-header">Photo Gallery</h1>
      <PhotoGallery photos={photos} />
    </section>
  )
}
