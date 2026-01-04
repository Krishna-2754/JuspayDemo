const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path'); // REQUIRED FOR DEPLOYMENT

const app = express();
app.use(express.json());
app.use(cors());

// --- 1. SERVE FRONTEND (This makes the HTML visible) ---
app.use(express.static(path.join(__dirname, 'public')));

// Basic Auth (Placeholder)
const JUSPAY_AUTH = 'Basic dummy';

const generatePNR = () => Math.random().toString(36).substring(2, 8).toUpperCase();

// --- API ENDPOINTS (Mocking Navitaire) ---
app.post('/api/nsk/v2/token', (req, res) => res.json({ "data": { "token": "JWT_NAV_" + Date.now(), "idleTimeoutInMinutes": 15 } }));
app.post('/api/nsk/v4/availability/search/simple', (req, res) => res.json({ "data": { "results": [] } }));
app.post('/api/nsk/v4/trip/sell', (req, res) => res.json({ "data": { "currencyCode": "INR", "breakdown": { "totalAmount": 2000.0 } } }));
app.post('/api/nsk/v3/booking', (req, res) => res.sendStatus(200));
app.post('/api/nsk/v5/booking/payments', (req, res) => res.sendStatus(200));
app.put('/api/nsk/v3/booking', (req, res) => res.sendStatus(200));

