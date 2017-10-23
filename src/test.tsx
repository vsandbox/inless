import * as React from 'react';
import {BehaviorSubject} from 'rxjs';
import {ILessNode} from './interfaces/ILessNode';
import {ILessRenderer} from './interfaces/ILessRenderer';
import {render} from './app/render';

const nodes = [
    {
        id: '1',
        type: 'test'
    },
];

const nodes$ = new BehaviorSubject<Array<ILessNode>>(nodes);
setTimeout(() => {
    nodes.push({
        id: '2',
        type: 'test'
    });
    nodes$.next(nodes);
}, 200);

render({
    nodes$,
    renderers: {
        test: node => {
            return <div key={node.id}>{node.type}-{node.id}</div>;
        }
    },
    element: document.getElementById('app'),
});
