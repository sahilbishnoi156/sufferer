"use client"
import {useEffect,useState} from 'react'
import UserIds from './UserIds'
import Link from 'next/link';
import Skeleton from './Skeleton';

export default function SideProfile({session}){
    const [dataLoading, setDataLoading] = useState(false)
    const [allUsers, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState({})

  const fetchRelatedUsers = async () => {
    try {
      setDataLoading(true)
      const response = await fetch("/api/users/allUsers");
      const data = await response.json();
      Array.isArray(data) ? setUsers(data) : setUsers([data])
      setDataLoading(false)
    } catch (error) {
      console.log("failed to get quotes",error)
    }
    
  };
  const fetchCurrentUser = async () => {
    const response = await fetch(`/api/users/getUser/${session?.user.id || localStorage.getItem('Sufferer-site-userId')}`);
    const user = await response.json();
    setCurrentUser(user);
  };
  useEffect(() => {
    if (window.innerWidth > 640 ) {
      fetchRelatedUsers();
      fetchCurrentUser();
    }
  }, [session?.user.id,localStorage.getItem('Sufferer-site-userId')]);
    
  return (
    <div className="h-screen flex flex-col justify-evenly gap-10 px-8 py-12 fixed border-l-2 border-gray-700">
      {!dataLoading ? <div className='flex gap-4 items-center justify-start w-full'>
        <img src={currentUser.image || "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="} alt="d" className='h-16 w-16 rounded-full object-cover'/>
        <span>
        <Link className='hover:underline text-2xl' href='/profile'>@{currentUser.username || ""}</Link>
        <p className='text-gray-500 dark:text-gray-400'>{currentUser.given_name || currentUser.username} {currentUser.family_name || ""}</p>
        </span>
      </div> : <Skeleton type={"userId"}/>}
      <div className='flex flex-col gap-4'>
      <div className='text-xl'>People You May Know</div>
      {dataLoading ? <Skeleton type="sideProfile"/>:<>
        {allUsers.slice(0,5).map((user)=>{
            return <UserIds heading="People You May Know" key={user._id} username={user.username} user_image={user.image} userId={user._id} given_name={user.given_name} family_name={user.family_name}/>
        })}</>}
      </div>
      <div className='flex items-start justify-center flex-col gap-2'>
        <div className='w-full flex items-end justify-start gap-2'>
        <p className='text-sm'>Learn About This Project</p>
        <Link className='border-2 rounded-full bg-white h-6 w-6 flex items-center justify-center  ' href="/projectrepo" prefetch={true}><i className="fa-solid fa-info text-sm text-slate-800"></i></Link>
        </div>
      <div className='text-xs text-slate-400'>© 2023 SUFFERER FROM CODENAUTICA</div>
      </div>
    </div>
  )
}
