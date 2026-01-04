const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const JUSPAY_AUTH = 'Basic dummy';

const generatePNR = () => Math.random().toString(36).substring(2, 8).toUpperCase();

// --- API ENDPOINTS ---
app.post('/api/nsk/v2/token', (req, res) => res.json({ "data": { "token": "JWT_NAV_" + Date.now(), "idleTimeoutInMinutes": 15 } }));
app.post('/api/nsk/v4/availability/search/simple', (req, res) => res.json({ "data": { "results": [] } }));
app.post('/api/nsk/v4/trip/sell', (req, res) => res.json({ "data": { "currencyCode": "INR", "breakdown": { "totalAmount": 2000.0 } } }));
app.post('/api/nsk/v3/booking', (req, res) => res.sendStatus(200));
app.post('/api/nsk/v5/booking/payments', (req, res) => res.sendStatus(200));
app.put('/api/nsk/v3/booking', (req, res) => res.sendStatus(200));

// =============================================================================
//  EXACT MERCHANT TRANSIENT INFO STRINGS
// =============================================================================

// 1. DEL -> MNL
const MTI_DEL_MNL = "{\"lob\":\"Flight\",\"userPersona\":\"B2C\",\"subPersona\":\"ANONYMOUS\",\"priceBreakdown\":[{\"id\":\"NkV_NjgzM34gfn5ERUx_MTIvMjcvMjAyNSAwNTozMH5CTFJ_MTIvMjcvMjAyNSAwODoyNX5_\",\"baseAmount\":\"6312\",\"additionalAmounts\":[{\"name\":\"totalInfantPrice\",\"amount\":\"0\"},{\"name\":\"totalSSRPrice\",\"amount\":\"0\"},{\"name\":\"totalTax\",\"amount\":\"809\"}]}],\"totalUserBookingCount\":null,\"metadata\":{\"bookingDetails\":{\"bookingStatus\":\"Pending\"},\"journeysDetail\":[{\"journeydetail\":{\"destination\":\"MNL\",\"origin\":\"DEL\"},\"segments\":[{\"segmentDetails\":{\"identifier\":{\"identifier\":\"6833\",\"carrierCode\":\"6E\"},\"destination\":\"MNL\",\"origin\":\"DEL\"}}],\"flightType\":\"NonStop\",\"productClass\":\"R\"}]},\"travelType\":\"Domestic\",\"partnerInfo\":null,\"customerType\":\"REPEAT\"}";

