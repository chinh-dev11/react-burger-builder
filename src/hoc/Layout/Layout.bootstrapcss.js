import React from 'react';
import Aux from '../../hoc/Aux'; // custom component should be imported as Aux (capitalized)
import cssClasses from './Layout.css';

// Issue: Parsing error: Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>?
// FIX:
// 1. add enclosing tag: <div>...</div> OR
// 2. return as an array and add unique key to each adjacent elements OR
// 3. with HOC (Higher Order Component) and add auxiliary tag: <Aux>...</Aux> or <Auxiliary>...</Auxiliary> for Windows
const layout = props => (
    <Aux>
        <header>
            <nav className="navbar navbar-dark bg-dark navbar-expand-md py-0 fixed-top">
                <a className="navbar-brand" href="/">UDEMY</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a href="#" className="nav-link">Burger<span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">Orders</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">History</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>

        <main role="main" className={cssClasses.Content}>{props.children}</main>
        
        <footer className="footer mt-auto py-3">
            <div className="container">
                <span className="text-muted">Place sticky footer content here!</span>
            </div>
        </footer>
    </Aux>

);

export default layout;