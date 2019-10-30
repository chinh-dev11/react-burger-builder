// REM - this component is no longer in use, replaced by native builtin feature 'React.lazy()' (React Suspense component - https://reactjs.org/blog/2018/10/23/react-v-16-6.html#reactlazy-code-splitting-with-suspense) - React v16.6.0+
import React, { Component } from 'react';

const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null
        };

        componentDidMount() {
            importComponent()
                .then(cmp => {
                    this.setState({
                        component: cmp.default
                    });
                });
        }
        render() {
            const C = this.state.component;
            return C ? <C {...this.props} /> : null;
        };
    };
};

export default asyncComponent;