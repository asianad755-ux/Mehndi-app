import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  CATEGORIES,
  SKIN_TONE_COLORS,
  SKIN_TONE_LABELS,
  SkinTone,
} from '@/data/mehndi-data';

const { width, height } = Dimensions.get('window');

const COLORS = {
  bg: '#080808',
  header: 'rgba(8,8,8,0.9)',
  gold: '#C9A84C',
  goldLight: '#E8C96A',
  white: '#FFFFFF',
  white70: 'rgba(255,255,255,0.7)',
  white40: 'rgba(255,255,255,0.4)',
  dark80: 'rgba(0,0,0,0.8)',
  border: 'rgba(201,168,76,0.3)',
  cardBg: '#141414',
};

const STYLE_INFO: Record<string, string> = {
  'Mandala Floral': 'Circular symmetry inspired by Hindu spiritual art. Radiating floral patterns with intricate petal work and fine dot detailing.',
  'Arabic Lattice': 'Bold flowing vines and large floral motifs with elegant negative space. A hallmark of Arabic mehndi tradition.',
  'Paisley Net': 'Dense net-like pattern with paisley (bel) motifs woven throughout. Classic South Asian bridal style.',
  'Geometric Grid': 'Modern angular approach with precise symmetrical grids, triangles, and clean lines for a contemporary look.',
  'Vine Bridal': 'Delicate trailing vines with small leaves and buds, perfect for a romantic bridal aesthetic.',
  'Peacock Motif': 'Iconic peacock with spread tail feathers — a symbol of love and beauty in Indian culture.',
  'Rose Cluster': 'Realistic rose blooms with leaves and stems, blending Western florals with Eastern detail.',
  'Jaal Pattern': 'Fine mesh pattern covering the entire hand with tiny repeated motifs — the epitome of bridal density.',
};

export default function DesignScreen() {
  const { catId, designId, catName } = useLocalSearchParams<{
    catId: string;
    designId: string;
    catName: string;
  }>();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  const category = CATEGORIES.find((c) => c.id === catId);
  const design = category?.designs.find((d) => d.id === designId);

  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsFavorite((v) => !v);
  };

  const handleShare = async () => {
    try {
      await Share.share({ message: `Check out this beautiful ${design?.style} mehndi design from the ${catName} collection!` });
    } catch {}
  };

  if (!design || !category) {
    return (
      <View style={[styles.root, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: COLORS.white }}>Design not found</Text>
      </View>
    );
  }

  const toneColor = SKIN_TONE_COLORS[design.skinTone as SkinTone];
  const toneLabel = SKIN_TONE_LABELS[design.skinTone as SkinTone];
  const description = STYLE_INFO[design.style] ?? 'An exquisite hand-crafted mehndi design with intricate detailing.';

  return (
    <View style={[styles.root, { paddingBottom: botPad }]}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View style={styles.imageContainer}>
          <Image source={design.image} style={styles.heroImage} resizeMode="cover" />
          <View style={styles.imageGradientTop} />
          <View style={[styles.topBar, { paddingTop: topPad + 8 }]}>
            <Pressable onPress={() => router.back()} style={styles.iconBtn}>
              <Ionicons name="chevron-back" size={22} color={COLORS.white} />
            </Pressable>
            <View style={styles.topBarRight}>
              <Pressable onPress={handleShare} style={styles.iconBtn}>
                <Ionicons name="share-outline" size={21} color={COLORS.white} />
              </Pressable>
              <Pressable onPress={toggleFavorite} style={styles.iconBtn}>
                <Ionicons
                  name={isFavorite ? 'heart' : 'heart-outline'}
                  size={22}
                  color={isFavorite ? COLORS.goldLight : COLORS.white}
                />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.badgeRow}>
            <View style={styles.categoryBadge}>
              <Ionicons name="bookmark" size={10} color={COLORS.gold} />
              <Text style={styles.categoryBadgeText}>{catName.toUpperCase()}</Text>
            </View>
            <View style={[styles.skinBadge, { borderColor: toneColor + '66' }]}>
              <View style={[styles.skinDot, { backgroundColor: toneColor }]} />
              <Text style={[styles.skinBadgeText, { color: toneColor }]}>{toneLabel} Skin</Text>
            </View>
          </View>

          <Text style={styles.designTitle}>{design.style}</Text>
          <View style={styles.goldDivider} />
          <Text style={styles.designDesc}>{description}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={16} color={COLORS.gold} />
              <Text style={styles.statLabel}>Duration</Text>
              <Text style={styles.statValue}>2–4 hrs</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="star-outline" size={16} color={COLORS.gold} />
              <Text style={styles.statLabel}>Difficulty</Text>
              <Text style={styles.statValue}>Expert</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="color-palette-outline" size={16} color={COLORS.gold} />
              <Text style={styles.statLabel}>Style</Text>
              <Text style={styles.statValue}>Bridal</Text>
            </View>
          </View>

          <View style={styles.tipsSection}>
            <Text style={styles.tipsTitle}>
              <Ionicons name="bulb-outline" size={13} color={COLORS.gold} /> Application Tips
            </Text>
            <Text style={styles.tipItem}>· Keep skin clean and dry before application</Text>
            <Text style={styles.tipItem}>· Apply lemon-sugar mix after drying for dark stain</Text>
            <Text style={styles.tipItem}>· Leave for 6–8 hours before washing</Text>
            <Text style={styles.tipItem}>· Avoid water for 24h after removal for best colour</Text>
          </View>

          <TouchableOpacity
            style={[styles.favoriteBtn, isFavorite && styles.favoriteBtnActive]}
            onPress={toggleFavorite}
            activeOpacity={0.85}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={18}
              color={isFavorite ? COLORS.bg : COLORS.gold}
            />
            <Text style={[styles.favoriteBtnText, isFavorite && styles.favoriteBtnTextActive]}>
              {isFavorite ? 'Saved to Favourites' : 'Save to Favourites'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  imageContainer: {
    width,
    height: height * 0.52,
    backgroundColor: '#111',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imageGradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  topBarRight: {
    flexDirection: 'row',
    gap: 4,
  },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCard: {
    backgroundColor: COLORS.bg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: 'rgba(201,168,76,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.3)',
  },
  categoryBadgeText: {
    color: COLORS.gold,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  skinBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
  },
  skinDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  skinBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  designTitle: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  goldDivider: {
    width: 40,
    height: 1.5,
    backgroundColor: COLORS.gold,
    marginBottom: 14,
    opacity: 0.7,
  },
  designDesc: {
    color: COLORS.white70,
    fontSize: 13,
    lineHeight: 21,
    letterSpacing: 0.2,
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#111',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
    marginVertical: 4,
  },
  statLabel: {
    color: COLORS.white40,
    fontSize: 10,
    letterSpacing: 0.5,
    marginTop: 2,
  },
  statValue: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
  tipsSection: {
    backgroundColor: 'rgba(201,168,76,0.06)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.18)',
    padding: 16,
    marginBottom: 24,
    gap: 6,
  },
  tipsTitle: {
    color: COLORS.goldLight,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  tipItem: {
    color: COLORS.white70,
    fontSize: 12,
    lineHeight: 19,
    letterSpacing: 0.2,
  },
  favoriteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: COLORS.gold,
    backgroundColor: 'transparent',
  },
  favoriteBtnActive: {
    backgroundColor: COLORS.goldLight,
    borderColor: COLORS.goldLight,
  },
  favoriteBtnText: {
    color: COLORS.gold,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  favoriteBtnTextActive: {
    color: COLORS.bg,
  },
});
