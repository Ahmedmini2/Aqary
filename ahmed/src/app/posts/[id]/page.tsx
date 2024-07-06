'use client'
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; 
import { ButtonBase, Card, CardContent, CardHeader, Grid, Paper, Typography } from '@mui/material';
import Header from '@/app/components/header';
import Comments from '@/app/components/comments/page';


async function getPostData(id: string) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { cache: 'no-store' });
    const postData = await response.json();
    return postData;
}




export default function Page() {
    const [post, setPost] = useState<any>(null);
    const [comments, setComments] = useState<any>(null);
    const searchParams = useSearchParams(); 
    const postId = searchParams.get('postID') || 'No'; 
    

    useEffect(() => {
        const fetchPost = async () => {
            try {
                if (postId) {
                    const postData = await getPostData(postId);               
                    setPost(postData);
                }
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [postId]);

    return (
        <>
            <Header />
            <main className="flex bg-slate-300 flex-col items-center justify-between p-24">
                <div className='py-2'>Post ID: {postId}</div>
                {post && (
                    <Card>
                        <CardHeader title={post.title} />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {post.body}
                            </Typography>
                        </CardContent>
                    </Card>
                )}
        

            <Comments></Comments>
             
            
            </main>
        </>
    );
}
