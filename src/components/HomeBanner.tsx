"use client";

import React from 'react';
import DesktopHomeBanner from '@/components/desktop/DesktopHomeBanner';
import MobileHomeBanner from '@/components/mobile/MobileHomeBanner';

export default function HomeBanner() {
  return (
    <>
      <DesktopHomeBanner />
      <MobileHomeBanner />
    </>
  );
}