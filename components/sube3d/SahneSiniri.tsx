"use client";

import { Component, type ReactNode } from "react";

/** Canvas kurulamazsa veya GLB yüklenemezse yalnız dekoratif sahne kapanır.
 * Başvuru formu ve sayfanın geri kalanı çalışmaya devam eder. */
export default class SahneSiniri extends Component<{
  children: ReactNode;
  onHata: () => void;
}, { hata: boolean }> {
  state = { hata: false };

  static getDerivedStateFromError() {
    return { hata: true };
  }

  componentDidCatch() {
    this.props.onHata();
  }

  render() {
    return this.state.hata ? null : this.props.children;
  }
}

