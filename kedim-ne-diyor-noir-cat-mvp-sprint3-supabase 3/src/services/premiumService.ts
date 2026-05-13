import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import Purchases from "react-native-purchases";
import type { CustomerInfo, PurchasesOffering, PurchasesPackage } from "react-native-purchases";

const PREMIUM_STATUS_KEY = "kedim-ne-diyor:premium-status";
const DAILY_ANALYSES_KEY = "kedim-ne-diyor:daily-analyses";
const FREE_DAILY_ANALYSIS_LIMIT = 3;

export const REVENUECAT_ENTITLEMENT_ID = "premium";
export const REVENUECAT_PACKAGE_IDS = {
  monthly: "monthly",
  yearly: "yearly",
  lifetime: "lifetime"
} as const;

export const STORE_PRODUCT_IDS = {
  monthly: "premium_monthly",
  yearly: "premium_yearly",
  lifetime: "premium_lifetime"
} as const;

export type PremiumPlanId = keyof typeof REVENUECAT_PACKAGE_IDS;
export type PremiumPurchaseStatus = "active" | "cancelled" | "unavailable" | "error" | "demo";

export type PremiumPurchaseResult = {
  status: PremiumPurchaseStatus;
  isPremium: boolean;
  message: string;
};

export type PremiumPlan = {
  id: PremiumPlanId;
  title: string;
  price: string;
  period: string;
  productId: string;
  packageId: string;
  badge?: string;
  isAvailable: boolean;
};

type DailyUsage = {
  date: string;
  count: number;
};

export const revenueCatConfig = {
  iosApiKey: process.env.EXPO_PUBLIC_REVENUECAT_IOS_API_KEY || "",
  androidApiKey: process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY || "",
  entitlementId: REVENUECAT_ENTITLEMENT_ID,
  packageIds: REVENUECAT_PACKAGE_IDS,
  productIds: STORE_PRODUCT_IDS
};

const premiumFeatures = new Set([
  "photo-video-analysis",
  "multi-cat-profiles",
  "long-analysis-history",
  "cat-ai-memory"
]);

const planOrder: PremiumPlanId[] = ["monthly", "yearly", "lifetime"];

const defaultPlans: Record<PremiumPlanId, Omit<PremiumPlan, "id" | "isAvailable">> = {
  monthly: {
    title: "Aylık",
    price: "149,99 TL",
    period: "Aylık yenilenir",
    productId: STORE_PRODUCT_IDS.monthly,
    packageId: REVENUECAT_PACKAGE_IDS.monthly
  },
  yearly: {
    title: "Yıllık",
    price: "999,00 TL",
    period: "Yıllık yenilenir",
    productId: STORE_PRODUCT_IDS.yearly,
    packageId: REVENUECAT_PACKAGE_IDS.yearly,
    badge: "En Popüler"
  },
  lifetime: {
    title: "Ömür Boyu",
    price: "1.999,00 TL",
    period: "Tek seferlik satın alma",
    productId: STORE_PRODUCT_IDS.lifetime,
    packageId: REVENUECAT_PACKAGE_IDS.lifetime
  }
};

const packageAliases: Record<PremiumPlanId, string[]> = {
  monthly: [REVENUECAT_PACKAGE_IDS.monthly, STORE_PRODUCT_IDS.monthly, "$rc_monthly", "monthly"],
  yearly: [REVENUECAT_PACKAGE_IDS.yearly, STORE_PRODUCT_IDS.yearly, "$rc_annual", "annual", "yearly"],
  lifetime: [REVENUECAT_PACKAGE_IDS.lifetime, STORE_PRODUCT_IDS.lifetime, "$rc_lifetime", "lifetime"]
};

let configuredApiKey: string | null = null;

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function isNativeStorePlatform() {
  return Platform.OS === "ios" || Platform.OS === "android";
}

function getRevenueCatApiKey() {
  if (Platform.OS === "ios") return revenueCatConfig.iosApiKey;
  if (Platform.OS === "android") return revenueCatConfig.androidApiKey;
  return "";
}

function makeResult(status: PremiumPurchaseStatus, isPremium: boolean, message: string): PremiumPurchaseResult {
  return { status, isPremium, message };
}

function mapPlan(id: PremiumPlanId, purchasesPackage?: PurchasesPackage | null): PremiumPlan {
  const fallback = defaultPlans[id];

  return {
    id,
    ...fallback,
    price: purchasesPackage?.product.priceString || fallback.price,
    isAvailable: Boolean(purchasesPackage)
  };
}

function hasActivePremium(customerInfo: CustomerInfo) {
  return Boolean(customerInfo.entitlements.active[REVENUECAT_ENTITLEMENT_ID]?.isActive);
}

function isUserCancelled(error: unknown) {
  return typeof error === "object" && error !== null && "userCancelled" in error && Boolean((error as { userCancelled?: boolean }).userCancelled);
}

async function setLocalPremiumStatus(value: boolean) {
  if (value) {
    await AsyncStorage.setItem(PREMIUM_STATUS_KEY, "true");
    return;
  }

  await AsyncStorage.removeItem(PREMIUM_STATUS_KEY);
}

