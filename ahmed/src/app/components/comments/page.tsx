'use client'
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; 
import { ButtonBase, Card, CardContent, CardHeader, Grid, Paper, Typography } from '@mui/material';
import Header from '@/app/components/header';

async function getCommentData(id: string) {
    
    const comments = await fetch(`https://jsonplaceholder.typicode.com/comments/?postId=${id}`, { cache: 'no-store' });
    
    const commentsData = await comments.json();
    return commentsData;
}

export default function Comments() {
    const [comments, setComments] = useState<any>(null);
    const searchParams = useSearchParams(); 
    const postId = searchParams.get('postID') || 'No'; 



    useEffect(() => {
        const fetchPost = async () => {
            try {
                if (postId) {              
                    const commentsData = await getCommentData(postId);        
                    setComments(commentsData);
                    console.log(commentsData)
                }
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };
        fetchPost();
    }, [postId]);

if(comments) 
  return (

    <>
    <Typography variant='h5' sx={{margin: 2}}> Comments</Typography>
    { comments.map((comment: any) => (
                <div className="flex p-4 w-[500px]" key={comment.id} >
                <figure className="md:flex max-w-5xl bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
                <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                    <blockquote>
                    <p className="text-lg font-medium dark:text-slate-100">
                        {comment.body}
                    </p>
                    </blockquote>
                    <figcaption className="font-medium">
                    <div className="text-sky-500 dark:text-sky-400">
                        {comment.name}
                    </div>
                    </figcaption>
                    <div className="text-slate-700 dark:text-slate-400">
                        {comment.email}
                    </div>
                    
                </div>
                </figure>
            </div>
        ))}
  </>
  )
}