// =============================================================================
// PASTE YOUR MTI CONSTANTS HERE (MTI_MNL_SUG, MTI_SIN_MNL, etc.)
// =============================================================================
// (I have hidden them to save space, but ensure all your MTI_ strings are present in your file)
const MTI_MNL_SUG = "{\"lob\":\"Flight\",\"userPersona\":\"B2C\",\"subPersona\":\"MEMBER\",\"totalUserBookingCount\":\"4\",\"customerType\":\"REPEAT\",\"partnerInfo\":null,\"travelType\":\"Domestic\",\"priceBreakdown\":[{\"id\":\"NkV_MjU4Mn4gfn5CTFJ_MTIvMzEvMjAyNSAxMDo1MH5IRE9_MTIvMzEvMjAyNSAxMzoyNX5_\",\"baseAmount\":\"5403\",\"additionalAmounts\":[{\"name\":\"totalInfantPrice\",\"amount\":\"1\"},{\"name\":\"totalSSRPrice\",\"amount\":\"0\"},{\"name\":\"totalTax\",\"amount\":\"1260\"},{\"name\":\"pointsBalanceDue\",\"amount\":\"0\"},{\"name\":\"refundAmount\",\"amount\":\"0\"},{\"name\":\"refundPoint\",\"amount\":\"0\"},{\"name\":\"CashEquilant\",\"amount\":\"0\"},{\"name\":\"CashUsed\",\"amount\":\"0\"}]},{\"id\":\"NkV_MjU4Mn4gfn5CTFJ_MTIvMzEvMjAyNSAxMDo1MH5IRE9_MTIvMzEvMjAyNSAxMzoyNX5_\",\"baseAmount\":\"5403\",\"additionalAmounts\":[{\"name\":\"totalInfantPrice\",\"amount\":\"1\"},{\"name\":\"totalSSRPrice\",\"amount\":\"0\"},{\"name\":\"totalTax\",\"amount\":\"1260\"},{\"name\":\"pointsBalanceDue\",\"amount\":\"0\"},{\"name\":\"refundAmount\",\"amount\":\"0\"},{\"name\":\"refundPoint\",\"amount\":\"0\"},{\"name\":\"CashEquilant\",\"amount\":\"0\"},{\"name\":\"CashUsed\",\"amount\":\"0\"}]}],\"metadata\":{\"bookingDetails\":{\"bookingKey\":null,\"pnrType\":\"Multicity\",\"recordLocator\":null,\"parentRecordLocator\":\"\",\"numericRecordLocator\":null,\"bookingStatus\":\"Pending\",\"paymentStatus\":\"Pending\",\"channelType\":0,\"currencyCode\":\"INR\",\"bookedDate\":\"2025-12-29T18:11:20.6389061Z\",\"createdDate\":null,\"expirationDate\":null,\"modifiedDate\":null,\"cancelledDate\":null,\"holdDate\":null,\"createdByAgent\":\"0\",\"createdByRoleCode\":null,\"owningCarrierCode\":null,\"changeAllowed\":true,\"recordLocators\":null,\"showAutoRefundPopUp\":false,\"hasModification\":true,\"specialFareCode\":null,\"promoCode\":null,\"isRedeemTransaction\":false},\"isBookingStateValid\":true,\"journeysDetail\":[{\"journeyKey\":\"NkV_IDQ3N34gfn5ERUx_MTIvMzAvMjAyNSAyMTozMH5CTFJ_MTIvMzEvMjAyNSAwMDoyNX5_\",\"productClass\":\"N\",\"flightType\":\"NonStop\",\"stops\":0,\"specialFareCode\":null,\"promoCode\":null,\"journeydetail\":{\"destination\":\"SUG\",\"origin\":\"MNL\",\"arrival\":\"2025-12-31T00:25:00\",\"departure\":\"2025-12-30T21:30:00\",\"utcarrival\":\"2025-12-30T18:55:00Z\",\"utcdeparture\":\"2025-12-30T16:00:00Z\",\"identifier\":null,\"destinationName\":\"Kempegowda International Airport\",\"originName\":\"Indira Gandhi International Airport\",\"originCityName\":\"Delhi\",\"destinationCityName\":\"Bengaluru\",\"baggageData\":{\"handBaggageWeight\":7,\"checkinBaggageWeight\":15,\"checkinLimitPerPiece\":0,\"handBaggageCount\":1,\"checkinBaggageCount\":0}},\"segments\":[{\"segmentDetails\":{\"destination\":\"SUG\",\"origin\":\"MNL\",\"arrival\":\"2025-12-31T00:25:00\",\"departure\":\"2025-12-30T21:30:00\",\"utcarrival\":\"2025-12-30T18:55:00Z\",\"utcdeparture\":\"2025-12-30T16:00:00Z\",\"identifier\":{\"identifier\":\"477\",\"carrierCode\":\"6E\",\"opSuffix\":null},\"destinationName\":\"Kempegowda International Airport\",\"originName\":\"Indira Gandhi International Airport\",\"originCityName\":\"Delhi\",\"destinationCityName\":\"Bengaluru\",\"isCodeShareMealMsgRequired\":null},\"segmentKey\":\"NkV_IDQ3N34gfn5ERUx_MTIvMzAvMjAyNSAyMTozMH5CTFJ_MTIvMzEvMjAyNSAwMDoyNX5_\",\"legs\":[{\"legKey\":\"NjM5MDI3MjcwMDAwMDAwMDAwITZFITQ3NyEgIURFTCFCTFIhOTkxODQ1NQ--\",\"legDetails\":{\"destination\":\"SUG\",\"origin\":\"MNL\",\"arrival\":\"2025-12-31T00:25:00\",\"departure\":\"2025-12-30T21:30:00\",\"identifier\":{\"identifier\":null,\"carrierCode\":\"\",\"opSuffix\":\"\"},\"utcarrival\":\"2025-12-30T18:55:00Z\",\"utcdeparture\":\"2025-12-30T16:00:00Z\",\"adjustedCapacity\":0,\"arrivalTerminal\":\"1\",\"arrivalTimeVariant\":0,\"backMoveDays\":0,\"capacity\":220,\"changeOfDirection\":false,\"codeShareIndicator\":0,\"departureTerminal\":\"1\",\"departureTimeVariant\":0,\"equipmentType\":\"321\",\"equipmentTypeSuffix\":\"32P\",\"eTicket\":true,\"irop\":false,\"lid\":220,\"marketingCode\":null,\"marketingOverride\":false,\"onTime\":null,\"operatedByText\":null,\"operatingCarrier\":null,\"operatingFlightNumber\":null,\"operatingOpSuffix\":null,\"outMoveDays\":365,\"prbcCode\":\"C220\",\"scheduleServiceType\":\"J\",\"sold\":195,\"status\":0,\"subjectToGovtApproval\":false,\"originName\":\"Indira Gandhi International Airport\",\"destinationName\":\"Kempegowda International Airport\",\"originCityName\":\"Delhi\",\"destinationCityName\":\"Bengaluru\"},\"designator\":null,\"ssrs\":null}],\"designator\":{\"destination\":\"SUG\",\"origin\":\"MNL\",\"arrival\":\"2025-12-31T00:25:00\",\"departure\":\"2025-12-30T21:30:00\"},\"operatedByText\":null,\"isSeatmapViewable\":true,\"baggageAllowanceWeight\":0,\"baggageAllowanceUsed\":false,\"baggageAllowanceWeightType\":0,\"boardingSequence\":null,\"barcodestring\":null,\"liftStatus\":null,\"hasInfant\":false,\"tickets\":null,\"bundleCode\":null,\"isToShowOTB\":false,\"okToBoardValue\":false,\"seats\":null,\"ssrs\":null,\"seatmapReference\":\"NkUhIDQ3NyEgITYzOTAyNzI3MDAwMDAwMDAwMCFERUwhQkxS\",\"externalIdentifier\":null,\"international\":false,\"passengerSegment\":null,\"productClass\":\"N\"}]},{\"journeyKey\":\"NkV_MjU4Mn4gfn5CTFJ_MTIvMzEvMjAyNSAxMDo1MH5IRE9_MTIvMzEvMjAyNSAxMzoyNX5_\",\"productClass\":\"N\",\"flightType\":\"NonStop\",\"stops\":0,\"specialFareCode\":null,\"promoCode\":null,\"journeydetail\":{\"destination\":\"MNL\",\"origin\":\"SUG\",\"arrival\":\"2025-12-31T13:25:00\",\"departure\":\"2025-12-31T10:50:00\",\"utcarrival\":\"2025-12-31T07:55:00Z\",\"utcdeparture\":\"2025-12-31T05:20:00Z\",\"identifier\":null,\"destinationName\":\"Hindon Airport\",\"originName\":\"Kempegowda International Airport\",\"originCityName\":\"Bengaluru\",\"destinationCityName\":\"Ghaziabad\",\"baggageData\":{\"handBaggageWeight\":7,\"checkinBaggageWeight\":15,\"checkinLimitPerPiece\":0,\"handBaggageCount\":1,\"checkinBaggageCount\":0}},\"segments\":[{\"segmentDetails\":{\"destination\":\"MNL\",\"origin\":\"SUG\",\"arrival\":\"2025-12-31T13:25:00\",\"departure\":\"2025-12-31T10:50:00\",\"utcarrival\":\"2025-12-31T07:55:00Z\",\"utcdeparture\":\"2025-12-31T05:20:00Z\",\"identifier\":{\"identifier\":\"2582\",\"carrierCode\":\"6E\",\"opSuffix\":null},\"destinationName\":\"Hindon Airport\",\"originName\":\"Kempegowda International Airport\",\"originCityName\":\"Bengaluru\",\"destinationCityName\":\"Ghaziabad\",\"isCodeShareMealMsgRequired\":null},\"segmentKey\":\"NkV_MjU4Mn4gfn5CTFJ_MTIvMzEvMjAyNSAxMDo1MH5IRE9_MTIvMzEvMjAyNSAxMzoyNX5_\",\"legs\":[{\"legKey\":\"NjM5MDI3NzUwMDAwMDAwMDAwITZFITI1ODIhICFCTFIhSERPITEwNjM2NTc5\",\"legDetails\":{\"destination\":\"MNL\",\"origin\":\"SUG\",\"arrival\":\"2025-12-31T13:25:00\",\"departure\":\"2025-12-31T10:50:00\",\"identifier\":{\"identifier\":null,\"carrierCode\":\"\",\"opSuffix\":\"\"},\"utcarrival\":\"2025-12-31T07:55:00Z\",\"utcdeparture\":\"2025-12-31T05:20:00Z\",\"adjustedCapacity\":0,\"arrivalTerminal\":null,\"arrivalTimeVariant\":0,\"backMoveDays\":0,\"capacity\":186,\"changeOfDirection\":false,\"codeShareIndicator\":0,\"departureTerminal\":\"1\",\"departureTimeVariant\":0,\"equipmentType\":\"320\",\"equipmentTypeSuffix\":\"32S\",\"eTicket\":true,\"irop\":false,\"lid\":186,\"marketingCode\":null,\"marketingOverride\":false,\"onTime\":null,\"operatedByText\":null,\"operatingCarrier\":null,\"operatingFlightNumber\":null,\"operatingOpSuffix\":null,\"outMoveDays\":365,\"prbcCode\":\"Y186\",\"scheduleServiceType\":\"J\",\"sold\":83,\"status\":0,\"subjectToGovtApproval\":false,\"originName\":\"Kempegowda International Airport\",\"destinationName\":\"Hindon Airport\",\"originCityName\":\"Bengaluru\",\"destinationCityName\":\"Ghaziabad\"},\"designator\":null,\"ssrs\":null}],\"designator\":{\"destination\":\"MNL\",\"origin\":\"SUG\",\"arrival\":\"2025-12-31T13:25:00\",\"departure\":\"2025-12-31T10:50:00\"},\"operatedByText\":null,\"isSeatmapViewable\":true,\"baggageAllowanceWeight\":0,\"baggageAllowanceUsed\":false,\"baggageAllowanceWeightType\":0,\"boardingSequence\":null,\"barcodestring\":null,\"liftStatus\":null,\"hasInfant\":false,\"tickets\":null,\"bundleCode\":null,\"isToShowOTB\":false,\"okToBoardValue\":false,\"seats\":null,\"ssrs\":null,\"seatmapReference\":\"NkUhMjU4MiEgITYzOTAyNzc1MDAwMDAwMDAwMCFCTFIhSERP\",\"externalIdentifier\":null,\"international\":false,\"passengerSegment\":null,\"productClass\":\"N\"}]}],\"priceBreakdown\":{\"currencyCode\":\"INR\",\"balanceDue\":13949.0,\"totalAmount\":13949.0,\"totalBaseAmount\":11871.0,\"originalTotal\":13947.0,\"totalPaid\":null,\"pointsBalanceDue\":0.0,\"totalPoints\":0.0,\"totalPointsToCollect\":0.0,\"seatAmount\":null,\"convenienceFee\":0.0,\"bookingPromoCode\":null,\"totalPotentialPoints\":0.0,\"redeemptionFee\":null,\"journeywiseList\":[{\"journeyKey\":\"NkV_IDQ3N34gfn5ERUx_MTIvMzAvMjAyNSAyMTozMH5CTFJ_MTIvMzEvMjAyNSAwMDoyNX5_\",\"journeydetail\":{\"destination\":\"SUG\",\"destinationName\":\"Kempegowda International Airport\",\"origin\":\"MNL\",\"originName\":\"Indira Gandhi International Airport\",\"arrival\":\"2025-12-31T00:25:00\",\"departure\":\"2025-12-30T21:30:00\",\"utcarrival\":\"2025-12-30T18:55:00Z\",\"utcdeparture\":\"2025-12-30T16:00:00Z\",\"identifier\":null,\"destinationCityName\":\"Bengaluru\",\"originCityName\":\"Delhi\"},\"totalPoints\":0,\"totalDiscount\":0.0,\"infantPrice\":1.0,\"infantCount\":1,\"totalInfantPrice\":1.0,\"totalPaxPrice\":7285.0,\"totalSSRPrice\":0.0,\"totalTax\":816.0,\"totalAmount\":7286.0,\"totalBaseAmount\":6469.0,\"originalTotal\":null,\"jusPayPricebreakup\":{\"totalInfantPrice\":1.0,\"totalPaxPrice\":7285.0,\"totalSSRPrice\":0.0,\"totalTax\":816.0,\"totalAmount\":7286.0,\"totalBaseFare\":6470.0,\"pointsBalanceDue\":0,\"CashUsed\":0.0,\"CashEquilant\":0.0,\"refundAmount\":0.0,\"refundPoint\":0.0},\"paxFares\":[{\"fareDiscountCode\":null,\"passengerDiscountCode\":null,\"passengerType\":\"ADT\",\"fareAmount\":7285.0,\"serviceCharges\":[{\"amount\":6469.0,\"detail\":null,\"code\":null,\"currencyCode\":\"INR\",\"points\":0,\"type\":0},{\"amount\":50.0,\"detail\":\"MNL-SUG\",\"code\":\"PHF\",\"currencyCode\":\"INR\",\"points\":0,\"type\":4},{\"amount\":50.0,\"detail\":\"MNL-SUG\",\"code\":\"RCF\",\"currencyCode\":\"INR\",\"points\":0,\"type\":4},{\"amount\":236.0,\"detail\":\"MNL-SUG\",\"code\":\"ASF\",\"currencyCode\":\"INR\",\"points\":0,\"type\":4},{\"amount\":152.0,\"detail\":\"MNL-SUG\",\"code\":\"UDF\",\"currencyCode\":\"INR\",\"points\":0,\"type\":4},{\"amount\":328.0,\"detail\":\"MNL-SUG\",\"code\":\"07GST\",\"currencyCode\":\"INR\",\"points\":0,\"type\":5}],\"multiplier\":1,\"points\":0}],\"taxAmountList\":[{\"feeCode\":\"PHF\",\"feeName\":\"MNL-SUG\",\"feeCodeName\":\"Cute Charge\",\"value\":50.0,\"type\":4,\"currencyType\":null},{\"feeCode\":\"RCF\",\"feeName\":\"MNL-SUG\",\"feeCodeName\":\"Regional Connectivity Charge\",\"value\":50.0,\"type\":4,\"currencyType\":null},{\"feeCode\":\"ASF\",\"feeName\":\"MNL-SUG\",\"feeCodeName\":\"Aviation Security Fee\",\"value\":236.0,\"type\":4,\"currencyType\":null},{\"feeCode\":\"UDF\",\"feeName\":\"MNL-SUG\",\"feeCodeName\":\"User Development fee\",\"value\":152.0,\"type\":4,\"currencyType\":null},{\"feeCode\":\"07GST\",\"feeName\":\"MNL-SUG\",\"feeCodeName\":\"GST for Delhi\",\"value\":328.0,\"type\":5,\"currencyType\":null}],\"ssrAmountList\":[],\"passengerCount\":1,\"airfareCharges\":6469.0,\"pointsBalanceDue\":null},{\"journeyKey\":\"NkV_MjU4Mn4gfn5CTFJ_MTIvMzEvMjAyNSAxMDo1MH5IRE9_MTIvMzEvMjAyNSAxMzoyNX5_\",\"journeydetail\":{\"destination\":\"MNL\",\"destinationName\":\"Hindon Airport\",\"origin\":\"SUG\",\"originName\":\"Kempegowda International Airport\",\"arrival\":\"2025-12-31T13:25:00\",\"departure\":\"2025-12-31T10:50:00\",\"utcarrival\":\"2025-12-31T07:55:00Z\",\"utcdeparture\":\"2025-12-31T05:20:00Z\",\"identifier\":null,\"destinationCityName\":\"Ghaziabad\",\"originCityName\":\"Bengaluru\"},\"totalPoints\":0,\"totalDiscount\":0.0,\"infantPrice\":1.0,\"infantCount\":1,\"totalInfantPrice\":1.0,\"totalPaxPrice\":6662.0,\"totalSSRPrice\":0.0,\"totalTax\":1260.0,\"totalAmount\":6663.0,\"totalBaseAmount\":5402.0,\"originalTotal\":null,\"jusPayPricebreakup\":{\"totalInfantPrice\":1.0,\"totalPaxPrice\":6662.0,\"totalSSRPrice\":0.0,\"totalTax\":1260.0,\"totalAmount\":6663.0,\"totalBaseFare\":5403.0,\"pointsBalanceDue\":0,\"CashUsed\":0.0,\"CashEquilant\":0.0,\"refundAmount\":0.0,\"refundPoint\":0.0},\"paxFares\":[{\"fareDiscountCode\":null,\"passengerDiscountCode\":null,\"passengerType\":\"ADT\",\"fareAmount\":6662.0,\"serviceCharges\":[{\"amount\":5402.0,\"detail\":null,\"code\":null,\"currencyCode\":\"INR\",\"points\":0,\"type\":0},{\"amount\":50.0,\"detail\":\"SUG-MNL\",\"code\":\"PHF\",\"currencyCode\":\"INR\",\"points\":0,\"type\":4},{\"amount\":50.0,\"detail\":\"SUG-MNL\",\"code\":\"RCF\",\"currencyCode\":\"INR\",\"points\":0,\"type\":4},{\"amount\":236.0,\"detail\":\"SUG-MNL\",\"code\":\"ASF\",\"currencyCode\":\"INR\",\"points\":0,\"type\":4},{\"amount\":649.0,\"detail\":\"SUG-MNL\",\"code\":\"UDF\",\"currencyCode\":\"INR\",\"points\":0,\"type\":4},{\"amount\":275.0,\"detail\":\"SUG-MNL\",\"code\":\"29GST\",\"currencyCode\":\"INR\",\"points\":0,\"type\":5}],\"multiplier\":1,\"points\":0}],\"taxAmountList\":[{\"feeCode\":\"PHF\",\"feeName\":\"SUG-MNL\",\"feeCodeName\":\"Cute Charge\",\"value\":50.0,\"type\":4,\"currencyType\":null},{\"feeCode\":\"RCF\",\"feeName\":\"SUG-MNL\",\"feeCodeName\":\"Regional Connectivity Charge\",\"value\":50.0,\"type\":4,\"currencyType\":null},{\"feeCode\":\"ASF\",\"feeName\":\"SUG-MNL\",\"feeCodeName\":\"Aviation Security Fee\",\"value\":236.0,\"type\":4,\"currencyType\":null},{\"feeCode\":\"UDF\",\"feeName\":\"SUG-MNL\",\"feeCodeName\":\"User Development fee\",\"value\":649.0,\"type\":4,\"currencyType\":null},{\"feeCode\":\"29GST\",\"feeName\":\"SUG-MNL\",\"feeCodeName\":\"GST for Karnataka\",\"value\":275.0,\"type\":5,\"currencyType\":null}],\"ssrAmountList\":[],\"passengerCount\":1,\"airfareCharges\":5402.0,\"pointsBalanceDue\":null}],\"refundList\":null},\"passengers\":[{\"passengerKey\":\"MCFBRFQ-\",\"services\":null,\"specialServices\":null,\"upgrades\":null,\"spoilage\":null,\"nameChanges\":null,\"convenience\":null,\"infant\":{\"total\":null,\"taxes\":null,\"adjustments\":null,\"charges\":null,\"nationality\":null,\"dateOfBirth\":\"2024-11-25T00:00:00\",\"travelDocuments\":null,\"residentCountry\":null,\"gender\":0,\"name\":{\"first\":\"TestA\",\"middle\":null,\"last\":\"TestA\",\"title\":\"MR\",\"suffix\":null}},\"passengerAlternateKey\":null,\"ExtraSeatTag\":null,\"name\":{\"first\":\"Test\",\"middle\":null,\"last\":\"Test\",\"title\":\"MR\",\"suffix\":null},\"passengerTypeCode\":\"ADT\",\"discountCode\":null,\"bags\":null,\"info\":{\"nationality\":null,\"gender\":1,\"dateOfBirth\":null},\"travelDocuments\":null,\"eTicketNumber\":\"hf876876sagd\",\"seatsAndSsrs\":{\"journeys\":[{\"designator\":{\"destination\":\"SUG\",\"origin\":\"MNL\",\"arrival\":\"2025-12-31T00:25:00\",\"departure\":\"2025-12-30T21:30:00\"},\"segments\":[{\"segmentDetails\":{\"destination\":\"SUG\",\"origin\":\"MNL\",\"arrival\":\"2025-12-31T00:25:00\",\"departure\":\"2025-12-30T21:30:00\",\"utcarrival\":\"2025-12-30T18:55:00Z\",\"utcdeparture\":\"2025-12-30T16:00:00Z\",\"identifier\":{\"identifier\":\"477\",\"carrierCode\":\"6E\",\"opSuffix\":null},\"destinationName\":\"Kempegowda International Airport\",\"originName\":\"Indira Gandhi International Airport\",\"originCityName\":\"Delhi\",\"destinationCityName\":\"Bengaluru\",\"isCodeShareMealMsgRequired\":null},\"segmentKey\":\"NkV_IDQ3N34gfn5ERUx_MTIvMzAvMjAyNSAyMTozMH5CTFJ_MTIvMzEvMjAyNSAwMDoyNX5_\",\"legs\":[{\"legKey\":\"NjM5MDI3MjcwMDAwMDAwMDAwITZFITQ3NyEgIURFTCFCTFIhOTkxODQ1NQ--\",\"legDetails\":null,\"designator\":{\"destination\":\"SUG\",\"origin\":\"MNL\",\"arrival\":\"2025-12-31T00:25:00\",\"departure\":\"2025-12-30T21:30:00\"},\"ssrs\":null}],\"designator\":{\"destination\":\"SUG\",\"origin\":\"MNL\",\"arrival\":\"2025-12-31T00:25:00\",\"departure\":\"2025-12-30T21:30:00\"},\"operatedByText\":null,\"isSeatmapViewable\":true,\"baggageAllowanceWeight\":0,\"baggageAllowanceUsed\":null,\"baggageAllowanceWeightType\":null,\"boardingSequence\":null,\"barcodestring\":\"M1Test/Test            DELBLR6E 0000 364Y000Y00000 009\",\"liftStatus\":\"Default\",\"hasInfant\":true,\"tickets\":null,\"bundleCode\":null,\"isToShowOTB\":false,\"okToBoardValue\":false,\"seats\":[],\"ssrs\":[],\"seatmapReference\":null,\"externalIdentifier\":null,\"international\":false,\"passengerSegment\":null,\"productClass\":null}],\"journeyKey\":\"NkV_IDQ3N34gfn5ERUx_MTIvMzAvMjAyNSAyMTozMH5CTFJ_MTIvMzEvMjAyNSAwMDoyNX5_\"},{\"designator\":{\"destination\":\"MNL\",\"origin\":\"SUG\",\"arrival\":\"2025-12-31T13:25:00\",\"departure\":\"2025-12-31T10:50:00\"},\"segments\":[{\"segmentDetails\":{\"destination\":\"MNL\",\"origin\":\"SUG\",\"arrival\":\"2025-12-31T13:25:00\",\"departure\":\"2025-12-31T10:50:00\",\"utcarrival\":\"2025-12-31T07:55:00Z\",\"utcdeparture\":\"2025-12-31T05:20:00Z\",\"identifier\":{\"identifier\":\"2582\",\"carrierCode\":\"6E\",\"opSuffix\":null},\"destinationName\":\"Hindon Airport\",\"originName\":\"Kempegowda International Airport\",\"originCityName\":\"Bengaluru\",\"destinationCityName\":\"Ghaziabad\",\"isCodeShareMealMsgRequired\":null},\"segmentKey\":\"NkV_MjU4Mn4gfn5CTFJ_MTIvMzEvMjAyNSAxMDo1MH5IRE9_MTIvMzEvMjAyNSAxMzoyNX5_\",\"legs\":[{\"legKey\":\"NjM5MDI3NzUwMDAwMDAwMDAwITZFITI1ODIhICFCTFIhSERPITEwNjM2NTc5\",\"legDetails\":null,\"designator\":{\"destination\":\"MNL\",\"origin\":\"SUG\",\"arrival\":\"2025-12-31T13:25:00\",\"departure\":\"2025-12-31T10:50:00\"},\"ssrs\":null}],\"designator\":{\"destination\":\"MNL\",\"origin\":\"SUG\",\"arrival\":\"2025-12-31T13:25:00\",\"departure\":\"2025-12-31T10:50:00\"},\"operatedByText\":null,\"isSeatmapViewable\":true,\"baggageAllowanceWeight\":0,\"baggageAllowanceUsed\":null,\"baggageAllowanceWeightType\":null,\"boardingSequence\":null,\"barcodestring\":\"M1Test/Test            BLRHDO6E 0000 365Y000Y00000 009\",\"liftStatus\":\"Default\",\"hasInfant\":true,\"tickets\":null,\"bundleCode\":null,\"isToShowOTB\":false,\"okToBoardValue\":false,\"seats\":[],\"ssrs\":[],\"seatmapReference\":null,\"externalIdentifier\":null,\"international\":false,\"passengerSegment\":null,\"productClass\":null}],\"journeyKey\":\"NkV_MjU4Mn4gfn5CTFJ_MTIvMzEvMjAyNSAxMDo1MH5IRE9_MTIvMzEvMjAyNSAxMzoyNX5_\"}]}}],\"extraSeatKeys\":[],\"configSettings\":{\"FareConfig\":[{\"fareType\":\"SAVER\",\"productClass\":\"R\",\"isMealIncluded\":false,\"isStandarSeatIncluded\":false,\"discountOnXLSeat\":50,\"dateChangecode\":\"D01\",\"cancelCode\":\"C01\",\"SSRsIncluded\":\"\",\"baggageCounts\":{\"checkinBaggage\":1,\"handBaggage\":1,\"doubleSeatAddedBaggage\":1,\"tripleSeatAddedBaggage\":1,\"PromoAddedBaggage\":0,\"doubleSeatAddedBaggag\":null,\"studentPromoAddedBaggage\":null},\"baggageWeights\":{\"handBaggage\":7,\"checkinBaggage\":15,\"DoubleSeatAddedBaggage\":10,\"TripleSeatAddedBaggae\":0,\"PromoAddedBaggae\":0,\"StudentPromoAddedBaggae\":null}},{\"fareType\":\"Coupon\",\"productClass\":\"C\",\"isMealIncluded\":true,\"isStandarSeatIncluded\":true,\"discountOnXLSeat\":50,\"dateChangecode\":\"D01\",\"cancelCode\":\"C01\",\"SSRsIncluded\":\"SEAT\",\"baggageCounts\":{\"checkinBaggage\":1,\"handBaggage\":1,\"doubleSeatAddedBaggage\":1,\"tripleSeatAddedBaggage\":1,\"PromoAddedBaggage\":0,\"doubleSeatAddedBaggag\":null,\"studentPromoAddedBaggage\":null},\"baggageWeights\":{\"handBaggage\":7,\"checkinBaggage\":15,\"DoubleSeatAddedBaggage\":10,\"TripleSeatAddedBaggae\":0,\"PromoAddedBaggae\":0,\"StudentPromoAddedBaggae\":null}},{\"fareType\":\"Tactical\",\"productClass\":\"T\",\"isMealIncluded\":false,\"isStandarSeatIncluded\":false,\"discountOnXLSeat\":50,\"dateChangecode\":\"D01\",\"cancelCode\":\"C01\",\"SSRsIncluded\":\"\",\"baggageCounts\":{\"checkinBaggage\":1,\"handBaggage\":1,\"doubleSeatAddedBaggage\":1,\"tripleSeatAddedBaggage\":1,\"PromoAddedBaggage\":0,\"doubleSeatAddedBaggag\":null,\"studentPromoAddedBaggage\":null},\"baggageWeights\":{\"handBaggage\":7,\"checkinBaggage\":15,\"DoubleSeatAddedBaggage\":10,\"TripleSeatAddedBaggae\":0,\"PromoAddedBaggae\":0,\"StudentPromoAddedBaggae\":null}},{\"fareType\":\"Corporate\",\"productClass\":\"F\",\"isMealIncluded\":true,\"isStandarSeatIncluded\":true,\"discountOnXLSeat\":50,\"dateChangecode\":\"D01\",\"cancelCode\":\"C01\",\"SSRsIncluded\":\"SEAT\",\"baggageCounts\":{\"checkinBaggage\":1,\"handBaggage\":1,\"doubleSeatAddedBaggage\":1,\"tripleSeatAddedBaggage\":1,\"PromoAddedBaggage\":0,\"doubleSeatAddedBaggag\":null,\"studentPromoAddedBaggage\":null},\"baggageWeights\":{\"handBaggage\":10,\"checkinBaggage\":15,\"DoubleSeatAddedBaggage\":10,\"TripleSeatAddedBaggae\":0,\"PromoAddedBaggae\":0,\"StudentPromoAddedBaggae\":null}},{\"fareType\":\"Sale\",\"productClass\":\"S\",\"isMealIncluded\":false,\"isStandarSeatIncluded\":false,\"discountOnXLSeat\":50,\"dateChangecode\":\"D01\",\"cancelCode\":\"C01\",\"SSRsIncluded\":\"\",\"baggageCounts\":{\"checkinBaggage\":1,\"handBaggage\":1,\"doubleSeatAddedBaggage\":1,\"tripleSeatAddedBaggage\":1,\"PromoAddedBaggage\":0,\"doubleSeatAddedBaggag\":null,\"studentPromoAddedBaggage\":null},\"baggageWeights\":{\"handBaggage\":7,\"checkinBaggage\":15,\"DoubleSeatAddedBaggage\":10,\"TripleSeatAddedBaggae\":0,\"PromoAddedBaggae\":0,\"StudentPromoAddedBaggae\":null}},{\"fareType\":\"Lite\",\"productClass\":\"B\",\"isMealIncluded\":false,\"isStandarSeatIncluded\":false,\"discountOnXLSeat\":50,\"dateChangecode\":\"D01\",\"cancelCode\":\"C01\",\"SSRsIncluded\":\"\",\"baggageCounts\":{\"checkinBaggage\":1,\"handBaggage\":1,\"doubleSeatAddedBaggage\":1,\"tripleSeatAddedBaggage\":1,\"PromoAddedBaggage\":0,\"doubleSeatAddedBaggag\":null,\"studentPromoAddedBaggage\":null},\"baggageWeights\":{\"handBaggage\":5,\"checkinBaggage\":0,\"DoubleSeatAddedBaggage\":10,\"TripleSeatAddedBaggae\":0,\"PromoAddedBaggae\":0,\"StudentPromoAddedBaggae\":null}},{\"fareType\":\"Return Special\",\"productClass\":\"N\",\"isMealIncluded\":false,\"isStandarSeatIncluded\":false,\"discountOnXLSeat\":50,\"dateChangecode\":\"D01\",\"cancelCode\":\"C01\",\"SSRsIncluded\":\"\",\"baggageCounts\":{\"checkinBaggage\":1,\"handBaggage\":1,\"doubleSeatAddedBaggage\":1,\"tripleSeatAddedBaggage\":1,\"PromoAddedBaggage\":0,\"doubleSeatAddedBaggag\":null,\"studentPromoAddedBaggage\":null},\"baggageWeights\":{\"handBaggage\":7,\"checkinBaggage\":15,\"DoubleSeatAddedBaggage\":10,\"TripleSeatAddedBaggae\":0,\"PromoAddedBaggae\":0,\"StudentPromoAddedBaggae\":null}},{\"fareType\":\"Family\",\"productClass\":\"A\",\"isMealIncluded\":false,\"isStandarSeatIncluded\":false,\"discountOnXLSeat\":50,\"dateChangecode\":\"D01\",\"cancelCode\":\"C01\",\"SSRsIncluded\":\"\",\"baggageCounts\":{\"checkinBaggage\":1,\"handBaggage\":1,\"doubleSeatAddedBaggage\":1,\"tripleSeatAddedBaggage\":1,\"PromoAddedBaggage\":0,\"doubleSeatAddedBaggag\":null,\"studentPromoAddedBaggage\":null},\"baggageWeights\":{\"handBaggage\":7,\"checkinBaggage\":15,\"DoubleSeatAddedBaggage\":10,\"TripleSeatAddedBaggae\":0,\"PromoAddedBaggae\":0,\"StudentPromoAddedBaggae\":null}},{\"fareType\":\"CAPF\",\"productClass\":\"G2\",\"isMealIncluded\":false,\"isStandarSeatIncluded\":false,\"discountOnXLSeat\":50,\"dateChangecode\":\"D01\",\"cancelCode\":\"C01\",\"SSRsIncluded\":\"\",\"baggageCounts\":{\"checkinBaggage\":1,\"handBaggage\":1,\"doubleSeatAddedBaggage\":1,\"tripleSeatAddedBaggage\":1,\"PromoAddedBaggage\":0,\"doubleSeatAddedBaggag\":null,\"studentPromoAddedBaggage\":null},\"baggageWeights\":{\"handBaggage\":7,\"checkinBaggage\":15,\"DoubleSeatAddedBaggage\":10,\"TripleSeatAddedBaggae\":0,\"PromoAddedBaggae\":0,\"StudentPromoAddedBaggae\":null}},{\"fareType\":\"Super 6E\",\"productClass\":\"O\",\"isMealIncluded\":true,\"isStandarSeatIncluded\":true,\"discountOnXLSeat\":50,\"dateChangecode\":\"D01\",\"cancelCode\":\"C01\",\"SSRsIncluded\":\"SEAT,FFWD,PRBG\",\"baggageCounts\":{\"checkinBaggage\":1,\"handBaggage\":1,\"doubleSeatAddedBaggage\":1,\"tripleSeatAddedBaggage\":1,\"PromoAddedBaggage\":0,\"doubleSeatAddedBaggag\":null,\"studentPromoAddedBaggage\":null},\"baggageWeights\":{\"handBaggage\":7,\"checkinBaggage\":25,\"DoubleSeatAddedBaggage\":10,\"TripleSeatAddedBaggae\":0,\"PromoAddedBaggae\":0,\"StudentPromoAddedBaggae\":null}},{\"fareType\":\"Corp Connect\",\"productClass\":\"M\",\"isMealIncluded\":false,\"isStandarSeatIncluded\":true,\"discountOnXLSeat\":50,\"dateChangecode\":\"D01\",\"cancelCode\":\"C01\",\"SSRsIncluded\":\"SEAT\",\"baggageCounts\":{\"checkinBaggage\":1,\"handBaggage\":1,\"doubleSeatAddedBaggage\":1,\"tripleSeatAddedBaggage\":1,\"PromoAddedBaggage\":0,\"doubleSeatAddedBaggag\":null,\"studentPromoAddedBaggage\":null},\"baggageWeights\":{\"handBaggage\":7,\"checkinBaggage\":15,\"DoubleSeatAddedBaggage\":10,\"TripleSeatAddedBaggae\":0,\"PromoAddedBaggae\":0,\"StudentPromoAddedBaggae\":null}},{\"fareType\":\"Flexi\",\"productClass\":\"J\",\"isMealIncluded\":true,\"isStandarSeatIncluded\":true,\"discountOnXLSeat\":50,\"dateChangecode\":\"D01\",\"cancelCode\":\"C01\",\"SSRsIncluded\":\"SEAT\",\"baggageCounts\":{\"checkinBaggage\":1,\"handBaggage\":1,\"doubleSeatAddedBaggage\":1,\"tripleSeatAddedBaggage\":1,\"PromoAddedBaggage\":0,\"doubleSeatAddedBaggag\":null,\"studentPromoAddedBaggage\":null},\"baggageWeights\":{\"handBaggage\":7,\"checkinBaggage\":15,\"DoubleSeatAddedBaggage\":10,\"TripleSeatAddedBaggae\":0,\"PromoAddedBaggae\":0,\"StudentPromoAddedBaggae\":null}}]}},\"agentCode\":null,\"agentCountryCode\":null}";

