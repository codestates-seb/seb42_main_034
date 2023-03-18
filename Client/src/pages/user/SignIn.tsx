import React, { useEffect } from 'react';
import { useAppSelector } from '../../redux/hooks';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Loginform from '../../component/Sign/LoginForm';

const PageStyled = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #62a3f4;
`;

const SignIn = () => {
  const { isLogin } = useAppSelector((state) => state.loginInfo);
  const navigate = useNavigate();

  useEffect(() => {
    isLogin && navigate(-1);
  }, []);

  return (
    <div>
      <Loginform />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam officia illo beatae consequatur ipsam harum
        voluptatum ex aliquid dolorem voluptatem iste, sint natus porro possimus laudantium nemo iusto aperiam
        veritatis.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, esse ab earum sunt, quibusdam aut unde
        voluptatem in itaque architecto, eveniet soluta iusto voluptates optio magni numquam. Eligendi, possimus
        pariatur?
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex omnis hic delectus deserunt beatae quo. Tempora
        dignissimos expedita iure eos eaque cupiditate labore, nam dolores at impedit quo. Libero, iure!
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique repudiandae rem dicta inventore tempore
        autem quae blanditiis, fugiat quam sapiente aliquam ut quasi cupiditate voluptate ipsam sed nobis dolorum iusto.
      </p>
      <p>
        x Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto, officiis corporis. Neque, provident
        molestias nostrum dolore laboriosam sunt? Autem ad explicabo optio eveniet beatae molestiae, dolore facilis
        earum animi eaque!
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam officia illo beatae consequatur ipsam harum
        voluptatum ex aliquid dolorem voluptatem iste, sint natus porro possimus laudantium nemo iusto aperiam
        veritatis.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, esse ab earum sunt, quibusdam aut unde
        voluptatem in itaque architecto, eveniet soluta iusto voluptates optio magni numquam. Eligendi, possimus
        pariatur?
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex omnis hic delectus deserunt beatae quo. Tempora
        dignissimos expedita iure eos eaque cupiditate labore, nam dolores at impedit quo. Libero, iure!
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique repudiandae rem dicta inventore tempore
        autem quae blanditiis, fugiat quam sapiente aliquam ut quasi cupiditate voluptate ipsam sed nobis dolorum iusto.
      </p>
      <p>
        x Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto, officiis corporis. Neque, provident
        molestias nostrum dolore laboriosam sunt? Autem ad explicabo optio eveniet beatae molestiae, dolore facilis
        earum animi eaque!
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam officia illo beatae consequatur ipsam harum
        voluptatum ex aliquid dolorem voluptatem iste, sint natus porro possimus laudantium nemo iusto aperiam
        veritatis.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, esse ab earum sunt, quibusdam aut unde
        voluptatem in itaque architecto, eveniet soluta iusto voluptates optio magni numquam. Eligendi, possimus
        pariatur?
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex omnis hic delectus deserunt beatae quo. Tempora
        dignissimos expedita iure eos eaque cupiditate labore, nam dolores at impedit quo. Libero, iure!
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique repudiandae rem dicta inventore tempore
        autem quae blanditiis, fugiat quam sapiente aliquam ut quasi cupiditate voluptate ipsam sed nobis dolorum iusto.
      </p>
      <p>
        x Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto, officiis corporis. Neque, provident
        molestias nostrum dolore laboriosam sunt? Autem ad explicabo optio eveniet beatae molestiae, dolore facilis
        earum animi eaque!
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam officia illo beatae consequatur ipsam harum
        voluptatum ex aliquid dolorem voluptatem iste, sint natus porro possimus laudantium nemo iusto aperiam
        veritatis.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, esse ab earum sunt, quibusdam aut unde
        voluptatem in itaque architecto, eveniet soluta iusto voluptates optio magni numquam. Eligendi, possimus
        pariatur?
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex omnis hic delectus deserunt beatae quo. Tempora
        dignissimos expedita iure eos eaque cupiditate labore, nam dolores at impedit quo. Libero, iure!
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique repudiandae rem dicta inventore tempore
        autem quae blanditiis, fugiat quam sapiente aliquam ut quasi cupiditate voluptate ipsam sed nobis dolorum iusto.
      </p>
      <p>
        x Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto, officiis corporis. Neque, provident
        molestias nostrum dolore laboriosam sunt? Autem ad explicabo optio eveniet beatae molestiae, dolore facilis
        earum animi eaque!
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex omnis hic delectus deserunt beatae quo. Tempora
        dignissimos expedita iure eos eaque cupiditate labore, nam dolores at impedit quo. Libero, iure!
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique repudiandae rem dicta inventore tempore
        autem quae blanditiis, fugiat quam sapiente aliquam ut quasi cupiditate voluptate ipsam sed nobis dolorum iusto.
      </p>
      <p>
        x Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto, officiis corporis. Neque, provident
        molestias nostrum dolore laboriosam sunt? Autem ad explicabo optio eveniet beatae molestiae, dolore facilis
        earum animi eaque!
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique repudiandae rem dicta inventore tempore
        autem quae blanditiis, fugiat quam sapiente aliquam ut quasi cupiditate voluptate ipsam sed nobis dolorum iusto.
      </p>
      <p>
        x Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto, officiis corporis. Neque, provident
        molestias nostrum dolore laboriosam sunt? Autem ad explicabo optio eveniet beatae molestiae, dolore facilis
        earum animi eaque!
      </p>
    </div>
  );
};
export default SignIn;
