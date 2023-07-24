'use client';

import {useState, useEffect} from 'react';
import { useParams, useSearchParams } from 'next/navigation';

import Profile from '@components/Profile';

const UserProfile = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const profileName = searchParams.get('name');
  const profileId = params.id;

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${profileId}/posts`);
      const data = await response.json();
      setPosts(data);
    }
    if (profileId) {
      fetchPosts();
    }
  }, [profileId, profileName]);

  return (
    <Profile
      name={profileName}
      desc={`Welcome to ${profileName}'s personalized profile page. Explore 
        ${profileName}'s prompts and be inspired by the power of their imagination`}
      data={posts}
    />
  )
}

export default UserProfile;
