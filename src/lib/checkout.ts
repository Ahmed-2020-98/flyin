import type { BookingType } from "@/lib/types";

export type CheckoutSummaryLine = { label: string; value: string };

export type CheckoutData = {
  type: BookingType;
  itemId: string;
  summary: {
    title: string;
    subtitle: string;
    image?: string;
    lines: CheckoutSummaryLine[];
  };
  pricing: {
    base: number;
    taxes: number;
    total: number;
    currency: string;
  };
  snapshot: Record<string, unknown>;
};