// (Ensure MTI_SIN_MNL, MTI_MNL_LAO, etc. are also included here exactly as in your original file)
// ... [REST OF YOUR CONSTANTS AND CONFIGURATIONS] ...

// --- ROUTE CONFIGURATION (As provided in your server.js) ---
const SHARED_PAYMENT_FILTER = {
  "options": [
    { "enable": "true", "paymentMethodType": "CARD" },
    { "enable": "true", "paymentMethodType": "NB" },
    { "enable": "true", "paymentMethodType": "UPI" },
    { "enable": "true", "paymentMethodType": "WALLET", "paymentMethods": ["PHONEPE", "PAYTM", "MOBIKWIK", "FREECHARGE", "ALIPAY", "NAV_VOUCHERS"] },
    { "enable": "true", "paymentMethodType": "REWARD", "paymentMethods": ["CAPILLARY_VOUCHER", "CAPILLARY_REWARD"] },
    { "enable": "true", "paymentMethodType": "MERCHANT_CONTAINER", "paymentMethods": ["NAV_AGENT_WALLET", "HOLD_AND_PAY", "BSP"] }
  ],
  "allowDefaultOptions": true
};

const SHARED_PAYMENT_FILTER_MNL_SUG = {
  "options": [
    { "enable": "true", "paymentMethodType": "CARD" },
    { "enable": "true", "paymentMethodType": "NB" },
    { "enable": "true", "paymentMethodType": "UPI" },
    { "enable": "true", "paymentMethodType": "WALLET", "paymentMethods": ["PAYPAL", "GOOGLEPAY"] },
  ],
  "allowDefaultOptions": true
};

