const ParkcalcPage = require('../../pageobjects/parkcalc.page');

describe('calculation, Long-Term Garage Parking', () => {

    it('should be $10 when time is for five hours', async () => {
        await ParkcalcPage.open();

        const params = {
            parkingLot: 'Long-Term Garage Parking',
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

    it('should be $12 maximum when time is less than or equal one day', async () => {
        await ParkcalcPage.open();

        const params = {
            parkingLot: 'Long-Term Garage Parking',
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

        await expect(ParkcalcPage.estimatedParkingCosts).toHaveTextContaining('$ 12.00');
    });
     
    it('should be $24 when time is one day and more than or equal to six additional hours', async () => {
        await ParkcalcPage.open();

        const params = {
            parkingLot: 'Long-Term Garage Parking',
            startingDate: '01/14/2021',
            leavingDate: '01/15/2021',
            startingTime: '02:00',
            leavingTime: '11:00',
            startingAm: true,
            startingPm: false,
            leavingAm: true,
            leavingPm: false,
        };
        await ParkcalcPage.loadPage(params);
        await (await ParkcalcPage.btnCalculate).click();

        await expect(ParkcalcPage.estimatedParkingCosts).toHaveTextContaining('$ 24.00');
    });

     
    it('should be $72 when time a week', async () => {
        await ParkcalcPage.open();

        const params = {
            parkingLot: 'Long-Term Garage Parking',
            startingDate: '01/14/2021',
            leavingDate: '01/21/2021',
            startingTime: '02:00',
            leavingTime: '02:00',
            startingAm: true,
            startingPm: false,
            leavingAm: true,
            leavingPm: false,
        };
        await ParkcalcPage.loadPage(params);
        await (await ParkcalcPage.btnCalculate).click();

        await expect(ParkcalcPage.estimatedParkingCosts).toHaveTextContaining('$ 72.00');
    });
});