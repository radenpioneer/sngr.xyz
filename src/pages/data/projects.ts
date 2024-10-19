import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

export const GET: APIRoute = async () => {
  const projects = await getCollection('projects')
  return new Response(JSON.stringify(projects), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const prerender = false
