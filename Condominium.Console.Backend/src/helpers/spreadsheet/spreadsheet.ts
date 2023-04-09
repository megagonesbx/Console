import { SpreadsheetService } from "../../services";

export const validateSpreadsheet = async (service: SpreadsheetService, paymentId: number, dpi: number): Promise<boolean> => {
    try {
        const { data } = await service.getRecords(1,12, dpi);
        const payments: number[] = data.map(s => s.PaymentMonth);
    
        if (payments.includes(paymentId)) {
            return false;
        }
    
        return true;
    } catch (error) {
        return false;
    }
};