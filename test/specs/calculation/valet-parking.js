const ParkcalcPage = require('../../pageobjects/parkcalc.page');

describe('calculation, valet parking', () => {

    it('should be $12 when time is for less than five hours', async () => {
        await ParkcalcPage.open();

        const params = {
            startingDate: '01/14/2021',
            leavingDate: '01/14/2021',
            startingTime: '07:00',
            leavingTime: '11:00',
            startingAm: true,
            startingPm: false,
            leavingAm: true,
            leavingPm: false,
        };
        await ParkcalcPage.loadPage(params);
        await (await ParkcalcPage.btnCalculate).click();

        await expect(ParkcalcPage.estimatedParkingCosts).toHaveTextContaining('$ 12.00');
    });

    it('should be $12 when time is for exactly five hours', async () => {
        await ParkcalcPage.open();

        const params = {
            startingDate: '01/14/2021',
            leavingDate: '01/14/2021',
            startingTime: '06:00',
            leavingTime: '11:00',
            startingAm: true,
            startingPm: false,
            leavingAm: true,
            leavingPm: false,
        };
        await ParkcalcPage.loadPage(params);
        await (await ParkcalcPage.btnCalculate).click();

        await expect(ParkcalcPage.estimatedParkingCosts).toHaveTextContaining('$ 12.00');
    });

    it('should be $18 when time is more than five hours but less than a day', async () => {
        await ParkcalcPage.open();

        const params = {
            startingDate: '01/14/2021',
            leavingDate: '01/14/2021',
            startingTime: '02:00',
            leavingTime: '11:00',
            startingAm: true,
            startingPm: false,
            leavingAm: true,
            leavingPm: false,
        };
        await ParkcalcPage.loadPage(params);
        await (await ParkcalcPage.btnCalculate).click();

        await expect(ParkcalcPage.estimatedParkingCosts).toHaveTextContaining('$ 18.00');
    });

    it('should be $36 when time is for exactly two days without additional time', async () => {
        await ParkcalcPage.open();

        const params = {
            startingDate: '01/14/2021',
            leavingDate: '01/16/2021',
            startingTime: '06:00',
            leavingTime: '06:00',
            startingAm: true,
            startingPm: false,
            leavingAm: true,
            leavingPm: false,
        };
        await ParkcalcPage.loadPage(params);
        await (await ParkcalcPage.btnCalculate).click();

        await expect(ParkcalcPage.estimatedParkingCosts).toHaveTextContaining('$ 36.00');
    });

    it('should be $30 when time is one day plus less than or equal to five additional hours', async () => {
        await ParkcalcPage.open();

        const params = {
            startingDate: '01/14/2021',
            leavingDate: '01/15/2021',
            startingTime: '06:00',
            leavingTime: '07:00',
            startingAm: true,
            startingPm: false,
            leavingAm: true,
            leavingPm: false,
        };
        await ParkcalcPage.loadPage(params);
        await (await ParkcalcPage.btnCalculate).click();

        await expect(ParkcalcPage.estimatedParkingCosts).toHaveTextContaining('$ 30.00');
    });

});