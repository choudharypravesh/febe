import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';
import handler from '../pages/api/hello';

/**
 * It returns a state object that contains the engine data, and a set of functions to interact with engine
 * @returns An object with the following properties:
 */
function useEngineState() {
    const [isPublished, setIsPublished] = useState(false);

    const checkIfPublished = () => {};

    const publish = () => {
        console.log('🚀 ~ publish ~ publish:');
        handler();
    };

    return {
        checkIfPublished,
        publish,
        isPublished,
        setIsPublished,
    };
}

export default createContainer(useEngineState);