const SHARED_PAYMENT_FILTER_MNL_LAO = {
  "options": [
    { "enable": "true", "paymentMethodType": "CARD" },
    { "enable": "true", "paymentMethodType": "NB" },
    { "enable": "true", "paymentMethodType": "UPI" },
    { "enable": "true", "paymentMethodType": "WALLET", "paymentMethods": ["PAYPAL", "GOOGLEPAY"] },
  ],
  "allowDefaultOptions": true
};

const SHARED_PAYMENT_FILTER_MNL_KUL = {
  "options": [
    { "enable": "true", "paymentMethodType": "CARD" },
    { "enable": "true", "paymentMethodType": "NB" },
    { "enable": "true", "paymentMethodType": "UPI" },
    { "enable": "true", "paymentMethodType": "WALLET", "paymentMethods": ["PAYPAL", "GOOGLEPAY"] },
  ],
  "allowDefaultOptions": true
};

const SHARED_ADD_ON_RULES = [
  { "payment_method_type": "MERCHANT_CONTAINER", "fee": "199.0", "fee_description": "Convenience fees" },
  { "payment_method_type": "NB", "fee": "199.0", "fee_description": "Convenience fees" },
  { "payment_method_type": "UPI", "fee": "199.0", "fee_description": "Convenience fees" },
  { "payment_method_type": "CARD", "fee": "200.0", "fee_description": "Reward Redemption Fee", "applicable_per_unit": true }
];

