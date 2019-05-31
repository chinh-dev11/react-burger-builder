import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({
    adapter: new Adapter()
});

// REM: enzyme - allows to render only the element alone (<NavigationItems />), independent of the entire application
// REM: shallow - allows to render the component with all its content, but the content is not deeply rendered; the <NavigationItem /> will be rendered as a placeholder, without its nested content
describe('<NavigationItems />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it('should render two <NavigationItem /> elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2); // to have 2 NavigationItem
    });

    it('should render three <NavigationItem /> elements if authenticated', () => {
        wrapper.setProps({ isAuthenticated: true });
        expect(wrapper.find(NavigationItem)).toHaveLength(3); // to have 3 NavigationItem
    });

    it('should render logout <NavigationItem /> element if authenticated', () => {
        wrapper.setProps({ isAuthenticated: true });
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });

    it('should render authentication <NavigationItem /> element if not authenticated', () => {
        wrapper.setProps({ isAuthenticated: false });
        expect(wrapper.contains(<NavigationItem link="/auth">Authentication</NavigationItem>)).toEqual(true);
    });

    /*
        PASS  src/components/Navigation/NavigationItems/NavigationItems.test.js

        Test Suites: 1 skipped, 1 passed, 1 of 2 total
        Tests:       1 skipped, 4 passed, 5 total
        Snapshots:   0 total
        Time:        1.445s
        Ran all test suites with tests matching "Navigat".

        Active Filters: test name /Navigat/
        › Press c to clear filters.

        Watch Usage
        › Press a to run all tests.
        › Press f to run only failed tests.
        › Press o to only run tests related to changed files.
        › Press p to filter by a filename regex pattern.
        › Press q to quit watch mode.
        › Press t to filter by a test name regex pattern.
        › Press Enter to trigger a test run.
    */
});