import React from 'react';
import { createRoot } from 'react-dom/client';
import Error from './pages/Error';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import QuestionDetails from './pages/QuestionDetails';
import SignUp from './pages/user/SignUp';
import Board from './component/Board';
import MyPage from './pages/MyPage';
import BlogPost from './component/blog/BlogPost';
import LandingPage from './pages/LandingPage';
import BlogDetails from './pages/BlogDetails';
import SignIn from './pages/user/SignIn';
import App from './App';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistGate } from 'redux-persist/integration/react';
import NotificationCenter from 'component/ui/NotifiCationCenter';
import { GlobalStyle } from 'component/style/globalStyle';
import ModifyQuestion from 'pages/ModifyQuestion';
import QuestionBoardList from 'pages/QuestionBoardList';
import BlogBoardList from './pages/BlogBoradList';
import ModifyBlog from 'pages/ModifyBlog';
import ProfileEditPage from 'pages/user/ProfileEdit';
import QuestionPost from 'pages/QuestionPost';

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
            path: '/board/boardlist/questions/:category',
            element: <QuestionBoardList />,
          },
          {
            path: '/board/boardlist/blogs/:category',
            element: <BlogBoardList />,
          },

          {
            path: '/board/blogsdetails/:id',
            element: <BlogDetails />,
          },

          {
            path: '/board/questionsdetails/:id',
            element: <QuestionDetails />,
          },
          {
            path: '/board/signup',
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
            path: '/board/mypage/edit',
            element: <ProfileEditPage />,
          },
          {
            path: '/board/questionspost/:category',

            element: <QuestionPost />,
          },
          {
            path: '/board/blogpost/:category',
            element: <BlogPost />,
          },
          {
            path: '/board/modifyquestion/:id',
            element: <ModifyQuestion />,
          },
          {
            path: '/board/modifyblog/:id',
            element: <ModifyBlog />,
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

        <GlobalStyle />

        <NotificationCenter />
      </QueryClientProvider>
    </PersistGate>
  </Provider>,
);