const REWARD_RULES = [{
  "conversion_ratio": 1, "flow_type": "BURN", "max_redeemable_points": 10000,
  "main_redeemable_points": 10000, "payment_method": "CAPILLARY_REWARD",
  "reward_buckets": [{ "cash_eq": "10000", "id": "6fae5307", "points": "10000" }],
  "user_balance": 10000
}];

const PAYMENT_RULES_SIN_MNL = {
  "payment_flows": {
    "price_lock": {
      "status": "OPTIONAL",
      "info": {
        "variants": [
          {
            "id": "fp24",
            "desc": "Lock Price for 24H",
            "lock_amount_type": "EXCLUSIVE",
            "collect_payment_against": "MULTIPLE_ORDER",
            "amount": { "amount_type": "FIXED", "value": "300", "amount_desc": "Price Lock fee" },
            "override_rules": {
              "add_on_amount_rules": [
                {
                  "payment_method_type": "CARD",
                  "fee": "50",
                  "fee_description": "Adding extra money",
                  "sub_details": [{ "payment_method": "VISA", "fee": "10", "fee_description": "Adding extra money" }],
                  "applicable_per_unit": null
                }
              ],
              "payment_filter": {
                "allowDefaultOptions": false,
                "options": [
                  { "paymentMethodType": "NB", "enable": true, "paymentMethods": null },
                  { "paymentMethodType": "CARD", "enable": true, "paymentMethods": null },
                  { "paymentMethodType": "UPI", "enable": true, "paymentMethods": null }
                ]
              },
              "offer_details": { "disable_offers": "true", "offer_applied": "false" }
            }
          },
          {
            "id": "fp72",
            "desc": "Lock Price for 72H",
            "lock_amount_type": "EXCLUSIVE",
            "collect_payment_against": "MULTIPLE_ORDER",
            "amount": { "amount_type": "FIXED", "value": "400", "amount_desc": "Price Lock fee" }
          }
        ]
      }
    }
  }
};