// 2. BOM -> MNL (Agent Payload)
const MTI_BOM_MNL = "{\"lob\":\"Flight\",\"userPersona\":\"PARTNER\",\"subPersona\":\"ANONYMOUS\",\"totalUserBookingCount\":null,\"customerType\":\"REPEAT\",\"partnerInfo\":null,\"travelType\":\"Domestic\",\"priceBreakdown\":[{\"id\":\"NkV_NjgzM34gfn5ERUx_MTIvMjcvMjAyNSAwNTozMH5CTFJ_MTIvMjcvMjAyNSAwODoyNX5_\",\"baseAmount\":\"6312\",\"additionalAmounts\":[{\"name\":\"totalInfantPrice\",\"amount\":\"0\"},{\"name\":\"totalSSRPrice\",\"amount\":\"0\"},{\"name\":\"totalTax\",\"amount\":\"809\"},{\"name\":\"pointsBalanceDue\",\"amount\":\"0\"},{\"name\":\"refundAmount\",\"amount\":\"0\"},{\"name\":\"refundPoint\",\"amount\":\"0\"},{\"name\":\"CashEquilant\",\"amount\":\"0\"},{\"name\":\"CashUsed\",\"amount\":\"0\"}]}],\"metadata\":{\"bookingDetails\":{\"bookingKey\":null,\"pnrType\":\"Oneway\",\"recordLocator\":null,\"parentRecordLocator\":\"\",\"numericRecordLocator\":null,\"bookingStatus\":\"Pending\",\"paymentStatus\":\"Pending\",\"channelType\":0,\"currencyCode\":\"INR\",\"bookedDate\":\"2025-12-26T07:38:33.4862825Z\",\"createdDate\":null,\"expirationDate\":null,\"modifiedDate\":null,\"cancelledDate\":null,\"holdDate\":null,\"createdByAgent\":\"0\",\"createdByRoleCode\":null,\"owningCarrierCode\":null,\"changeAllowed\":true,\"recordLocators\":null,\"showAutoRefundPopUp\":false,\"hasModification\":true,\"specialFareCode\":null,\"promoCode\":null,\"isRedeemTransaction\":false},\"isBookingStateValid\":true,\"journeysDetail\":[{\"journeyKey\":\"NkV_NjgzM34gfn5ERUx_MTIvMjcvMjAyNSAwNTozMH5CTFJ_MTIvMjcvMjAyNSAwODoyNX5_\",\"productClass\":\"R\",\"flightType\":\"NonStop\",\"stops\":0,\"specialFareCode\":null,\"promoCode\":null,\"journeydetail\":{\"destination\":\"MNL\",\"origin\":\"MUM\",\"arrival\":\"2025-12-27T08:25:00\",\"departure\":\"2025-12-27T05:30:00\",\"utcarrival\":\"2025-12-27T02:55:00Z\",\"utcdeparture\":\"2025-12-27T00:00:00Z\",\"identifier\":null,\"destinationName\":\"Kempegowda International Airport\",\"originName\":\"Indira Gandhi International Airport\",\"originCityName\":\"Delhi\",\"destinationCityName\":\"Bengaluru\",\"baggageData\":{\"handBaggageWeight\":7,\"checkinBaggageWeight\":15,\"checkinLimitPerPiece\":0,\"handBaggageCount\":1,\"checkinBaggageCount\":0}},\"segments\":[{\"segmentDetails\":{\"destination\":\"MNL\",\"origin\":\"MUM\",\"arrival\":\"2025-12-27T08:25:00\",\"departure\":\"2025-12-27T05:30:00\",\"utcarrival\":\"2025-12-27T02:55:00Z\",\"utcdeparture\":\"2025-12-27T00:00:00Z\",\"identifier\":{\"identifier\":\"6833\",\"carrierCode\":\"6E\",\"opSuffix\":null},\"destinationName\":\"Kempegowda International Airport\",\"originName\":\"Indira Gandhi International Airport\",\"originCityName\":\"Delhi\",\"destinationCityName\":\"Bengaluru\",\"isCodeShareMealMsgRequired\":null},\"segmentKey\":\"NkV_NjgzM34gfn5ERUx_MTIvMjcvMjAyNSAwNTozMH5CTFJ_MTIvMjcvMjAyNSAwODoyNX5_\",\"legs\":[{\"legKey\":\"NjM5MDI0MTAyMDAwMDAwMDAwITZFITY4MzMhICFERUwhQkxSITk5MTI1MjI-\",\"legDetails\":null,\"designator\":{\"destination\":\"MNL\",\"origin\":\"MUM\",\"arrival\":\"2025-12-27T08:25:00\",\"departure\":\"2025-12-27T05:30:00\"},\"ssrs\":null}],\"designator\":{\"destination\":\"MNL\",\"origin\":\"MUM\",\"arrival\":\"2025-12-27T08:25:00\",\"departure\":\"2025-12-27T05:30:00\"},\"operatedByText\":null,\"isSeatmapViewable\":true,\"baggageAllowanceWeight\":0,\"baggageAllowanceUsed\":false,\"baggageAllowanceWeightType\":0,\"boardingSequence\":null,\"barcodestring\":null,\"liftStatus\":null,\"hasInfant\":false,\"tickets\":null,\"bundleCode\":null,\"isToShowOTB\":false,\"okToBoardValue\":false,\"seats\":null,\"ssrs\":null,\"seatmapReference\":\"NkUhNjgzMyEgITYzOTAyNDEwMjAwMDAwMDAwMCFERUwhQkxS\",\"externalIdentifier\":null,\"international\":false,\"passengerSegment\":null,\"productClass\":\"R\"}]}]}],\"agentCode\":\"TESTAGENT\",\"agentCountryCode\":\"US\"}";

