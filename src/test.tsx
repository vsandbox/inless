import * as React from 'react';
import {BehaviorSubject} from 'rxjs';
import {ILessNode} from './interfaces/ILessNode';
import {ILessLine} from './interfaces/ILessLine';
import {ILessRenderer} from './interfaces/ILessRenderer';
import {render} from './app/render';

const nodes = [
    {
        id: '1',
        type: 'test'
    },
    {
        id: '2',
        type: 'test'
    },
];
const lines: Array<ILessLine> = [
    {
        from: '1',
        to: '2'
    }
];

const nodes$ = new BehaviorSubject<Array<ILessNode>>(nodes);
const lines$ = new BehaviorSubject<Array<ILessLine>>(lines);

render({
    nodes$,
    lines$,
    renderers: {
        test: (node, setSocket) => {
            const ref = ({offsetWidth, offsetHeight, offsetLeft, offsetTop}: HTMLElement) => {
                const halfWidth = offsetWidth / 2;
                const halfHeight = offsetHeight / 2;
                console.log(halfWidth, halfHeight);
                setSocket(node.id, {
                    x: offsetLeft + halfWidth,
                    y: offsetTop + halfHeight,
                });
            };
            return <div key={node.id} ref={ref}>{node.type}-{node.id}</div>;
        }
    },
    element: document.getElementById('app'),
});
