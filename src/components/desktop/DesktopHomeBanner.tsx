"use client";

import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import texts from '@/app/data/homeText.json'

export default function DesktopHomeBanner() {
  return (
    <Card className="hidden md:block max-w-4xl mx-auto my-4 shadow-2xl rounded-lg p-6 lg:p-8 border border-gray-200">
      <CardContent className="grid grid-cols-1 lg:grid-cols-2 grid-rows-3 gap-4">
        <div className="col-span-1 lg:col-span-2 text-center">
          <Typography variant="h3" component="h1" className="font-bold underline mb-2">
            {texts.title}
          </Typography>
        </div>

        <div className="col-span-1 lg:text-left">
          <Typography variant="body1" className="text-gray-700">
            {texts.intro}
          </Typography>
        </div>

        <div className="col-span-1 lg:row-start-3 lg:col-start-2 lg:text-left">
          <Typography variant="body1" className="text-gray-700">
            {texts.details}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}