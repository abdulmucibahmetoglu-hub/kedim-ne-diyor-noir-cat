import AsyncStorage from "@react-native-async-storage/async-storage";

const PREMIUM_STATUS_KEY = "kedim-ne-diyor:premium-status";
const DAILY_ANALYSES_KEY = "kedim-ne-diyor:daily-analyses";
const FREE_DAILY_ANALYSIS_LIMIT = 3;

export const REVENUECAT_ENTITLEMENT_ID = "premium";
export const REVENUECAT_PACKAGE_IDS = {
  monthly: "monthly",
  yearly: "yearly",
  lifetime: "lifetime"
} as const;

export const revenueCatConfig = {
  iosApiKey: process.env.EXPO_PUBLIC_REVENUECAT_IOS_API_KEY || "",
  androidApiKey: process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY || "",
  entitlementId: REVENUECAT_ENTITLEMENT_ID,
  packageIds: REVENUECAT_PACKAGE_IDS
};

const premiumFeatures = new Set([
  "photo-video-analysis",
  "multi-cat-profiles",
  "long-analysis-history",
  "cat-ai-memory"
]);

type DailyUsage = {
  date: string;
  count: number;
};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

async function getDailyUsage(): Promise<DailyUsage> {
  const stored = await AsyncStorage.getItem(DAILY_ANALYSES_KEY);
  if (!stored) return { date: todayKey(), count: 0 };

  try {
    const parsed = JSON.parse(stored) as DailyUsage;
    if (parsed.date !== todayKey()) return { date: todayKey(), count: 0 };
    return { date: parsed.date, count: Math.max(0, parsed.count || 0) };
  } catch {
    return { date: todayKey(), count: 0 };
  }
}

export async function getPremiumStatus() {
  // TODO RevenueCat: Purchases.getCustomerInfo() ile "premium" entitlement aktif mi kontrol et.
  // Mock akış App Store/TestFlight hazırlığı tamamlanana kadar local storage kullanır.
  return (await AsyncStorage.getItem(PREMIUM_STATUS_KEY)) === "true";
}

export async function activateMockPremium() {
  // TODO RevenueCat: Purchases.purchasePackage(monthly/yearly/lifetime) sonucunda entitlement doğrula.
  // Gerçek API key veya ödeme akışı bu sprintte eklenmez.
  await AsyncStorage.setItem(PREMIUM_STATUS_KEY, "true");
  return true;
}

export async function restorePurchases() {
  // TODO RevenueCat: Purchases.restorePurchases() çağır ve dönen customerInfo içinde "premium" entitlement kontrol et.
  return activateMockPremium();
}

export async function canUsePremiumFeature(featureName: string) {
  if (!premiumFeatures.has(featureName)) return true;
  return getPremiumStatus();
}

export async function getRemainingDailyAnalyses() {
  if (await getPremiumStatus()) return null;

  const usage = await getDailyUsage();
  return Math.max(0, FREE_DAILY_ANALYSIS_LIMIT - usage.count);
}

export async function recordDailyAnalysis() {
  if (await getPremiumStatus()) return null;

  const usage = await getDailyUsage();
  const nextUsage = { date: todayKey(), count: usage.count + 1 };
  await AsyncStorage.setItem(DAILY_ANALYSES_KEY, JSON.stringify(nextUsage));

  return Math.max(0, FREE_DAILY_ANALYSIS_LIMIT - nextUsage.count);
}

export { FREE_DAILY_ANALYSIS_LIMIT };
