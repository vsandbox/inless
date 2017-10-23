import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Observable, Subject} from 'rxjs';
import {ILessNode} from '../interfaces/ILessNode';
import {ILessLine} from '../interfaces/ILessLine';
import {ILessRenderer} from '../interfaces/ILessRenderer';
import {ILessMap, ILessVector} from '../interfaces/types';
import {LessErrorBoundary} from './components/LessErrorBoundary/LessErrorBoundary';
import {LessNodeList} from './components/LessNodeList/LessNodeList';

export interface IRenderParams {
    nodes$: Observable<Array<ILessNode>>;
    lines$: Observable<Array<ILessLine>>;
    element: Element;
    renderers: ILessMap<ILessRenderer>;
}

export function render({nodes$, lines$, renderers, element}: IRenderParams) {
    const sockets$ = new Subject<ILessMap<ILessVector>>();
    const convertedLines$ = lines$
        .combineLatest(sockets$)
        .map(([lines, positions]) => {
            return lines.map(line => {
                const from = positions[line.from] || {x: 0, y: 0};
                const to = positions[line.to] || {x: 0, y: 0};
                
                return {
                    from,
                    to
                };
            });
        });

    convertedLines$.subscribe(lines => {
        console.log('converted lines', lines);
    });

    ReactDOM.render((
        <LessErrorBoundary>
            <div>
                <LessNodeList nodes$={nodes$} sockets$={sockets$} renderers={renderers} />
            </div>
        </LessErrorBoundary>
    ), element);
}