// 3. BLR -> CEB
const MTI_BLR_CEB = "{\"lob\":\"Flight\",\"userPersona\":\"B2C\",\"subPersona\":\"ANONYMOUS\",\"totalUserBookingCount\":null,\"customerType\":\"REPEAT\",\"partnerInfo\":null,\"travelType\":\"Domestic\",\"priceBreakdown\":[{\"id\":\"NkV_NjgzM34gfn5ERUx_MTIvMjcvMjAyNSAwNTozMH5CTFJ_MTIvMjcvMjAyNSAwODoyNX5_\",\"baseAmount\":\"6312\",\"additionalAmounts\":[{\"name\":\"totalInfantPrice\",\"amount\":\"0\"},{\"name\":\"totalSSRPrice\",\"amount\":\"0\"},{\"name\":\"totalTax\",\"amount\":\"809\"},{\"name\":\"pointsBalanceDue\",\"amount\":\"0\"},{\"name\":\"refundAmount\",\"amount\":\"0\"},{\"name\":\"refundPoint\",\"amount\":\"0\"},{\"name\":\"CashEquilant\",\"amount\":\"0\"},{\"name\":\"CashUsed\",\"amount\":\"0\"}]}],\"metadata\":{\"bookingDetails\":{\"bookingKey\":null,\"pnrType\":\"Oneway\",\"recordLocator\":null,\"parentRecordLocator\":\"\",\"numericRecordLocator\":null,\"bookingStatus\":\"Pending\",\"paymentStatus\":\"Pending\",\"channelType\":0,\"currencyCode\":\"INR\",\"bookedDate\":\"2025-12-26T07:38:33.4862825Z\",\"createdDate\":null,\"expirationDate\":null,\"modifiedDate\":null,\"cancelledDate\":null,\"holdDate\":null,\"createdByAgent\":\"0\",\"createdByRoleCode\":null,\"owningCarrierCode\":null,\"changeAllowed\":true,\"recordLocators\":null,\"showAutoRefundPopUp\":false,\"hasModification\":true,\"specialFareCode\":null,\"promoCode\":null,\"isRedeemTransaction\":false},\"isBookingStateValid\":true,\"journeysDetail\":[{\"journeyKey\":\"NkV_NjgzM34gfn5ERUx_MTIvMjcvMjAyNSAwNTozMH5CTFJ_MTIvMjcvMjAyNSAwODoyNX5_\",\"productClass\":\"R\",\"flightType\":\"NonStop\",\"stops\":0,\"specialFareCode\":null,\"promoCode\":null,\"journeydetail\":{\"destination\":\"CEB\",\"origin\":\"BLR\",\"arrival\":\"2025-12-27T08:25:00\",\"departure\":\"2025-12-27T05:30:00\",\"utcarrival\":\"2025-12-27T02:55:00Z\",\"utcdeparture\":\"2025-12-27T00:00:00Z\",\"identifier\":null,\"destinationName\":\"Kempegowda International Airport\",\"originName\":\"Indira Gandhi International Airport\",\"originCityName\":\"Delhi\",\"destinationCityName\":\"Bengaluru\",\"baggageData\":{\"handBaggageWeight\":7,\"checkinBaggageWeight\":15,\"checkinLimitPerPiece\":0,\"handBaggageCount\":1,\"checkinBaggageCount\":0}},\"segments\":[{\"segmentDetails\":{\"destination\":\"CEB\",\"origin\":\"BLR\",\"arrival\":\"2025-12-27T08:25:00\",\"departure\":\"2025-12-27T05:30:00\",\"utcarrival\":\"2025-12-27T02:55:00Z\",\"utcdeparture\":\"2025-12-27T00:00:00Z\",\"identifier\":{\"identifier\":\"6833\",\"carrierCode\":\"6E\",\"opSuffix\":null},\"destinationName\":\"Kempegowda International Airport\",\"originName\":\"Indira Gandhi International Airport\",\"originCityName\":\"Delhi\",\"destinationCityName\":\"Bengaluru\",\"isCodeShareMealMsgRequired\":null},\"segmentKey\":\"NkV_NjgzM34gfn5ERUx_MTIvMjcvMjAyNSAwNTozMH5CTFJ_MTIvMjcvMjAyNSAwODoyNX5_\",\"legs\":[{\"legKey\":\"NjM5MDI0MTAyMDAwMDAwMDAwITZFITY4MzMhICFERUwhQkxSITk5MTI1MjI-\",\"legDetails\":{\"destination\":\"CEB\",\"origin\":\"BLR\",\"arrival\":\"2025-12-27T08:25:00\",\"departure\":\"2025-12-27T05:30:00\",\"identifier\":{\"identifier\":null,\"carrierCode\":\"\",\"opSuffix\":\"\"},\"utcarrival\":\"2025-12-27T02:55:00Z\",\"utcdeparture\":\"2025-12-27T00:00:00Z\",\"adjustedCapacity\":0,\"arrivalTerminal\":\"1\",\"arrivalTimeVariant\":0,\"backMoveDays\":0,\"capacity\":0,\"changeOfDirection\":false,\"codeShareIndicator\":0,\"departureTerminal\":\"1\",\"departureTimeVariant\":0,\"equipmentType\":\"321\",\"equipmentTypeSuffix\":\"32P\",\"eTicket\":true,\"irop\":false,\"lid\":0,\"marketingCode\":null,\"marketingOverride\":false,\"onTime\":null,\"operatedByText\":null,\"operatingCarrier\":null,\"operatingFlightNumber\":null,\"operatingOpSuffix\":null,\"outMoveDays\":0,\"prbcCode\":\"C220\",\"scheduleServiceType\":\"J\",\"sold\":0,\"status\":0,\"subjectToGovtApproval\":false,\"originName\":\"Indira Gandhi International Airport\",\"destinationName\":\"Kempegowda International Airport\",\"originCityName\":\"Delhi\",\"destinationCityName\":\"Bengaluru\"},\"designator\":null,\"ssrs\":null}],\"designator\":{\"destination\":\"CEB\",\"origin\":\"BLR\",\"arrival\":\"2025-12-27T08:25:00\",\"departure\":\"2025-12-27T05:30:00\"},\"operatedByText\":null,\"isSeatmapViewable\":true,\"baggageAllowanceWeight\":0,\"baggageAllowanceUsed\":false,\"baggageAllowanceWeightType\":0,\"boardingSequence\":null,\"barcodestring\":null,\"liftStatus\":null,\"hasInfant\":false,\"tickets\":null,\"bundleCode\":null,\"isToShowOTB\":false,\"okToBoardValue\":false,\"seats\":null,\"ssrs\":null,\"seatmapReference\":\"NkUhNjgzMyEgITYzOTAyNDEwMjAwMDAwMDAwMCFERUwhQkxS\",\"externalIdentifier\":null,\"international\":false,\"passengerSegment\":null,\"productClass\":\"R\"}]}]}],\"agentCode\":null,\"agentCountryCode\":null}";

