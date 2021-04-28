const ParkcalcPage = require('../../pageobjects/parkcalc.page');

describe('calculation, short parking', () => {

    it('should be $10 when time is for five hours', async () => {
        await ParkcalcPage.open();

        const params = {
            parkingLot: 'Short-Term Parking',
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

        await expect(ParkcalcPage.estimatedParkingCosts).toHaveTextContaining('$ 10.00');
    });

    it('should be $24 maximum when time is less than or equal one day', async () => {
        await ParkcalcPage.open();

        const params = {
            parkingLot: 'Short-Term Parking',
            startingDate: '01/14/2021',
            leavingDate: '01/14/2021',
            startingTime: '06:00',
            leavingTime: '11:00',
            startingAm: true,
            startingPm: false,
            leavingAm: false,
            leavingPm: true,
        };
        await ParkcalcPage.loadPage(params);
        await (await ParkcalcPage.btnCalculate).click();

        await expect(ParkcalcPage.estimatedParkingCosts).toHaveTextContaining('$ 24.00');
    });
     
    it('should be $27 when time is for one day plus one and half hour', async () => {
        await ParkcalcPage.open();

        const params = {
            parkingLot: 'Short-Term Parking',
            startingDate: '01/14/2021',
            leavingDate: '01/15/2021',
            startingTime: '06:00',
            leavingTime: '07:30',
            startingAm: true,
            startingPm: false,
            leavingAm: true,
            leavingPm: false,
        };
        await ParkcalcPage.loadPage(params);
        await (await ParkcalcPage.btnCalculate).click();

        await expect(ParkcalcPage.estimatedParkingCosts).toHaveTextContaining('$ 27.00');
    });

    it('should be $48 when time is one day and more than or equal to twelve additional hours', async () => {
        await ParkcalcPage.open();

        const params = {
            parkingLot: 'Short-Term Parking',
            startingDate: '01/14/2021',
            leavingDate: '01/15/2021',
            startingTime: '06:00',
            leavingTime: '06:00',
            startingAm: true,
            startingPm: false,
            leavingAm: false,
            leavingPm: true,
        };
        await ParkcalcPage.loadPage(params);
        await (await ParkcalcPage.btnCalculate).click();

        await expect(ParkcalcPage.estimatedParkingCosts).toHaveTextContaining('$ 48.00');
    });
     
});