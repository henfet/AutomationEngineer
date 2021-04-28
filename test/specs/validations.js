const ParkcalcPage = require('../pageobjects/parkcalc.page');

describe('Validations', () => {

    it('entry date should be earlier than or equal to the leaving date', async () => {
        await ParkcalcPage.open();

        const params = {
            startingDate: '01/15/2021',
            leavingDate: '01/14/2021',
        };
        await ParkcalcPage.loadPage(params);
        await (await ParkcalcPage.btnCalculate).click();

        await expect(ParkcalcPage.estimatedParkingCosts).toHaveTextContaining('ERROR!');
    });

    it('with same date entry/leaving the entry time AM/PM choice should be earlier than or equal the leaving time AM/PM choice', async () => {
        await ParkcalcPage.open();

        const params = {
            startingDate: '01/14/2021',
            leavingDate: '01/14/2021',
            startingPm: true,
            leavingAm: true,
        };
        await ParkcalcPage.loadPage(params);
        await (await ParkcalcPage.btnCalculate).click();

        await expect(ParkcalcPage.estimatedParkingCosts).toHaveTextContaining('ERROR!');
    });

    it('with same date entry/leaving the entry time should be earlier than the leaving time', async () => {
        await ParkcalcPage.open();

        const params = {
            startingDate: '01/14/2021',
            leavingDate: '01/14/2021',
            startingTime: '11:00',
            leavingTime: '07:00',
            startingAm: true,
            leavingAm: true,
        };
        await ParkcalcPage.loadPage(params);
        await (await ParkcalcPage.btnCalculate).click();

        await expect(ParkcalcPage.estimatedParkingCosts).toHaveTextContaining('ERROR!');
    });

    it('with same date entry/leaving the entry time should be earlier than the leaving time', async () => {
        await ParkcalcPage.open();

        const params = {
            startingDate: '01/14/2021',
            leavingDate: '01/14/2021',
            startingTime: '11:00',
            leavingTime: '07:00',
            startingAm: true,
            leavingAm: true,
        };
        await ParkcalcPage.loadPage(params);
        await (await ParkcalcPage.btnCalculate).click();

        await expect(ParkcalcPage.estimatedParkingCosts).toHaveTextContaining('ERROR!');
    });

});
