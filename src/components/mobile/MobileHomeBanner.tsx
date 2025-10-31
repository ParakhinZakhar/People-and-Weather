"use client";

import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import texts from '@/app/data/homeText.json'

export default function MobileHomeBanner() {
  return (
    <Card className="md:hidden mx-auto my-4 shadow-lg rounded-lg p-4 border border-gray-200">
      <CardContent className="space-y-4">
        <div className="text-center">
          <Typography variant="h4" component="h1" className="font-bold underline mb-3">
            {texts.title}
          </Typography>
        </div>

        <div className="text-left">
          <Typography variant="body2" className="text-gray-700 leading-relaxed">
            {texts.intro}
          </Typography>
        </div>

        <div className="text-left">
          <Typography variant="body2" className="text-gray-700 leading-relaxed">
            {texts.details}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}