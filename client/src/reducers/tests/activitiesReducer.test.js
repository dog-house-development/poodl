import reducer from '../../reducers/activitiesReducer';
import Types from '../../actions/types';

describe('activity reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            //text: 'Use Redux',
            //completed: false,
            //id: 0

            loading: false,
            all: {},
            errors: {}
        });
    });

    it('should handle Create.BEGIN', () => {
        expect(
            reducer([], {
                type: Types.activity.create.BEGIN,
                loading: true
            })
        ).toEqual({
            loading: true
        });

        expect(
            reducer(
                {
                    loading: true
                },
                {
                    type: Types.activity.create.BEGIN,
                    loading: true
                }
            )
        ).toEqual(
            {
                loading: true
            },
            {
                loading: true
            }
        );
    });

    it('should handle Create.SUCCESS', () => {
        expect(
            reducer([], {
                type: Types.activity.create.SUCCESS,
                loading: false
            })
        ).toEqual({
            loading: false
        });

        expect(
            reducer(
                {
                    loading: false
                },
                {
                    type: Types.activity.create.SUCCESS,
                    loading: false
                }
            )
        ).toEqual(
            {
                loading: false
            },
            {
                loading: false
            }
        );
    });

    it('should handle activity.ERROR', () => {
        const action = { type: 'activity' };
        expect(
            reducer([], {
                type: Types.activity.ERROR,
                errors: action.payload,
                loading: true
            })
        ).toEqual({
            errors: action.payload,
            loading: true
        });

        expect(
            reducer(
                {
                    errors: action.payload,
                    loading: false
                },
                {
                    type: Types.activity.create.BEGIN,
                    errors: action.payload,
                    loading: true
                }
            )
        ).toEqual(
            {
                errors: action.payload,
                loading: true
            },
            {
                errors: action.payload,
                loading: true
            }
        );
    });
});
