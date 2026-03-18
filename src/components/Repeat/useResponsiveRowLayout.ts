import React, { useEffect, useMemo, useRef, useState } from "react";

const MUI_SPACING_UNIT_PX = 8;
const DEFAULT_SELECT_MIN_WIDTH = 120;
const DEFAULT_ROW_SPACING = 4;

export interface ResponsiveRowSpec {
  fixedWidth: number;
  selectCount?: number;
  selectMinWidth?: number;
  selectMinWidths?: number[];
  spacing?: number;
}

const getSelectWidths = (rowSpec: ResponsiveRowSpec) => {
  if (rowSpec.selectMinWidths && rowSpec.selectMinWidths.length > 0) {
    return rowSpec.selectMinWidths;
  }
  const count = rowSpec.selectCount ?? 0;
  const selectMinWidth = rowSpec.selectMinWidth ?? DEFAULT_SELECT_MIN_WIDTH;
  return Array.from({ length: count }, () => selectMinWidth);
};

export const getRowMinWidth = (rowSpec: ResponsiveRowSpec) => {
  const selectWidths = getSelectWidths(rowSpec);
  const itemCount = selectWidths.length + 1;
  const spacing = rowSpec.spacing ?? DEFAULT_ROW_SPACING;
  const gapsWidth = Math.max(itemCount - 1, 0) * spacing * MUI_SPACING_UNIT_PX;
  const selectsWidth = selectWidths.reduce((sum, width) => sum + width, 0);
  return rowSpec.fixedWidth + selectsWidth + gapsWidth;
};

export const useContainerRef = (
  externalRef?: React.RefObject<HTMLElement>,
): [React.RefObject<HTMLDivElement>, React.RefObject<HTMLElement>] => {
  const localRef = useRef<HTMLDivElement>(null);
  const resolved = useMemo<React.RefObject<HTMLElement>>(
    () => (externalRef ?? localRef) as React.RefObject<HTMLElement>,
    [externalRef],
  );
  return [localRef, resolved];
};

interface UseResponsiveRowLayoutProps {
  containerRef: React.RefObject<HTMLElement>;
  rowSpecs: ResponsiveRowSpec[];
  enabled?: boolean;
}

const useResponsiveRowLayout = ({
  containerRef,
  rowSpecs,
  enabled = true,
}: UseResponsiveRowLayoutProps) => {
  const [useColumnLayout, setUseColumnLayout] = useState(false);

  const rowMinWidths = useMemo(
    () => rowSpecs.map((rowSpec) => getRowMinWidth(rowSpec)),
    [rowSpecs],
  );

  useEffect(() => {
    if (!enabled) {
      setUseColumnLayout(false);
      return undefined;
    }

    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    const updateLayoutDirection = () => {
      const availableWidth = container.getBoundingClientRect().width;
      const nextUseColumnLayout = rowMinWidths.some((rowMinWidth) => rowMinWidth > availableWidth + 1);
      setUseColumnLayout((previousUseColumnLayout) => (
        previousUseColumnLayout === nextUseColumnLayout
          ? previousUseColumnLayout
          : nextUseColumnLayout
      ));
    };

    updateLayoutDirection();

    if (typeof ResizeObserver !== "undefined") {
      const resizeObserver = new ResizeObserver(updateLayoutDirection);
      resizeObserver.observe(container);
      return () => resizeObserver.disconnect();
    }

    window.addEventListener("resize", updateLayoutDirection);
    return () => window.removeEventListener("resize", updateLayoutDirection);
  }, [containerRef, enabled, rowMinWidths]);

  return enabled ? useColumnLayout : false;
};

export default useResponsiveRowLayout;
