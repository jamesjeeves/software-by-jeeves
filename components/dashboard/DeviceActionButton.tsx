"use client";

import { useFormStatus } from "react-dom";
import { RotateCcw, Trash2 } from "lucide-react";

export default function DeviceActionButton({
  active,
  disabled = false,
}: {
  active: boolean;
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();

  function confirmAction(event: React.MouseEvent<HTMLButtonElement>) {
    if (!active) return;

    const confirmed = window.confirm(
      "Remove this device?\n\nIt will be blocked before its next scan. You can reactivate it later if a slot is available."
    );

    if (!confirmed) {
      event.preventDefault();
    }
  }

  return (
    <button
      className={`portal-button ${
        active ? "danger" : "secondary"
      } portal-device-action`}
      type="submit"
      disabled={pending || disabled}
      onClick={confirmAction}
      title={
        disabled
          ? "Remove another active device before reactivating this one."
          : undefined
      }
    >
      {active ? <Trash2 size={16} /> : <RotateCcw size={16} />}
      {pending
        ? "Updating..."
        : active
          ? "Remove device"
          : "Reactivate device"}
    </button>
  );
}
