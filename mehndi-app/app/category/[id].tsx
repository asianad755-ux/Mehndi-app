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
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CATEGORIES, MehndiDesign } from '@/data/mehndi-data';

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
  goldGlow: 'rgba(201,168,76,0.25)',
  white: '#FFFFFF',
  white60: 'rgba(255,255,255,0.6)',
  dark60: 'rgba(0,0,0,0.60)',
  border: 'rgba(201,168,76,0.3)',
  cardBg: '#141414',
};

function DesignCard({ design, isFavorite, onToggleFavorite }: {
  design: MehndiDesign;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}) {
  return (
    <View style={styles.designCard}>
      <Image source={design.image} style={styles.designImage} resizeMode="cover" />
      <View style={styles.designOverlay} />
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
    </View>
  );
}

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  const category = CATEGORIES.find((c) => c.id === id);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (designId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(designId)) {
        next.delete(designId);
      } else {
        next.add(designId);
      }
      return next;
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

      <FlatList
        data={category.designs}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <DesignCard
            design={item}
            isFavorite={favorites.has(item.id)}
            onToggleFavorite={toggleFavorite}
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
    paddingBottom: 16,
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
    fontSize: 20,
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
    backgroundColor: 'rgba(0,0,0,0.12)',
  },
  heartBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 6,
  },
});
