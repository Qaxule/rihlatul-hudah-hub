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
          {/* Backdrop - Invisible but clickable */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50"
            style={{ background: 'transparent' }}
          />
          
          {/* iMessage-style Bubble Menu */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 30,
              mass: 0.8
            }}
            style={{
              position: "fixed",
              left: `${position.x}px`,
              top: `${position.y}px`,
              transform: "translate(-50%, calc(-100% - 12px))",
            }}
            className={cn(
              "z-[60] rounded-2xl overflow-hidden min-w-[220px]",
              "bg-card/98 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)]",
              "border border-border/40"
            )}
          >
            <div className="py-1">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isLast = index === menuItems.length - 1;
                return (
                  <button
                    key={index}
                    onClick={item.onClick}
                    className={cn(
                      "w-full px-5 py-3.5 flex items-center gap-3.5 transition-all duration-150",
                      "hover:bg-accent/80 active:bg-accent active:scale-[0.98]",
                      isLast
                        ? "border-t border-border/40 text-destructive font-medium mt-1"
                        : "text-foreground"
                    )}
                  >
                    <Icon className={cn(
                      "h-[18px] w-[18px]",
                      isLast ? "text-destructive" : "text-muted-foreground"
                    )} />
                    <span className="text-[15px] font-medium">{item.label}</span>
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
