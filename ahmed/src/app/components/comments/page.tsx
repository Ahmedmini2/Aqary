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
        <Paper
        key={comment.id}
            sx={{
                p: 2,
                m:2,
                width: 500,
                maxWidth: 500,
                flexGrow: 1,
                
            }}
            >
                
            <Grid container spacing={2} >
            
                <Grid item xs={12} sm container >
                <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                    <Typography gutterBottom variant="subtitle1" component="div">
                        User: {comment.name}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Email:  {comment.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Comment: {comment.body}
                    </Typography>
                    </Grid>
                    
                </Grid>
                
                </Grid>
               
            </Grid>
             
        </Paper>
        ))}
  </>
  )
}

