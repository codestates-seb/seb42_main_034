import React from 'react'
import Layout from './component/ui/Layout'
import { Outlet } from 'react-router-dom'
export default function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}
