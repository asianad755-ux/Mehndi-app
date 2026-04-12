export type SkinTone = 'fair' | 'wheatish' | 'dusky' | 'deep';

export interface MehndiDesign {
  id: string;
  image: any;
  skinTone: SkinTone;
  style: string;
}


export interface MehndiCategory {
  id: string;
  name: string;
  thumbnail: any;
  section: 'body' | 'occasion';
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

function makeDesigns(prefix: string, count = 8): MehndiDesign[] {
  const tones: SkinTone[] = ['fair', 'wheatish', 'dusky', 'deep'];
  const styles = [
    'Mandala Floral', 'Arabic Lattice', 'Paisley Net', 'Geometric Grid',
    'Vine Bridal', 'Peacock Motif', 'Rose Cluster', 'Jaal Pattern',
  ];
  return Array.from({ length: count }, (_, i) => ({
    id: `${prefix}${i + 1}`,
    image: i % 2 === 0 ? img1 : img2,
    skinTone: tones[i % 4],
    style: styles[i % styles.length],
  }));
}

export const CATEGORIES: MehndiCategory[] = [
  {
    id: 'hand',
    name: 'Hand',
    thumbnail: catHand,
    section: 'body',
    designs: makeDesigns('h', 8),
  },
  {
    id: 'backhand',
    name: 'Back Hand',
    thumbnail: catBackhand,
    section: 'body',
    designs: makeDesigns('bh', 8),
  },
  {
    id: 'arm',
    name: 'Arm',
    thumbnail: catArm,
    section: 'body',
    designs: makeDesigns('a', 8),
  },
  {
    id: 'foot',
    name: 'Foot',
    thumbnail: catFoot,
    section: 'body',
    designs: makeDesigns('f', 8),
  },
  {
    id: 'finger',
    name: 'Finger',
    thumbnail: catFinger,
    section: 'body',
    designs: makeDesigns('fi', 8),
  },
  {
    id: 'kids',
    name: 'Kids',
    thumbnail: catKids,
    section: 'body',
    designs: makeDesigns('k', 8),
  },
  {
    id: 'bridal',
    name: 'Bridal',
    thumbnail: catBridal,
    section: 'occasion',
    designs: makeDesigns('br', 8),
  },
  {
    id: 'goltikki',
    name: 'Gol Tikki',
    thumbnail: catGoltikki,
    section: 'occasion',
    designs: makeDesigns('gt', 8),
  },
  {
    id: 'barat',
    name: 'Barat',
    thumbnail: catBridal,
    section: 'occasion',
    designs: makeDesigns('bt', 8),
  },
  {
    id: 'walima',
    name: 'Walima',
    thumbnail: catArm,
    section: 'occasion',
    designs: makeDesigns('wl', 8),
  },
  {
    id: 'chandrat',
    name: 'Chand Raat',
    thumbnail: catHand,
    section: 'occasion',
    designs: makeDesigns('cr', 8),
  },
  {
    id: 'eid',
    name: 'Eid',
    thumbnail: catGoltikki,
    section: 'occasion',
    designs: makeDesigns('ei', 8),
  },
  {
    id: 'karwachauth',
    name: 'Karwa Chauth',
    thumbnail: catFoot,
    section: 'occasion',
    designs: makeDesigns('kc', 8),
  },
  {
    id: 'anniversary',
    name: 'Anniversary',
    thumbnail: catBackhand,
    section: 'occasion',
    designs: makeDesigns('an', 8),
  },
];

export const BODY_CATS = CATEGORIES.filter((c) => c.section === 'body');
export const OCCASION_CATS = CATEGORIES.filter((c) => c.section === 'occasion');

export const SKIN_TONE_LABELS: Record<SkinTone, string> = {
  fair: 'Fair',
  wheatish: 'Wheatish',
  dusky: 'Dusky',
  deep: 'Deep',
};

export const SKIN_TONE_COLORS: Record<SkinTone, string> = {
  fair: '#F5D5B0',
  wheatish: '#D4A876',
  dusky: '#A0714F',
  deep: '#6B4226',
};
