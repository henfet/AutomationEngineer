const ParkcalcPage = require('../pageobjects/parkcalc.page');
// const SecurePage = require('../pageobjects/secure.page');

describe('Inputs', () => {
    
    it('should calculate with valid values at the inputs', async () => {
        await ParkcalcPage.open();

        await ParkcalcPage.loadValues();
        //  ParkcalcPage.btnCalculate.click;
        // ParkcalcPage.btnCalculate.click;

        const estimatedParkingCosts = $('b');
        await expect(estimatedParkingCosts).toHaveTextContaining('$ 8.00');
        
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


