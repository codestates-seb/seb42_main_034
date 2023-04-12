import React from 'react';
import { createRoot } from 'react-dom/client';
import Error from './pages/Error';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import QuestionDetails from './pages/question/QuestionDetails';
import SignUp from './pages/user/SignUp';
import Board from './pages/Board';
import MyPage from './pages/MyPage';
import QuestionPost from './pages/question/QuestionPost';
import BlogPost from './pages/blog/BlogPost';
import LandingPage from './pages/LandingPage/LandingPage';
import BlogDetails from './pages/blog/BlogDetails';
import SignIn from './pages/user/SignIn';
import App from './App';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistGate } from 'redux-persist/integration/react';
import NotificationCenter from 'component/ui/NotifiCationCenter';
import BoardList from 'pages/question/BoardList';
import { GlobalStyle } from 'component/style/globalStyle';
import ModifyQuestion from 'pages/question/ModifyQuestion';
import QuestionBoardList from 'pages/question/BoardList';
import BlogBoardList from './pages/blog/BlogList';
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
            path: '/board/boardlist/questions',
            element: <QuestionBoardList />,
          },
          {
            path: '/board/boardlist/blogs',
            element: <BlogBoardList />,
          },

          {
            path: '/board/boarddetails/:section',
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
            path: '/board/questionpost',
            element: <QuestionPost />,
          },
          {
            path: '/board/blogpost',
            element: <BlogPost />,
          },
          {
            path: '/board/modify/:id',
            element: <ModifyQuestion />,
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
