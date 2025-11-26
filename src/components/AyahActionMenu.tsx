import { motion, AnimatePresence } from "framer-motion";
import { Copy, Bookmark, Share2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  
  // Calculate safe positioning to prevent menu cut-off
  const calculateSafePosition = () => {
    const padding = 16; // Safe padding from edges
    const baseMenuWidth = isMobile
      ? Math.min(320, window.innerWidth - padding * 2)
      : 280; // Approximate desktop width
    const menuWidth = Math.max(220, baseMenuWidth);
    const menuHeight = 60; // Approximate menu height (used for future refinements)

    let safeX = position.x;
    let safeY = position.y;

    // Prevent horizontal overflow so the bubble never gets clipped
    const maxX = window.innerWidth - menuWidth / 2 - padding;
    const minX = menuWidth / 2 + padding;
    safeX = Math.max(minX, Math.min(safeX, maxX));

    // Determine if menu should appear above or below the ayah card
    const shouldPositionAbove = position.y > window.innerHeight / 2;

    return { safeX, safeY, shouldPositionAbove };
  };
  
  const { safeX, safeY, shouldPositionAbove } = calculateSafePosition();
  
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
          {/* Backdrop - Invisible but clickable */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50"
            style={{ background: 'transparent' }}
          />
          
          {/* Horizontal Bubble Menu with Pointer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ 
              type: "spring", 
              stiffness: 500, 
              damping: 35,
              mass: 0.5
            }}
            style={{
              position: "fixed",
              left: `${safeX}px`,
              top: `${safeY}px`,
              maxWidth: isMobile ? "min(320px, calc(100vw - 32px))" : "320px",
              width: "auto",
              transform: shouldPositionAbove
                ? "translate(-50%, calc(-100% - 20px))"
                : "translate(-50%, 20px)",
            }}
            className={cn(
              "z-[60] rounded-full overflow-visible relative w-max",
              "bg-card/98 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)]",
              "border border-border/40 px-2 py-2"
            )}
          >
            {/* Pointer/Arrow connecting menu to card */}
            <div
              className={cn(
                "absolute left-1/2 -translate-x-1/2 w-3 h-3",
                "bg-card/98 border-border/40",
                shouldPositionAbove
                  ? "bottom-[-6px] border-b border-r rotate-45"
                  : "top-[-6px] border-t border-l rotate-45"
              )}
            />
            <div className="flex items-center gap-1">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isCancel = item.isCancel;
                return (
                  <button
                    key={index}
                    onClick={item.onClick}
                    title={item.label}
                    className={cn(
                      "p-3 rounded-full transition-all duration-150",
                      "hover:bg-accent/80 active:bg-accent active:scale-95",
                      isCancel
                        ? "text-destructive hover:bg-destructive/10"
                        : "text-foreground hover:text-primary",
                      index < menuItems.length - 1 && "mr-0.5"
                    )}
                  >
                    <Icon className="h-5 w-5" />
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
