import React from 'react';
import { usePromiseTracker } from "react-promise-tracker";
import { ThreeDots } from 'react-loader-spinner';

const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();

    return (
        promiseInProgress && <div
            className='loader'
        >
            <ThreeDots
                visible={true}
                height="80"
                width="150"
                color="#5a86ed"
                radius="20"
            />
        </div>
    );
}
export default LoadingIndicator