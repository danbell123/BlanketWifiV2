"use client";
import React, { useEffect, useState } from "react";
import { Segment, segmentSchema } from "@/types/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SegmentsSettingsForm from "@/components/segments/SegmentsSettingsForm";

interface SettingsTabProps {
  segment: Segment;
}

function SettingsTab({ segment }: SettingsTabProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex w-full flex-col gap-20 items-center pt-8">
        <SegmentsSettingsForm segment={segment} />
      </div>
    </div>
  );
}

export default SettingsTab;