const ROUTES = {
  "MNL_SUG": { amount: "13949", currency: "USD", mti: MTI_MNL_SUG, udf10: "NEW_Ios", paymentFilter: SHARED_PAYMENT_FILTER_MNL_SUG, addOnRules: SHARED_ADD_ON_RULES , integrity: true},
  "SIN_MNL": { amount: "64064", currency: "PHP", mti: MTI_SIN_MNL, udf10: "NEW_Ios", paymentFilter: SHARED_PAYMENT_FILTER_MNL_SUG, addOnRules: [], riskProvider: "JUSPAYFRM", capCustId: "000014464",integrity: true },
  "MNL_LAO": { amount: "13947", currency: "INR", mti: MTI_MNL_LAO, udf10: "NEW_Ios", paymentFilter: SHARED_PAYMENT_FILTER_MNL_LAO, addOnRules: [] , paymentRules: PAYMENT_RULES_SIN_MNL, integrity: true},
  "MNL_KUL": { amount: "45974", currency: "USD", mti: MTI_MNL_KUL, udf10: "NEW_Ios", paymentFilter: SHARED_PAYMENT_FILTER_MNL_KUL, addOnRules: SHARED_ADD_ON_RULES ,cardinalRef: "auth_cardinal", baddress: "US", integrity: true},
  "MNL_SIN": { amount: "59640", currency: "SGD", mti: MTI_MNL_SIN, udf10: "NEW_Ios", paymentFilter: SHARED_PAYMENT_FILTER_MNL_SUG, addOnRules: SHARED_ADD_ON_RULES, udf: "AUXILLARY" , autoCapture: "false", baddress: "SG", paymentRules: PAYMENT_RULES_SIN_MNL, integrity: true},
  "RUH_MNL": { amount: "59640", currency: "INR", mti: MTI_RUH_MNL, udf10: "NEW_Ios", paymentFilter: SHARED_PAYMENT_FILTER_MNL_SUG, addOnRules: SHARED_ADD_ON_RULES ,integrity: true},
  "MEL_CEB": { amount: "10000", currency: "PHP", mti: MTI_MEL_CEB, udf10: "NEW_Ios", paymentFilter: SHARED_PAYMENT_FILTER_MNL_SUG, addOnRules: SHARED_ADD_ON_RULES , integrity: false, riskProvider: "JUSPAYFRM"}
};

