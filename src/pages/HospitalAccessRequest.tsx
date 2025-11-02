import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../components/shared/Card';
import { Button } from '../components/shared/Button';

const mockPatients = [
  { id: 1, name: 'Rajesh Kumar', abhaId: '12-3456-7890-1234', age: 45, gender: 'Male', phone: '+91 98765 43210' },
  { id: 2, name: 'Priya Sharma', abhaId: '12-3456-7890-5678', age: 32, gender: 'Female', phone: '+91 98765 43211' },
  { id: 3, name: 'Amit Patel', abhaId: '12-3456-7890-9012', age: 28, gender: 'Male', phone: '+91 98765 43212' },
  { id: 4, name: 'Sneha Reddy', abhaId: '12-3456-7890-3456', age: 35, gender: 'Female', phone: '+91 98765 43213' },
  { id: 5, name: 'Vikram Singh', abhaId: '12-3456-7890-7890', age: 52, gender: 'Male', phone: '+91 98765 43214' },
  { id: 6, name: 'Anita Desai', abhaId: '12-3456-7890-2345', age: 41, gender: 'Female', phone: '+91 98765 43215' },
  { id: 7, name: 'Rahul Verma', abhaId: '12-3456-7890-6789', age: 29, gender: 'Male', phone: '+91 98765 43216' },
  { id: 8, name: 'Kavita Nair', abhaId: '12-3456-7890-0123', age: 38, gender: 'Female', phone: '+91 98765 43217' },
  { id: 9, name: 'Suresh Gupta', abhaId: '12-3456-7890-4567', age: 55, gender: 'Male', phone: '+91 98765 43218' },
  { id: 10, name: 'Meera Iyer', abhaId:  '12-3456-7890-4567', age: 55, gender: 'Male', phone: '+91 98765 43218', email: 'suresh.g@email.com' },
  { id: 10, name: 'Meera Iyer', abhaId: '12-3456-7890-8901', age: 33, gender: 'Female', phone: '+91 98765 43219', email: 'meera.i@email.com' },
];

interface Patient {
  id: number;
  name: string;
  abhaId: string;
  age: number;
  gender: string;
  