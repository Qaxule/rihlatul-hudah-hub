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
  
  // Determine if menu should appear above or below based on vertical position
  const shouldPositionAbove = position.y > window.innerHeight / 2;
  
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
          
          {/* Horizontal Bubble Menu */}
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
              left: `${position.x}px`,
              top: `${position.y}px`,
              transform: shouldPositionAbove
                ? "translate(-50%, calc(-100% - 16px))"
                : "translate(-50%, 16px)",
            }}
            className={cn(
              "z-[60] rounded-full overflow-hidden",
              "bg-card/98 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)]",
              "border border-border/40 px-2 py-2"
            )}
          >
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