async function getLocalPremiumStatus() {
  return (await AsyncStorage.getItem(PREMIUM_STATUS_KEY)) === "true";
}

async function configureRevenueCat() {
  const apiKey = getRevenueCatApiKey();
  if (!apiKey || !isNativeStorePlatform()) return false;
  if (configuredApiKey === apiKey) return true;

  try {
    Purchases.configure({ apiKey });
    configuredApiKey = apiKey;
    return true;
  } catch {
    configuredApiKey = null;
    return false;
  }
}

async function getCurrentOffering() {
  const offerings = await Purchases.getOfferings();
  return offerings.current ?? Object.values(offerings.all)[0] ?? null;
}

function findPlanPackage(offering: PurchasesOffering | null, planId: PremiumPlanId) {
  if (!offering) return null;

  const directPackage = planId === "monthly" ? offering.monthly : planId === "yearly" ? offering.annual : offering.lifetime;
  if (directPackage) return directPackage;

  const aliases = packageAliases[planId].map((item) => item.toLowerCase());
  return (
    offering.availablePackages.find((item) => {
      const packageIdentifier = item.identifier.toLowerCase();
      const productIdentifier = item.product.identifier.toLowerCase();
      return aliases.includes(packageIdentifier) || aliases.includes(productIdentifier);
    }) ?? null
  );
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

export function isRevenueCatConfigured() {
  return Boolean(getRevenueCatApiKey()) && isNativeStorePlatform();
}

export function isDeveloperPremiumDemoAvailable() {
  return __DEV__ && !isRevenueCatConfigured();
}

export async function getPremiumPlans() {
  const fallbackPlans = planOrder.map((id) => mapPlan(id));
  if (!(await configureRevenueCat())) return fallbackPlans;

  try {
    const offering = await getCurrentOffering();
    return planOrder.map((id) => mapPlan(id, findPlanPackage(offering, id)));
  } catch {
    return fallbackPlans;
  }
}

export async function getPremiumStatus() {
  if (await configureRevenueCat()) {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      const isPremium = hasActivePremium(customerInfo);
      await setLocalPremiumStatus(isPremium);
      return isPremium;
    } catch {
      return getLocalPremiumStatus();
    }
  }

  if (__DEV__) return getLocalPremiumStatus();

  await setLocalPremiumStatus(false);
  return false;
}

export async function purchasePremiumPackage(planId: PremiumPlanId): Promise<PremiumPurchaseResult> {
  if (!(await configureRevenueCat())) {
    return makeResult(
      "unavailable",
      false,
      "Satın alma sistemi henüz yapılandırılmadı. App Store incelemesi için RevenueCat API key ve App Store Connect ürünleri hazırlanmalı."
    );
  }

  try {
    const offering = await getCurrentOffering();
    const purchasesPackage = findPlanPackage(offering, planId);

    if (!purchasesPackage) {
      return makeResult(
        "unavailable",
        false,
        "Bu premium plan mağazada bulunamadı. App Store Connect ve RevenueCat ürün eşleştirmelerini kontrol edin."
      );
    }

    const purchaseResult = await Purchases.purchasePackage(purchasesPackage);
    const isPremium = hasActivePremium(purchaseResult.customerInfo);
    await setLocalPremiumStatus(isPremium);

    if (!isPremium) {
      return makeResult("unavailable", false, "Satın alma tamamlandı ancak premium yetkisi doğrulanamadı.");
    }

    return makeResult("active", true, "Premium Noir Cat özellikleri aktif edildi.");
  } catch (error) {
    if (isUserCancelled(error)) {
      return makeResult("cancelled", false, "Satın alma iptal edildi.");
    }

    return makeResult("error", false, "Satın alma tamamlanamadı. Lütfen bağlantını ve mağaza ayarlarını kontrol et.");
  }
}

export async function restorePurchases(): Promise<PremiumPurchaseResult> {
  if (!(await configureRevenueCat())) {
    return makeResult("unavailable", false, "Satın alma sistemi yapılandırılmadığı için geri yükleme yapılamadı.");
  }

  try {
    const customerInfo = await Purchases.restorePurchases();
    const isPremium = hasActivePremium(customerInfo);
    await setLocalPremiumStatus(isPremium);

    if (!isPremium) {
      return makeResult("unavailable", false, "Geri yüklenecek aktif premium satın alma bulunamadı.");
    }

    return makeResult("active", true, "Satın alma geri yüklendi. Premium özellikler aktif.");
  } catch {
    return makeResult("error", false, "Satın alma geri yüklenemedi. Lütfen App Store hesabını kontrol et.");
  }
}

export async function activateDeveloperPremium(): Promise<PremiumPurchaseResult> {
  if (!__DEV__) {
    return makeResult("unavailable", false, "Geliştirici demo premiumu yalnızca development modunda kullanılabilir.");
  }

  await setLocalPremiumStatus(true);
  return makeResult("demo", true, "Development demo premiumu aktif edildi.");
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
