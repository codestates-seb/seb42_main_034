import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Error from './pages/Error';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import QuestionDetails from './pages/question/QuestionDetails';
import SignUp from './pages/user/SignUp';
import Board from './pages/Board';
import MyPage from './pages/MyPage';
import QuestionPost from './pages/question/QuestionPost';
import BlogPost from './pages/blog/BlogPost';
import LandingPage from './pages/LandingPage';
import BlogDetails from './pages/blog/BlogDetails';
import SignIn from './pages/user/SignIn';
import App from './App';
import QuestionList from './pages/question/QuestionList';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistGate } from 'redux-persist/integration/react';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/board',
        element: <Board />,
        children: [
          {
            path: '/board/questionlist/',
            element: <QuestionList />,
          },
          {
            path: '/board/boarddetails/:id',
            element: <BlogDetails />,
          },
          {
            path: '/board/questiondetails/:id',
            element: <QuestionDetails />,
          },
          {
            path: '/board/signin/signup',
            element: <SignUp />,
          },
          {
            path: '/board/signin',
            element: <SignIn />,
          },
          {
            path: '/board/mypage',
            element: <MyPage />,
          },
          {
            path: '/board/questionpost',
            element: <QuestionPost />,
          },
          {
            path: '/board/blogpost',
            element: <BlogPost />,
          },
        ],
      },
    ],
    errorElement: <Error />,
  },
]);

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    </PersistGate>
  </Provider>,
);