// 4. MAA -> CEB
const MTI_MAA_CEB = "{\"lob\":\"Flight\",\"userPersona\":\"B2C\",\"subPersona\":\"ANONYMOUS\",\"totalUserBookingCount\":null,\"customerType\":\"REPEAT\",\"partnerInfo\":null,\"travelType\":\"Domestic\",\"priceBreakdown\":[{\"id\":\"NkV_NjgzM34gfn5ERUx_MTIvMjcvMjAyNSAwNTozMH5CTFJ_MTIvMjcvMjAyNSAwODoyNX5_\",\"baseAmount\":\"6312\",\"additionalAmounts\":[{\"name\":\"totalInfantPrice\",\"amount\":\"0\"},{\"name\":\"totalSSRPrice\",\"amount\":\"0\"},{\"name\":\"totalTax\",\"amount\":\"809\"},{\"name\":\"pointsBalanceDue\",\"amount\":\"0\"},{\"name\":\"refundAmount\",\"amount\":\"0\"},{\"name\":\"refundPoint\",\"amount\":\"0\"},{\"name\":\"CashEquilant\",\"amount\":\"0\"},{\"name\":\"CashUsed\",\"amount\":\"0\"}]}],\"metadata\":{\"bookingDetails\":{\"bookingKey\":null,\"pnrType\":\"Oneway\",\"recordLocator\":null,\"parentRecordLocator\":\"\",\"numericRecordLocator\":null,\"bookingStatus\":\"Pending\",\"paymentStatus\":\"Pending\",\"channelType\":0,\"currencyCode\":\"INR\",\"bookedDate\":\"2025-12-26T07:38:33.4862825Z\",\"createdDate\":null,\"expirationDate\":null,\"modifiedDate\":null,\"cancelledDate\":null,\"holdDate\":null,\"createdByAgent\":\"0\",\"createdByRoleCode\":null,\"owningCarrierCode\":null,\"changeAllowed\":true,\"recordLocators\":null,\"showAutoRefundPopUp\":false,\"hasModification\":true,\"specialFareCode\":null,\"promoCode\":null,\"isRedeemTransaction\":false},\"isBookingStateValid\":true,\"journeysDetail\":[{\"journeyKey\":\"NkV_NjgzM34gfn5ERUx_MTIvMjcvMjAyNSAwNTozMH5CTFJ_MTIvMjcvMjAyNSAwODoyNX5_\",\"productClass\":\"R\",\"flightType\":\"NonStop\",\"stops\":0,\"specialFareCode\":null,\"promoCode\":null,\"journeydetail\":{\"destination\":\"CEB\",\"origin\":\"MAA\",\"arrival\":\"2025-12-27T08:25:00\",\"departure\":\"2025-12-27T05:30:00\",\"utcarrival\":\"2025-12-27T02:55:00Z\",\"utcdeparture\":\"2025-12-27T00:00:00Z\",\"identifier\":null,\"destinationName\":\"Kempegowda International Airport\",\"originName\":\"Indira Gandhi International Airport\",\"originCityName\":\"Delhi\",\"destinationCityName\":\"Bengaluru\",\"baggageData\":{\"handBaggageWeight\":7,\"checkinBaggageWeight\":15,\"checkinLimitPerPiece\":0,\"handBaggageCount\":1,\"checkinBaggageCount\":0}},\"segments\":[{\"segmentDetails\":{\"destination\":\"CEB\",\"origin\":\"MAA\",\"arrival\":\"2025-12-27T08:25:00\",\"departure\":\"2025-12-27T05:30:00\",\"utcarrival\":\"2025-12-27T02:55:00Z\",\"utcdeparture\":\"2025-12-27T00:00:00Z\",\"identifier\":{\"identifier\":\"6833\",\"carrierCode\":\"6E\",\"opSuffix\":null},\"destinationName\":\"Kempegowda International Airport\",\"originName\":\"Indira Gandhi International Airport\",\"originCityName\":\"Delhi\",\"destinationCityName\":\"Bengaluru\",\"isCodeShareMealMsgRequired\":null},\"segmentKey\":\"NkV_NjgzM34gfn5ERUx_MTIvMjcvMjAyNSAwNTozMH5CTFJ_MTIvMjcvMjAyNSAwODoyNX5_\",\"legs\":[{\"legKey\":\"NjM5MDI0MTAyMDAwMDAwMDAwITZFITY4MzMhICFERUwhQkxSITk5MTI1MjI-\",\"legDetails\":{\"destination\":\"CEB\",\"origin\":\"MAA\",\"arrival\":\"2025-12-27T08:25:00\",\"departure\":\"2025-12-27T05:30:00\",\"identifier\":{\"identifier\":null,\"carrierCode\":\"\",\"opSuffix\":\"\"},\"utcarrival\":\"2025-12-27T02:55:00Z\",\"utcdeparture\":\"2025-12-27T00:00:00Z\",\"adjustedCapacity\":0,\"arrivalTerminal\":\"1\",\"arrivalTimeVariant\":0,\"backMoveDays\":0,\"capacity\":0,\"changeOfDirection\":false,\"codeShareIndicator\":0,\"departureTerminal\":\"1\",\"departureTimeVariant\":0,\"equipmentType\":\"321\",\"equipmentTypeSuffix\":\"32P\",\"eTicket\":true,\"irop\":false,\"lid\":0,\"marketingCode\":null,\"marketingOverride\":false,\"onTime\":null,\"operatedByText\":null,\"operatingCarrier\":null,\"operatingFlightNumber\":null,\"operatingOpSuffix\":null,\"outMoveDays\":0,\"prbcCode\":\"C220\",\"scheduleServiceType\":\"J\",\"sold\":0,\"status\":0,\"subjectToGovtApproval\":false,\"originName\":\"Indira Gandhi International Airport\",\"destinationName\":\"Kempegowda International Airport\",\"originCityName\":\"Delhi\",\"destinationCityName\":\"Bengaluru\"},\"designator\":null,\"ssrs\":null}],\"designator\":{\"destination\":\"CEB\",\"origin\":\"MAA\",\"arrival\":\"2025-12-27T08:25:00\",\"departure\":\"2025-12-27T05:30:00\"},\"operatedByText\":null,\"isSeatmapViewable\":true,\"baggageAllowanceWeight\":0,\"baggageAllowanceUsed\":false,\"baggageAllowanceWeightType\":0,\"boardingSequence\":null,\"barcodestring\":null,\"liftStatus\":null,\"hasInfant\":false,\"tickets\":null,\"bundleCode\":null,\"isToShowOTB\":false,\"okToBoardValue\":false,\"seats\":null,\"ssrs\":null,\"seatmapReference\":\"NkUhNjgzMyEgITYzOTAyNDEwMjAwMDAwMDAwMCFERUwhQkxS\",\"externalIdentifier\":null,\"international\":false,\"passengerSegment\":null,\"productClass\":\"R\"}]}]}],\"agentCode\":null,\"agentCountryCode\":null}";

