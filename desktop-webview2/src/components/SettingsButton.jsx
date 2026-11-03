import { useState } from "react";
import { Settings } from "lucide-react";
import { SIDE_BTN } from "@shared/desktop/lib/cls.js";
import { SettingsModal } from "./SettingsModal.jsx";

export function SettingsButton({ onCheckUpdate }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className={SIDE_BTN} onClick={() => setOpen(true)}>
        <Settings size={16} /> Settings
      </button>
      {open && (
        <SettingsModal
          onClose={() => setOpen(false)}
          onCheckUpdate={onCheckUpdate}
        />
      )}
    </>
  );
}
