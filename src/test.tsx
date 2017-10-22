import * as React from 'react';
import {render, IRenderParams} from './app/render';
import {ILessNode} from './interfaces/ILessNode';

const data: IRenderParams = {
    nodes: [
        {
            type: 'test'
        }
    ] as ILessNode[],
    renderers: {
        test: () => {
            return <div key={1}>This is node bitch!</div>;
        }
    },
    element: document.getElementById('app'),
};

render(data);
