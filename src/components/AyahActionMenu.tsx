import { motion, AnimatePresence } from "framer-motion";
import { Copy, Bookmark, Share2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AyahActionMenuProps {
  isOpen: boolean;
  onClose: () => void;
  position: { x: number; y: number };
  onCopyAyah: () => void;
  onCopyTranslation: () => void;
  onBookmark: () => void;
  onShare: () => void;
  isBookmarked: boolean;
}

export const AyahActionMenu = ({
  isOpen,
  onClose,
  position,
  onCopyAyah,
  onCopyTranslation,
  onBookmark,
  onShare,
  isBookmarked,
}: AyahActionMenuProps) => {
  const menuItems = [
    {
      label: "Copy Ayah",
      icon: Copy,
      onClick: () => {
        onCopyAyah();
        onClose();
      },
    },
    {
      label: "Copy Translation",
      icon: Copy,
      onClick: () => {
        onCopyTranslation();
        onClose();
      },
    },
    {
      label: isBookmarked ? "Remove Bookmark" : "Bookmark",
      icon: Bookmark,
      onClick: () => {
        onBookmark();
        onClose();
      },
    },
    {
      label: "Share",
      icon: Share2,
      onClick: () => {
        onShare();
        onClose();
      },
    },
    {
      label: "Cancel",
      icon: X,
      onClick: onClose,
      isCancel: true,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/20 backdrop-blur-sm"
          />
          
          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", duration: 0.3, bounce: 0.2 }}
            style={{
              position: "fixed",
              left: `${position.x}px`,
              top: `${position.y}px`,
              transform: "translate(-50%, -100%)",
            }}
            className={cn(
              "z-50 rounded-2xl overflow-hidden shadow-2xl min-w-[200px]",
              "bg-background/95 backdrop-blur-xl border border-border/50"
            )}
          >
            <div className="py-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={index}
                    onClick={item.onClick}
                    className={cn(
                      "w-full px-4 py-3 flex items-center gap-3 transition-colors",
                      "hover:bg-muted/50 active:bg-muted",
                      item.isCancel
                        ? "border-t border-border/50 text-destructive"
                        : "text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