// 5. HYD -> CEB
const MTI_HYD_CEB = "{\"lob\":\"Flight\",\"userPersona\":\"B2C\",\"subPersona\":\"ANONYMOUS\",\"totalUserBookingCount\":null,\"customerType\":\"REPEAT\",\"partnerInfo\":null,\"travelType\":\"Domestic\",\"priceBreakdown\":[{\"id\":\"NkV_NjgzM34gfn5ERUx_MTIvMjcvMjAyNSAwNTozMH5CTFJ_MTIvMjcvMjAyNSAwODoyNX5_\",\"baseAmount\":\"6312\",\"additionalAmounts\":[{\"name\":\"totalInfantPrice\",\"amount\":\"0\"},{\"name\":\"totalSSRPrice\",\"amount\":\"0\"},{\"name\":\"totalTax\",\"amount\":\"809\"},{\"name\":\"pointsBalanceDue\",\"amount\":\"0\"},{\"name\":\"refundAmount\",\"amount\":\"0\"},{\"name\":\"refundPoint\",\"amount\":\"0\"},{\"name\":\"CashEquilant\",\"amount\":\"0\"},{\"name\":\"CashUsed\",\"amount\":\"0\"}]}],\"metadata\":{\"bookingDetails\":{\"bookingKey\":null,\"pnrType\":\"Oneway\",\"recordLocator\":null,\"parentRecordLocator\":\"\",\"numericRecordLocator\":null,\"bookingStatus\":\"Pending\",\"paymentStatus\":\"Pending\",\"channelType\":0,\"currencyCode\":\"INR\",\"bookedDate\":\"2025-12-26T07:38:33.4862825Z\",\"createdDate\":null,\"expirationDate\":null,\"modifiedDate\":null,\"cancelledDate\":null,\"holdDate\":null,\"createdByAgent\":\"0\",\"createdByRoleCode\":null,\"owningCarrierCode\":null,\"changeAllowed\":true,\"recordLocators\":null,\"showAutoRefundPopUp\":false,\"hasModification\":true,\"specialFareCode\":null,\"promoCode\":null,\"isRedeemTransaction\":false},\"isBookingStateValid\":true,\"journeysDetail\":[{\"journeyKey\":\"NkV_NjgzM34gfn5ERUx_MTIvMjcvMjAyNSAwNTozMH5CTFJ_MTIvMjcvMjAyNSAwODoyNX5_\",\"productClass\":\"R\",\"flightType\":\"NonStop\",\"stops\":0,\"specialFareCode\":null,\"promoCode\":null,\"journeydetail\":{\"destination\":\"CEB\",\"origin\":\"HYD\",\"arrival\":\"2025-12-27T08:25:00\",\"departure\":\"2025-12-27T05:30:00\",\"utcarrival\":\"2025-12-27T02:55:00Z\",\"utcdeparture\":\"2025-12-27T00:00:00Z\",\"identifier\":null,\"destinationName\":\"Kempegowda International Airport\",\"originName\":\"Indira Gandhi International Airport\",\"originCityName\":\"Delhi\",\"destinationCityName\":\"Bengaluru\",\"baggageData\":{\"handBaggageWeight\":7,\"checkinBaggageWeight\":15,\"checkinLimitPerPiece\":0,\"handBaggageCount\":1,\"checkinBaggageCount\":0}},\"segments\":[{\"segmentDetails\":{\"destination\":\"CEB\",\"origin\":\"HYD\",\"arrival\":\"2025-12-27T08:25:00\",\"departure\":\"2025-12-27T05:30:00\",\"utcarrival\":\"2025-12-27T02:55:00Z\",\"utcdeparture\":\"2025-12-27T00:00:00Z\",\"identifier\":{\"identifier\":\"6833\",\"carrierCode\":\"6E\",\"opSuffix\":null},\"destinationName\":\"Kempegowda International Airport\",\"originName\":\"Indira Gandhi International Airport\",\"originCityName\":\"Delhi\",\"destinationCityName\":\"Bengaluru\",\"isCodeShareMealMsgRequired\":null},\"segmentKey\":\"NkV_NjgzM34gfn5ERUx_MTIvMjcvMjAyNSAwNTozMH5CTFJ_MTIvMjcvMjAyNSAwODoyNX5_\",\"legs\":[{\"legKey\":\"NjM5MDI0MTAyMDAwMDAwMDAwITZFITY4MzMhICFERUwhQkxSITk5MTI1MjI-\",\"legDetails\":null,\"designator\":{\"destination\":\"CEB\",\"origin\":\"HYD\",\"arrival\":\"2025-12-27T08:25:00\",\"departure\":\"2025-12-27T05:30:00\"},\"ssrs\":null}],\"designator\":{\"destination\":\"CEB\",\"origin\":\"HYD\",\"arrival\":\"2025-12-27T08:25:00\",\"departure\":\"2025-12-27T05:30:00\"},\"operatedByText\":null,\"isSeatmapViewable\":true,\"baggageAllowanceWeight\":0,\"baggageAllowanceUsed\":false,\"baggageAllowanceWeightType\":0,\"boardingSequence\":null,\"barcodestring\":null,\"liftStatus\":null,\"hasInfant\":false,\"tickets\":null,\"bundleCode\":null,\"isToShowOTB\":false,\"okToBoardValue\":false,\"seats\":null,\"ssrs\":null,\"seatmapReference\":\"NkUhNjgzMyEgITYzOTAyNDEwMjAwMDAwMDAwMCFERUwhQkxS\",\"externalIdentifier\":null,\"international\":false,\"passengerSegment\":null,\"productClass\":\"R\"}]}]}],\"agentCode\":null,\"agentCountryCode\":null}";

