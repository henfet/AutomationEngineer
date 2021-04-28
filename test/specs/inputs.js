const ParkcalcPage = require('../pageobjects/parkcalc.page');

describe('Inputs', () => {

    it('should keep the same loting park selected after calculate', async () => {
        await ParkcalcPage.open();

        const params = {
            parkingLot: 'Short-Term Parking',
        };
        await ParkcalcPage.loadPage(params);
        await (await ParkcalcPage.btnCalculate).click();

        await expect(ParkcalcPage.inputParkingLot).toHaveValue('Short');
    });

    
    it('should show and error when is calculated with an incorrectly formatted hour', async () => {
        await ParkcalcPage.open();

        const params = {
            startingDate: '01/14/2021',
            leavingDate: '01/14/2021',
            startingTime: 'ab:00',
            leavingTime: '11:00',
        };
        await ParkcalcPage.loadPage(params);
        await (await ParkcalcPage.btnCalculate).click();

        await expect(ParkcalcPage.estimatedParkingCosts).toHaveTextContaining('ERROR!');
    });

    it('should show and error when is calculated with an invalid hour, greater than 12', async () => {
        await ParkcalcPage.open();

        const params = {
            startingDate: '01/14/2021',
            leavingDate: '01/14/2021',
            startingTime: '13:00',
            leavingTime: '11:00',
        };
        await ParkcalcPage.loadPage(params);
        await (await ParkcalcPage.btnCalculate).click();

        await expect(ParkcalcPage.estimatedParkingCosts).toHaveTextContaining('ERROR!');
    });

    it('should show and error when is calculated with an incorrectly formatted minutes', async () => {
        await ParkcalcPage.open();

        const params = {
            startingDate: '01/14/2021',
            leavingDate: '01/14/2021',
            startingTime: '01:ab',
            leavingTime: '11:00',
        };
        await ParkcalcPage.loadPage(params);
        await (await ParkcalcPage.btnCalculate).click();

        await expect(ParkcalcPage.estimatedParkingCosts).toHaveTextContaining('ERROR!');
    });

    it('should show and error when is calculated with invalid minutes, greater than 59', async () => {
        await ParkcalcPage.open();

        const params = {
            startingDate: '01/14/2021',
            leavingDate: '01/14/2021',
            startingTime: '01:60',
            leavingTime: '11:00',
        };
        await ParkcalcPage.loadPage(params);
        await (await ParkcalcPage.btnCalculate).click();

        await expect(ParkcalcPage.estimatedParkingCosts).toHaveTextContaining('ERROR!');
    });

    it('should show and error when is calculated with an incorrectly formatted month', async () => {
        await ParkcalcPage.open();

        const params = {
            startingDate: 'ab/14/2021',
            leavingDate: '01/14/2021',
            startingTime: '01:00',
            leavingTime: '11:00',
        };
        await ParkcalcPage.loadPage(params);
        await (await ParkcalcPage.btnCalculate).click();

        await expect(ParkcalcPage.estimatedParkingCosts).toHaveTextContaining('ERROR!');
    });

    it('should show and error when is calculated with invalid month, greater than 12', async () => {
        await ParkcalcPage.open();

        const params = {
            startingDate: '80/14/2021',
            leavingDate: '01/14/2021',
            startingTime: '01:00',
            leavingTime: '11:00',
        };
        await ParkcalcPage.loadPage(params);
        await (await ParkcalcPage.btnCalculate).click();

        await expect(ParkcalcPage.estimatedParkingCosts).toHaveTextContaining('ERROR!');
    });

    it('should show and error when is calculated with an incorrectly formatted day', async () => {
        await ParkcalcPage.open();

        const params = {
            startingDate: '01/ab/2021',
            leavingDate: '01/14/2021',
            startingTime: '01:00',
            leavingTime: '11:00',
        };
        await ParkcalcPage.loadPage(params);
        await (await ParkcalcPage.btnCalculate).click();

        await expect(ParkcalcPage.estimatedParkingCosts).toHaveTextContaining('ERROR!');
    });

    it('should show and error when is calculated with invalid day, greater than 31', async () => {
        await ParkcalcPage.open();

        const params = {
            startingDate: '01/50/2021',
            leavingDate: '01/14/2021',
            startingTime: '01:00',
            leavingTime: '11:00',
        };
        await ParkcalcPage.loadPage(params);
        await (await ParkcalcPage.btnCalculate).click();

        await expect(ParkcalcPage.estimatedParkingCosts).toHaveTextContaining('ERROR!');
    });


    it('should keep the same AM/PM choice when calculate button is clicked', async () => {
        await ParkcalcPage.open();

        const params = {
            startingDate: '01/14/2021',
            leavingDate: '01/14/2021',
            startingTime: '07:00',
            leavingTime: '11:00',
            startingAm: true,
            startingPm: false,
            leavingAm: false,
            leavingPm: true,
            isClicked: false
        };
        await ParkcalcPage.loadPage(params);
        await (await ParkcalcPage.btnCalculate).click();

        await expect(ParkcalcPage.inputStartingAm).toBeSelected();
        await expect(ParkcalcPage.inputLeavingPm).toBeSelected();

    });
    
    it('should calculate with valid values at the inputs', async () => {
        await ParkcalcPage.open();

        const validParams = {
            parkingLot: 'Short-Term Parking',
            startingDate: '01/14/2021',
            leavingDate: '01/14/2021',
            startingTime: '07:00',
            leavingTime: '11:00',
            startingAm: false,
            startingPm: true,
            leavingAm: false,
            leavingPm: true,
            isClicked: false
        };
        await ParkcalcPage.loadPage(validParams);
        await (await ParkcalcPage.btnCalculate).click();

        await expect(ParkcalcPage.estimatedParkingCosts).toHaveTextContaining('$ 8.00');
    });

    it('should change to valid values for the inputs', async () => {
        await ParkcalcPage.open();

        ParkcalcPage.loadValidValues();
        
        await expect(ParkcalcPage.inputParkingLot).toHaveValue('Short');
        await expect(ParkcalcPage.inputStartingDate).toHaveValue('01/14/2021');
        await expect(ParkcalcPage.inputLeavingDate).toHaveValue('01/14/2021');
        await expect(ParkcalcPage.inputStartingTime).toHaveValue('07:00');
        await expect(ParkcalcPage.inputLeavingTime).toHaveValue('11:00');
        await expect(ParkcalcPage.inputStartingPm).toBeSelected();
        await expect(ParkcalcPage.inputLeavingPm).toBeSelected();
        
    });
    

});
