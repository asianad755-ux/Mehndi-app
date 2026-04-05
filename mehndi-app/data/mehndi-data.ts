export interface MehndiDesign {
  id: string;
  image: any;
}

export interface MehndiCategory {
  id: string;
  name: string;
  thumbnail: any;
  designs: MehndiDesign[];
}

const img1 = require('@/assets/images/d-hand-1.png');
const img2 = require('@/assets/images/d-hand-2.png');
const catHand = require('@/assets/images/cat-hand.png');
const catBackhand = require('@/assets/images/cat-backhand.png');
const catArm = require('@/assets/images/cat-arm.png');
const catFoot = require('@/assets/images/cat-foot.png');
const catBridal = require('@/assets/images/cat-bridal.png');
const catGoltikki = require('@/assets/images/cat-goltikki.png');
const catFinger = require('@/assets/images/cat-finger.png');
const catKids = require('@/assets/images/cat-kids.png');

export const CATEGORIES: MehndiCategory[] = [
  {
    id: 'hand',
    name: 'Hand',
    thumbnail: catHand,
    designs: [
      { id: 'h1', image: img1 },
      { id: 'h2', image: img2 },
      { id: 'h3', image: img1 },
      { id: 'h4', image: img2 },
      { id: 'h5', image: img1 },
      { id: 'h6', image: img2 },
    ],
  },
  {
    id: 'backhand',
    name: 'Back Hand',
    thumbnail: catBackhand,
    designs: [
      { id: 'bh1', image: img2 },
      { id: 'bh2', image: img1 },
      { id: 'bh3', image: img2 },
      { id: 'bh4', image: img1 },
    ],
  },
  {
    id: 'arm',
    name: 'Arm',
    thumbnail: catArm,
    designs: [
      { id: 'a1', image: img1 },
      { id: 'a2', image: img2 },
      { id: 'a3', image: img1 },
      { id: 'a4', image: img2 },
    ],
  },
  {
    id: 'foot',
    name: 'Foot',
    thumbnail: catFoot,
    designs: [
      { id: 'f1', image: img2 },
      { id: 'f2', image: img1 },
      { id: 'f3', image: img2 },
      { id: 'f4', image: img1 },
    ],
  },
  {
    id: 'bridal',
    name: 'Bridal',
    thumbnail: catBridal,
    designs: [
      { id: 'br1', image: img1 },
      { id: 'br2', image: img2 },
      { id: 'br3', image: img1 },
      { id: 'br4', image: img2 },
      { id: 'br5', image: img1 },
      { id: 'br6', image: img2 },
    ],
  },
  {
    id: 'goltikki',
    name: 'Gol Tikki',
    thumbnail: catGoltikki,
    designs: [
      { id: 'gt1', image: img1 },
      { id: 'gt2', image: img2 },
      { id: 'gt3', image: img1 },
      { id: 'gt4', image: img2 },
    ],
  },
  {
    id: 'finger',
    name: 'Finger',
    thumbnail: catFinger,
    designs: [
      { id: 'fi1', image: img2 },
      { id: 'fi2', image: img1 },
      { id: 'fi3', image: img2 },
      { id: 'fi4', image: img1 },
    ],
  },
  {
    id: 'kids',
    name: 'Kids',
    thumbnail: catKids,
    designs: [
      { id: 'k1', image: img1 },
      { id: 'k2', image: img2 },
      { id: 'k3', image: img1 },
      { id: 'k4', image: img2 },
    ],
  },
];
