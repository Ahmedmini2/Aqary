// pages/posts/[postId].tsx
'use client'
import { GetStaticProps, GetStaticPaths } from 'next';
import { Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';




export default function Page() {
  const router = useRouter()
  return <p>Post: </p>
}