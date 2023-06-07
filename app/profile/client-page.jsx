"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Profile from "@/components/Profile"

export default function MyProfileClientPage() {
  const router = useRouter()
  const { data: session } = useSession()

  const [myPosts, setMyPosts] = useState([])

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch(`/api/users/${session?.user.id}/prompts`)
      const data = await response.json()
      setMyPosts(data)
    }

    if (session?.user.id) {
      fetchPosts()
    }
  }, [session?.user.id])

  function handleEdit(post) {
    router.push(`/update-prompt?id=${post._id}`)
  }

  async function handleDelete(post) {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?")
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        })
        const filteredPosts = myPosts.filter((item) => item._id !== post._id)
        setMyPosts(filteredPosts)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}
