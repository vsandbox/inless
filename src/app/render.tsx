import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ILessNode} from '../interfaces/ILessNode';
import {ILessRenderer} from '../interfaces/ILessRenderer';
import {IMap} from '../interfaces/types';

export interface IRenderParams {
    nodes: Array<ILessNode>; 
    renderers: IMap<ILessRenderer>;
    element: Element;
}

export function render({nodes, renderers, element}: IRenderParams) {
    const elements = nodes.map(node => {
        const renderer = renderers[node.type];

        if (!renderer) {
            throw new Error(`ELNORNDR - No renderer for node '${node.type}' found`);
        }
        
        if (typeof renderer !== 'function') {
            throw new Error(`ELINVRNDR - Render '${node.type}' is not a function`);
        }

        const element = renderer(node);
        if (!React.isValidElement(element)) {
            throw new Error(`ELINVEL - renderer '${node.type}' returns invalid element`);
        }
        
        if (!element.key) {
            throw new Error(`ELINVKEY - element '${node.type}' should have a key`);
        }

        return element;
    });

    ReactDOM.render(<div children={elements} />, element);
}
