import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({
    adapter: new Adapter()
});

// REM: enzyme - allows to render only the element alone (<NavigationItems />), independent of the entire application
// REM: shallow - allows to render the component with all its content, but the content is not deeply rendered; the <NavigationItem /> will be rendered as a placeholder, without its nested content
describe('<NavigationItems />', () => {
    it('should render two <NavigationItem /> elements if not authenticated', () => {
        const wrapper = shallow(<NavigationItems />);
        expect(wrapper.find(NavigationItem)).toHaveLength(2); // to have 2 NavigationItem

        /* 
        PASS  src/components/Navigation/NavigationItems/NavigationItems.test.js
            <NavigationItems />
            ✓ should render two <NavigationItem /> elements if not authenticated (22ms)
        
        Test Suites: 1 passed, 1 total
        Tests:       1 passed, 1 total
        Snapshots:   0 total
        Time:        1.688s, estimated 2s
        Ran all test suites related to changed files.
        
        Watch Usage
        › Press a to run all tests.
        › Press f to run only failed tests.
        › Press p to filter by a filename regex pattern.
        › Press q to quit watch mode.
        › Press t to filter by a test name regex pattern.
        › Press Enter to trigger a test run. 
        */
    });
});