import { Capacitor } from "@capacitor/core";
import {
  Haptics,
  ImpactStyle,
  NotificationType,
} from "@capacitor/haptics";

export async function lightHaptic() {
  if (Capacitor.isNativePlatform()) {
    await Haptics.impact({ style: ImpactStyle.Light });
    return;
  }

  navigator.vibrate?.(10);
}

export async function successHaptic() {
  if (Capacitor.isNativePlatform()) {
    await Haptics.notification({ type: NotificationType.Success });
    return;
  }

  navigator.vibrate?.([10, 40, 20]);
}
