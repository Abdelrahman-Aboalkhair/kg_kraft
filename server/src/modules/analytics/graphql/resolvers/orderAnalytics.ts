import {
  calculateMetrics,
  fetchData,
  getDateRange,
  shouldFetchPreviousPeriod,
  calculateChanges,
} from "@/shared/utils/analytics";
import { Context } from "../resolver";

const orderAnalytics = {
  Query: {
    orderAnalytics: async (_: any, { params }: any, { prisma }: Context) => {
      const { timePeriod, year, startDate, endDate } = params;
      const {
        currentStartDate,
        previousStartDate,
        previousEndDate,
        yearStart,
        yearEnd,
      } = getDateRange({ timePeriod, year, startDate, endDate });

      // Fetch current period data
      const currentOrders = await fetchData(
        prisma,
        "order",
        "orderDate",
        currentStartDate,
        endDate,
        yearStart,
        yearEnd
      );
      const currentOrderItems = await fetchData(
        prisma,
        "orderItem",
        "createdAt",
        currentStartDate,
        endDate,
        yearStart,
        yearEnd,
        undefined,
        { product: true }
      );

      // Fetch previous period data if needed
      const fetchPrevious = shouldFetchPreviousPeriod(timePeriod);
      const previousOrders = fetchPrevious
        ? await fetchData(
            prisma,
            "order",
            "orderDate",
            previousStartDate,
            previousEndDate,
            yearStart,
            yearEnd
          )
        : [];
      const previousOrderItems = fetchPrevious
        ? await fetchData(
            prisma,
            "orderItem",
            "createdAt",
            previousStartDate,
            previousEndDate,
            yearStart,
            yearEnd,
            undefined,
            { product: true }
          )
        : [];

      // Calculate metrics for both periods
      const currentMetrics = calculateMetrics(
        currentOrders,
        currentOrderItems,
        []
      );
      const previousMetrics = calculateMetrics(
        previousOrders,
        previousOrderItems,
        []
      );

      // Compute changes
      const changes = calculateChanges(
        currentMetrics,
        previousMetrics,
        fetchPrevious
      );

      return {
        totalOrders: currentMetrics.totalOrders,
        totalSales: currentMetrics.totalSales,
        averageOrderValue: Number(currentMetrics.averageOrderValue.toFixed(2)),
        changes: {
          orders: changes.orders,
          sales: changes.sales,
          averageOrderValue: changes.averageOrderValue,
        },
      };
    },
  },
};

export default orderAnalytics;