// --- SESSION CREATION ---
app.post('/create-session', async (req, res) => {
  try {
    const { navToken, airlineName, searchData, language } = req.body;
    const sessionPNR = generatePNR();
    const { from, to } = searchData;

    // --- 2. DYNAMIC RETURN URL (Correct Logic) ---
    // This allows the redirect to work whether on localhost OR a live URL
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.get('host');
    const dynamicReturnUrl = `${protocol}://${host}?status=success&airline=${encodeURIComponent(airlineName)}&pnr=${sessionPNR}`;

    const routeKey = `${from}_${to}`;
    const scenario = ROUTES[routeKey] || ROUTES["MNL_SUG"];

    console.log(`Using Scenario: ${routeKey} | Amount: ${scenario.amount} ${scenario.currency}`);

    let payload = {
      "order_id": `PAH-${Date.now()}`,
      "amount": scenario.amount,
      "currency": scenario.currency,
      "customer_id": "Test123",
      "customer_email": "test@gmail.com",
      "customer_phone": "9999999999",
      "mobile_country_code": "91",
      "payment_page_client_id": "cebu",
      "action": "paymentPage",
      "return_url": dynamicReturnUrl, // UPDATED: Now uses the detected live URL
      "merchant_view_url": "",
      "description": null,
      "metadata.JUSPAY:gateway_reference_id": "FLIGHT",
      "udf3": "RCTT",
      "udf4": "Arora",
      "udf6": navToken,
      "udf7": "20240903",
      "udf10": scenario.udf10,
      "merchant_session_identifier": navToken,
      "metadata.NAVITAIRE:session_expiry_in_sec": "900",
      "disable_merchant_integrity_check": true,
      "options.get_client_auth_token": scenario.integrity,
      "payment_filter": scenario.paymentFilter,
      "add_on_amount_rules": scenario.addOnRules,
      "merchant_transient_info": scenario.mti,
      "metadata.webhook_url": "https://api-uat-skyplus.goindigo.in/postpayment/v1/payment/webhook",
      "metadata.expiryInMins": "12",
      "language": language || "en",
      "payment_rules": scenario.paymentRules,
      "metadata.risk_provider": scenario.riskProvider
    };

    if (routeKey === "SIN_MNL") payload.reward_rules = REWARD_RULES;
    if (scenario.cardinalRef) payload["metadata.CARDINAL:authentication_reference_id"] = scenario.cardinalRef;
    if (scenario.baddress) payload["billing_address_country_code_iso"] = scenario.baddress;
    if (scenario.udf) payload["udf1"] = scenario.udf;
    if (scenario.autoCapture) payload["metadata.txns.auto_capture"] = scenario.autoCapture;
    if (scenario.capCustId) payload["metadata.CAPILLARY:customer_id"] = scenario.capCustId;

    const response = await axios.post('https://sandbox.juspay.in/session', payload, {
      headers: { 'Authorization': JUSPAY_AUTH, 'Content-Type': 'application/json' }
    });

    res.json({ url: response.data.payment_links.web, sentPayload: payload });
  } catch (error) {
    console.error("❌ ERROR:", error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
});

// --- 3. CATCH-ALL HANDLER ---
// If the user visits any other URL, send them the index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// --- 4. START SERVER ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));