// =============================================================================
//  SCENARIO CONFIGURATION
// =============================================================================

const DEFAULT_FILTER = { "options": [{"enable":"true","paymentMethodType":"CARD"},{"enable":"true","paymentMethodType":"NB"},{"enable":"true","paymentMethodType":"UPI"},{"enable":"true","paymentMethodType":"WALLET","paymentMethods":["PHONEPE","PAYTM","MOBIKWIK","FREECHARGE","ALIPAY","NAV_VOUCHERS"]},{"enable":"true","paymentMethodType":"REWARD","paymentMethods":["CAPILLARY_VOUCHER","CAPILLARY_REWARD"]},{"enable":"true","paymentMethodType":"MERCHANT_CONTAINER","paymentMethods":["NAV_AGENT_WALLET","HOLD_AND_PAY","BSP"]}], "allowDefaultOptions": true };
const AGENT_FILTER = { "options": [{"enable":"true","paymentMethodType":"MERCHANT_CONTAINER","paymentMethods":["NAV_AGENT_WALLET","BSP"]}], "allowDefaultOptions": false };

const DEFAULT_RULES = [
    { "payment_method_type": "MERCHANT_CONTAINER", "fee": "199.0", "fee_description": "Convenience fees" },
    { "payment_method_type": "NB", "fee": "199.0", "fee_description": "Convenience fees" },
    { "payment_method_type": "UPI", "fee": "199.0", "fee_description": "Convenience fees" },
    { "payment_method_type": "CARD", "fee": "200.0", "fee_description": "Reward Redemption Fee", "applicable_per_unit": true }
];
const AGENT_RULES = [ { "payment_method_type": "MERCHANT_CONTAINER", "fee": "199.0", "fee_description": "Convenience fees" } ];

