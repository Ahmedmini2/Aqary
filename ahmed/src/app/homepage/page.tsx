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
          <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg" key={post.id}>
            
          
            <div className="bg-white p-4 sm:p-6">
              <time dateTime="2022-10-10" className="block text-xs text-gray-500"> 10th Oct 2022 </time>
          
              <a href="#">
                <h3 className="mt-0.5 text-lg text-gray-900">{post.title}</h3>
              </a>
          
              <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                {post.body}
              </p>
            </div>
            <Link href={`/posts/posts/?postID=${post.id}`} >
              <Button size="small" color="primary" sx={{ margin: 2 }}>
                Read More
              </Button>
            </Link>
          </article>
          
        </Grid>
      ))}
    </Grid>
  );
}
