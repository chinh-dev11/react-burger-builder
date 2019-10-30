import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// import BurgerBuilder from './BurgerBuilder'; // REM - import the component (from the export implicitly 'export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));') will cause the error 'Invariant Violation: Could not find "store" in the context of "Connect(_temp)"...' because of the use of 'connect' (Redux store)
import { BurgerBuilder } from './BurgerBuilder'; // REM - import the component from the export explicitly to prevent the 'Invariant Violation: Could not find "store"' mentioned above
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({
    adapter: new Adapter()
});

describe('<BurgerBuilder />', () => {
    let wrapper;

    beforeEach(() => {
        // wrapper = shallow(<BurgerBuilder />); // ISSUE - shallow requires props.onInitIngredients and props.onSetAuthRedirectPath to be able to render shallowly the BurgerBuilder container, and we only set 'ings' as props.
        /* TypeError: this.props.onInitIngredients is not a function

            27 |     componentDidMount = () => {
            28 |         // console.log('[BurgerBuilder] componentDidMount');
            > 29 |         this.props.onInitIngredients();
                |                    ^
            30 |         this.props.onSetAuthRedirectPath('/');
            31 |     };
            32 |  
        */
        // FIX - both props need to be present as functions when rendered by shallow as following
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => { }} onSetAuthRedirectPath={() => { }} />);
    });

    it('should render <BuildControls /> when receiving ingredients', () => {
        wrapper.setProps({
            ings: { salad: 0 }
        });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});