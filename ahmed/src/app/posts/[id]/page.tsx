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
            <main className=" bg-slate-300 flex-col items-center justify-between ">
                <div className='py-2'>Post ID: {postId}</div>
                {post && (
                    <section className="bg-gray-900 text-white ">
                    <div className="px-4 py-32 lg:flex  lg:items-center">
                      <div className="mx-auto max-w-3xl text-center">
                        <h1
                          className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
                        >
                          {post.title}
                  
                          <span className="sm:block"> Increase Conversion. </span>
                        </h1>
                  
                        <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
                          {post.body}
                        </p>
                  
                        
                      </div>
                    </div>
                  </section>
                )}
        

            <Comments></Comments>
             
            
            </main>
        </>
    );
}
