"use client";
import { useEffect } from "react";
import { useNavbar } from "@/hooks/useNavbar";

type Props = {
  setDefaultExpanded?: boolean;
  doMinimalRendering?: boolean;
};

export function NavbarServerConfig({ ...props }: Props) {
  const { setDefaultExpanded, doMinimalRendering } = useNavbar();
  useEffect(() => {
    if (props.setDefaultExpanded !== undefined) {
      setDefaultExpanded(props.setDefaultExpanded);
    }
    if (props.doMinimalRendering !== undefined) {
      doMinimalRendering(props.doMinimalRendering);
    }
  }, [
    props.setDefaultExpanded,
    props.doMinimalRendering,
    setDefaultExpanded,
    doMinimalRendering
  ]);
  return null;
}
