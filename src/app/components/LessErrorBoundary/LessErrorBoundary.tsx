import * as React from 'react';

export interface ILessErrorBoundaryState {
    error: Error | null;
}

export class LessErrorBoundary extends React.Component<any, ILessErrorBoundaryState> {
    public constructor(props: any) {
        super(props);

        this.state = {
            error: null
        };
    }

    public componentDidCatch(error: Error) {
        this.setState({
            error
        });
    }

    public render() {
        const {error} = this.state;
        if (error)
            return (
                <div>
                    <h1>Oh my GOD!!! ERROR! We will crash!!!</h1>
                    <pre>
                        {error.stack}
                    </pre>
                </div>
            );
        
        return this.props.children as any;
    }
}
