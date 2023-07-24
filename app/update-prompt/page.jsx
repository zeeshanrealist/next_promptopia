'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const EditPrompt = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const promptId = searchParams.get('id');
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  });

  useEffect(() => {
    const getPrompt = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();
        setPost({
          prompt: data.prompt,
          tag: data.tag
        });
      } catch(error) {
        console.log('Failed to fetch post details', error);
      }
    }
    if (promptId) {
      console.log('call the function')
      getPrompt();
    }
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    if (!promptId) {
      return alert("Missing PromptId!");
    }
    setSubmitting(true);
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      });
      console.log('response ok---', response.ok);
      if (response.ok) {
        router.push('/');
      }
    } catch(error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form
      type="Edit"
      post={post}
      submitting={submitting}
      setPost={setPost}
      handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt;
