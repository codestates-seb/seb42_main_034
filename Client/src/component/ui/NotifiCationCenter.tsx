/* eslint-disable @typescript-eslint/no-unsafe-return */
import styled from 'styled-components';
import React from 'react';
import Toast from './Toast';
import { useAppSelector } from '../../redux/hooks';
import { payloadType } from 'redux/notifiCation';

const NotificationCenter = () => {
    const state = useAppSelector(
        state => state.persistReducer.notification.messages,
    );

    return (
        <StyledNotificationCenter>
            {state.map((n: payloadType) => (
                <Toast key={n.uuid} text={n.message} dismissTime={n.dismissTime} />
            ))}
        </StyledNotificationCenter>
    );
};

const StyledNotificationCenter = styled.div`
    font-size: 1rem;
    position: fixed;
    z-index: 999999;

    @media screen and (max-width: 800px) {
        left: calc(50% - 12.5rem);
        top: 5px;
    }

    @media screen and (min-width: 800px) {
        right: 10px;
        top: 7rem;
    }
`;

export default NotificationCenter;