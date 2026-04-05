import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  CATEGORIES,
  MehndiDesign,
  SKIN_TONE_COLORS,
  SKIN_TONE_LABELS,
  SkinTone,
} from '@/data/mehndi-data';

const { width } = Dimensions.get('window');
const CARD_GAP = 10;
const H_PAD = 14;
const CARD_WIDTH = (width - H_PAD * 2 - CARD_GAP) / 2;
const CARD_HEIGHT = CARD_WIDTH * 1.3;

const COLORS = {
  bg: '#080808',
  header: '#0E0E0E',
  gold: '#C9A84C',
  goldLight: '#E8C96A',
  white: '#FFFFFF',
  white60: 'rgba(255,255,255,0.6)',
  border: 'rgba(201,168,76,0.3)',
  cardBg: '#141414',
  chipBg: '#1A1A1A',
  chipActive: 'rgba(201,168,76,0.18)',
};

const ALL_TONES: Array<'all' | SkinTone> = ['all', 'fair', 'wheatish', 'dusky', 'deep'];
const TONE_CHIP_LABELS: Record<string, string> = {
  all: 'All',
  fair: 'Fair',
  wheatish: 'Wheatish',
  dusky: 'Dusky',
  deep: 'Deep',
};

function SkinDot({ tone }: { tone: SkinTone }) {
  return (
    <View style={[styles.skinDot, { backgroundColor: SKIN_TONE_COLORS[tone] }]} />
  );
}

function DesignCard({
  design,
  isFavorite,
  onToggleFavorite,
  onPress,
}: {
  design: MehndiDesign;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onPress: () => void;
}) {
  return (
    <Pressable style={({ pressed }) => [styles.designCard, { opacity: pressed ? 0.9 : 1 }]} onPress={onPress}>
      <Image source={design.image} style={styles.designImage} resizeMode="cover" />
      <View style={styles.designOverlay} />
      <View style={styles.skinBadge}>
        <SkinDot tone={design.skinTone} />
        <Text style={styles.skinBadgeText}>{SKIN_TONE_LABELS[design.skinTone]}</Text>
      </View>
      <TouchableOpacity
        style={styles.heartBtn}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          onToggleFavorite(design.id);
        }}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={20}
          color={isFavorite ? COLORS.goldLight : COLORS.white}
        />
      </TouchableOpacity>
    </Pressable>
  );
}

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  const category = CATEGORIES.find((c) => c.id === id);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [activeTone, setActiveTone] = useState<'all' | SkinTone>('all');

  const filtered = category
    ? activeTone === 'all'
      ? category.designs
      : category.designs.filter((d) => d.skinTone === activeTone)
    : [];

  const toggleFavorite = (designId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(designId)) next.delete(designId);
      else next.add(designId);
      return next;
    });
  };

  const openDesign = (design: MehndiDesign) => {
    router.push({
      pathname: '/design',
      params: {
        catId: id,
        designId: design.id,
        catName: category?.name ?? '',
      },
    });
  };

  if (!category) {
    return (
      <View style={[styles.root, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: COLORS.white }}>Category not found</Text>
      </View>
    );
  }

  return (
    <View style={[styles.root, { paddingBottom: botPad }]}>
      <View style={[styles.headerBar, { paddingTop: topPad + 4 }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={COLORS.gold} />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{category.name}</Text>
          <View style={styles.headerUnderline} />
        </View>
        <View style={styles.backBtn} />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
        style={styles.filterScroll}
      >
        {ALL_TONES.map((tone) => {
          const isActive = activeTone === tone;
          return (
            <Pressable
              key={tone}
              style={[styles.chip, isActive && styles.chipActive]}
              onPress={() => setActiveTone(tone)}
            >
              {tone !== 'all' && (
                <View style={[styles.chipDot, { backgroundColor: SKIN_TONE_COLORS[tone as SkinTone] }]} />
              )}
              <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                {TONE_CHIP_LABELS[tone]}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Ionicons name="color-palette-outline" size={36} color={COLORS.gold} />
            <Text style={styles.emptyText}>No designs for this skin tone</Text>
          </View>
        }
        renderItem={({ item }) => (
          <DesignCard
            design={item}
            isFavorite={favorites.has(item.id)}
            onToggleFavorite={toggleFavorite}
            onPress={() => openDesign(item)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 8,
    paddingBottom: 14,
    backgroundColor: COLORS.header,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  headerTitle: {
    color: COLORS.goldLight,
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  headerUnderline: {
    width: 36,
    height: 1.5,
    backgroundColor: COLORS.gold,
    opacity: 0.7,
  },
  filterScroll: {
    backgroundColor: COLORS.header,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(201,168,76,0.12)',
  },
  filterRow: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
    flexDirection: 'row',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.25)',
    backgroundColor: COLORS.chipBg,
  },
  chipActive: {
    backgroundColor: COLORS.chipActive,
    borderColor: COLORS.gold,
  },
  chipDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  chipText: {
    color: COLORS.white60,
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  chipTextActive: {
    color: COLORS.goldLight,
    fontWeight: '700',
  },
  grid: {
    paddingHorizontal: H_PAD,
    paddingTop: 14,
    paddingBottom: 20,
    gap: CARD_GAP,
  },
  row: {
    gap: CARD_GAP,
  },
  designCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.cardBg,
    elevation: 8,
    marginBottom: CARD_GAP,
  },
  designImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  designOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  skinBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  skinDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  skinBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  heartBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 20,
    padding: 6,
  },
  emptyBox: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    gap: 12,
  },
  emptyText: {
    color: COLORS.white60,
    fontSize: 13,
    letterSpacing: 0.3,
  },
});
