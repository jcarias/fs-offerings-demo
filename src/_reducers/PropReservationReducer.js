import { dataTemplateRP } from "../constants/cpcvFormTemplate";

export const actionsRPReducer = {
	UPDATE_PROPERTY_SELECTION: "UPDATE_PROPERTY_SELECTION",
	UPDATE_PURCHASE_PROPOSAL: "UPDATE_PURCHASE_PROPOSAL"
};

const RPReducerInitialState = { ...dataTemplateRP };

const PropertyReservationReducer = (state = RPReducerInitialState, action) => {
	switch (action.type) {
		case actionsRPReducer.UPDATE_PROPERTY_SELECTION:
			return {
				...state,
				currentStep: 1,
				data: {
					...state.data,
					propertySelection: action.propertySelection
				}
			};
		case actionsRPReducer.UPDATE_PURCHASE_PROPOSAL:
			return {
				...state,
				currentStep: 2,
				data: {
					...state.data,
					purchaseProposal: action.purchaseProposal
				}
			};
		default:
			return state;
	}
};

export default PropertyReservationReducer;
