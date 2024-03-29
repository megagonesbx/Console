import { PaymentService } from "../../services";

export const validatePayment = async (
  service: PaymentService,
  dpi: string,
  monthId: string
): Promise<boolean> => {
  try {
    const { data } = await service.getRecords(1, 100, dpi);
    const existPayment = await data.findIndex((p) => p.month == monthId);

    return existPayment != -1 ? false : true;
  } catch (error) {
    return false;
  }
};
