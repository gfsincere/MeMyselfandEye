# Product Context: MeMyselfandEye

## Why This Exists
Greg completed the AWS Cloud Resume Challenge using Django/Docker/AWS and wanted to evolve it into a proper personal site with more features — a gallery for his photography, a blog, and a projects showcase — using modern frontend frameworks.

## Design Philosophy
Greg's design preferences are minimalistic and intentional:
- **Clean black-and-white** aesthetic with burnt orange (#bd5d38) accent for links
- **Manrope** font throughout — modern, clean sans-serif
- **Fixed side navigation** with circular profile image, collapsing to top bar on mobile
- **Gallery**: alternating left-right image/description layout with scroll-reveal animations, 3px solid black borders, box shadows
- **Content-first**: no unnecessary decoration, generous whitespace, readable line heights
- **Responsive**: mobile-first breakpoints at 576px, 768px, 992px

## User Experience
- Side nav always visible on desktop, toggler on mobile
- Gallery images clickable for lightbox view with keyboard navigation (arrows, escape)
- Blog editor with markdown toolbar (bold, italic, heading, list, link, code) and live preview
- Clean route structure: `/`, `/resume`, `/gallery`, `/blog`, `/projects`, `/about`, `/contact`

## Target Audience
Potential employers, professional contacts, and anyone interested in Greg's security work and photography.

## Content
- **Resume**: Real professional history — CISSP, InfoSec director/consultant roles, Marines intelligence background
- **Photos**: NZ and Australia photography (drone aerials, street, landscape) — Cape Palliser, Bondi Beach, Wellington, Island Bay, etc.
- **About**: The original resume challenge writeup (authentic voice, Greg's journey learning frontend)
- **Contact**: hello@gregoriethomas.com, LinkedIn (linkedin.com/in/gregoriethomas)
