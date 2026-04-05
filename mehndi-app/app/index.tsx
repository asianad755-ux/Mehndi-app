import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useRef } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CATEGORIES, MehndiCategory } from '@/data/mehndi-data';

const { width } = Dimensions.get('window');
const CARD_GAP = 12;
const H_PAD = 16;
const CARD_WIDTH = (width - H_PAD * 2 - CARD_GAP) / 2;
const CARD_HEIGHT = CARD_WIDTH * 1.35;

const COLORS = {
  bg: '#080808',
  gold: '#C9A84C',
  goldLight: '#E8C96A',
  goldGlow: 'rgba(201,168,76,0.25)',
  white: '#FFFFFF',
  white60: 'rgba(255,255,255,0.6)',
  dark70: 'rgba(0,0,0,0.70)',
  dark40: 'rgba(0,0,0,0.40)',
  border: 'rgba(201,168,76,0.35)',
};

function CategoryCard({ item }: { item: MehndiCategory }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, { opacity: pressed ? 0.88 : 1 }]}
      onPress={() => router.push(`/category/${item.id}`)}
    >
      <Image source={item.thumbnail} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardOverlayTop} />
      <View style={styles.cardOverlayBottom} />
      <Text style={styles.cardText}>{item.name}</Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  return (
    <View style={[styles.root, { paddingBottom: botPad }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <View style={[styles.header, { paddingTop: topPad + 16 }]}>
          <View style={styles.headerIconRow}>
            <Ionicons name="sparkles" size={16} color={COLORS.gold} />
            <Text style={styles.headerTagline}>  PREMIUM COLLECTION  </Text>
            <Ionicons name="sparkles" size={16} color={COLORS.gold} />
          </View>
          <Text style={styles.headerTitle}>MEHNDI</Text>
          <View style={styles.goldLine} />
          <Text style={styles.headerSub}>Luxury Henna Designs</Text>
        </View>

        <FlatList
          data={CATEGORIES}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => <CategoryCard item={item} />}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: H_PAD,
    paddingBottom: 28,
  },
  headerIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTagline: {
    color: COLORS.gold,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 3,
  },
  headerTitle: {
    color: COLORS.goldLight,
    fontSize: 44,
    fontWeight: '800',
    letterSpacing: 12,
  },
  goldLine: {
    width: 60,
    height: 1.5,
    backgroundColor: COLORS.gold,
    marginVertical: 10,
    opacity: 0.7,
  },
  headerSub: {
    color: COLORS.white60,
    fontSize: 12,
    letterSpacing: 2.5,
    fontWeight: '400',
  },
  grid: {
    paddingHorizontal: H_PAD,
    gap: CARD_GAP,
  },
  row: {
    gap: CARD_GAP,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 10,
    marginBottom: CARD_GAP,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  cardOverlayTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '45%',
    backgroundColor: COLORS.dark40,
  },
  cardOverlayBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: COLORS.dark70,
  },
  cardText: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1.5,
    paddingBottom: 16,
  },
});
