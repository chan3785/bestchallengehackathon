'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import WNW_ABI from '@/abi/IWNW.abi';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from './ui/use-toast';
import React from 'react';
import { useWriteContract } from 'wagmi';
import { DatePicker } from '@nextui-org/react';
import { now } from '@internationalized/date';
import { projects } from '@/constants';
import { ethers } from 'ethers';

const formSchema = z.object({
  project_name: z.string().default('').optional(),
  project_address: z.string().optional(),
  event_title: z.string().optional(),
  event_description: z.string().default('').optional(),
  event_category: z.string().default('').optional(),
  event_date: z.string().default('').optional()
});
