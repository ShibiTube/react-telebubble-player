import React from "react";
import { clsx } from "@/utils";

export interface OverlayProps {
  children?: React.ReactNode;
  className?: string;
  isPlaying?: boolean;
  togglePlay?: () => void;
  handleKeyPress?: (e: React.KeyboardEvent) => void;
}

export const Overlay: React.FC<OverlayProps> = ({
  children,
  className,
  isPlaying,
  togglePlay,
  handleKeyPress,
}) => {
  // Clone children and pass props if they're ToggleButton
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      // Check if it's a ToggleButton by type
      const childType = child.type as { name?: string };
      if (childType && childType.name === 'ToggleButton') {
        return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
          isPlaying,
          onToggle: togglePlay,
          onKeyDown: handleKeyPress,
          ...(child.props as Record<string, unknown>),
        });
      }
    }
    return child;
  });

  return (
    <div
      className={clsx("telebubble-overlay", className)}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      {enhancedChildren}
    </div>
  );
};