const SCENARIOS = {
    "DEL_MNL": { filter: DEFAULT_FILTER, rules: DEFAULT_RULES, check: true, mti: MTI_DEL_MNL, reward: false },
    "BOM_MNL": { filter: AGENT_FILTER, rules: AGENT_RULES, check: true, mti: MTI_BOM_MNL, reward: false },
    "BLR_CEB": { filter: DEFAULT_FILTER, rules: DEFAULT_RULES, check: false, mti: MTI_BLR_CEB, reward: false },
    "MAA_CEB": { filter: DEFAULT_FILTER, rules: DEFAULT_RULES, check: false, mti: MTI_MAA_CEB, reward: false },
    "HYD_CEB": { filter: DEFAULT_FILTER, rules: DEFAULT_RULES, check: false, mti: MTI_HYD_CEB, reward: true }
};

app.post('/create-session', async (req, res) => {
    try {
        const { amount, currency, navToken, airlineName, searchData, userType, language } = req.body;
        const sessionPNR = generatePNR();
        const { from, to } = searchData;

        console.log(`Creating Session: ${from} -> ${to} | Currency: ${currency} | User: ${userType} | Lang: ${language}`);

        // --- LOOKUP SCENARIO BY ROUTE ---
        const routeKey = `${from}_${to}`;
        
        let finalScenarioKey = routeKey;
        if(routeKey === "BOM_MNL") finalScenarioKey = "BOM_MNL"; 

        let scenario = SCENARIOS[finalScenarioKey];

        // Fallback if route is not in list
        if (!scenario) {
            console.log("No scenario found for route, defaulting to DEL_MNL logic");
            scenario = SCENARIOS["DEL_MNL"];
        }

        console.log(`👉 USING SCENARIO: ${finalScenarioKey}`);

        let payload = {
            "order_id": `PAH-${Date.now()}`,
            "amount": "2000",
            "currency": currency || "INR",
            "customer_id": "TestCUst1111113",
            "customer_email": "krishna.juspay@juspay.in",
            "customer_phone": "7093125824",
            "mobile_country_code": "91",
            "payment_page_client_id": "cebu",
            "action": "paymentPage",
            "return_url": `http://localhost:3000?status=success&airline=${airlineName}&pnr=${sessionPNR}`,
            "merchant_view_url": "",
            "description": `Flight from ${from} to ${to}`,
            "metadata.JUSPAY:gateway_reference_id": "flt",
            "udf3": "RCTT", "udf4": "Arora", "udf6": navToken, "udf7": "20240903", "udf10": "NEW_Ios",
            "merchant_session_identifier": navToken,
            "metadata.NAVITAIRE:session_expiry_in_sec": "900",
            "options": { "get_client_auth_token": true },
            "metadata.webhook_url": "https://api-uat-skyplus.goindigo.in/postpayment/v1/payment/webhook",
            "metadata.expiryInMins": "12",
            
            // --- NEW: INJECT LANGUAGE ---
            "language": language || "en",

            // --- INJECT HARDCODED VALUES ---
            "disable_merchant_integrity_check": scenario.check,
            "payment_filter": scenario.filter,
            "add_on_amount_rules": scenario.rules,
            "merchant_transient_info": scenario.mti
        };

        if (scenario.reward) {
            payload.reward_rules = [{
                "conversion_ratio": 1, "flow_type": "BURN", "max_redeemable_points": 1000,
                "main_redeemable_points": 1000, "payment_method": "CAPILLARY_REWARD",
                "reward_buckets": [{ "cash_eq": "1000", "id": "6fae5307", "points": "1000" }],
                "user_balance": 1000
            }];
        }

        const response = await axios.post('https://sandbox.juspay.in/session', payload, {
            headers: { 'Authorization': JUSPAY_AUTH, 'Content-Type': 'application/json' }
        });

        res.json({ url: response.data.payment_links.web, sentPayload: payload });
    } catch (error) {
        console.error("❌ ERROR:", error.response?.data || error.message);
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/payment/eligibility', (req, res) => {
    // ... (Eligibility logic remains the same) ...
    res.json([]); // Simplified for brevity as logic didn't change
});

app.listen(3001, () => console.log('🚀 Server running on '));