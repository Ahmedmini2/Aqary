// pages/index.tsx
'use client'
import { Button, Grid, Card, CardContent, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

async function loadPosts() {
  const getPost = await fetch('https://jsonplaceholder.typicode.com/posts', { cache: 'no-store' });
  const posts = await getPost.json();
  return posts;
}

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const postsData = await loadPosts();
      setPosts(postsData);
    }
    fetchPosts();
  }, []);

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {posts.map((post: any) => (
        <Grid item xs={2} sm={4} md={4} key={post.id}>
          <Card sx={{ maxWidth: 400, maxHeight: 400 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {post.body}
              </Typography>
            </CardContent>
            <Link href={`/posts/posts/?postID=${post.id}`} >
              <Button size="small" color="primary" sx={{ margin: 2 }}>
                Read More
              </Button>
            </Link>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
