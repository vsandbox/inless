import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Observable} from 'rxjs';
import {ILessNode} from '../interfaces/ILessNode';
import {ILessRenderer} from '../interfaces/ILessRenderer';
import {ILessMap} from '../interfaces/types';
import {LessErrorBoundary} from './components/LessErrorBoundary/LessErrorBoundary';
import {LessNodeList} from './components/LessNodeList/LessNodeList';

export interface IRenderParams {
    nodes$: Observable<Array<ILessNode>>;
    element: Element;
    renderers: ILessMap<ILessRenderer>;
}

export function render({nodes$, renderers, element}: IRenderParams) {
    ReactDOM.render((
        <LessErrorBoundary>
            <div>
                <LessNodeList nodes$={nodes$} renderers={renderers} />
            </div>
        </LessErrorBoundary>
    ), element);
}
