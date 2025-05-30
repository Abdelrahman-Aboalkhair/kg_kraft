import { Context } from "../resolver";
import { ROLE } from "@prisma/client";
import {
  fetchData,
  shouldFetchPreviousPeriod,
  calculateEngagementScores,
  calculateRetentionRate,
  calculateCustomerMetrics,
  generateTopCustomers,
  aggregateInteractionTrends,
  getDateRange,
  calculateChanges,
} from "@/shared/utils/analytics";

const userAnalytics = {
  Query: {
    userAnalytics: async (_: any, { params }: any, { prisma }: Context) => {
      const { timePeriod, year, startDate, endDate } = params;
      // Use getDateRange to compute date ranges, keeping date logic abstracted.
      const {
        currentStartDate,
        previousStartDate,
        previousEndDate,
        yearStart,
        yearEnd,
      } = getDateRange({ timePeriod, year, startDate, endDate });

      // Fetch users and interactions for the current period
      const users = await fetchData(
        prisma,
        "user",
        "createdAt",
        currentStartDate,
        endDate,
        yearStart,
        yearEnd,
        ROLE.USER,
        { orders: true }
      );
      const interactions = await fetchData(
        prisma,
        "interaction",
        "createdAt",
        currentStartDate,
        endDate,
        yearStart,
        yearEnd
      );

      // Fetch previous period users only when needed
      const fetchPrevious = shouldFetchPreviousPeriod(timePeriod);
      const previousUsers = fetchPrevious
        ? await fetchData(
            prisma,
            "user",
            "createdAt",
            previousStartDate,
            previousEndDate,
            yearStart,
            yearEnd,
            ROLE.USER,
            { orders: true }
          )
        : [];

      // Calculate user metrics
      const {
        totalCustomers: totalUsers,
        totalRevenue,
        lifetimeValue,
        repeatPurchaseRate,
      } = calculateCustomerMetrics(users);
      const previousMetrics = fetchPrevious
        ? calculateCustomerMetrics(previousUsers)
        : { totalCustomers: 0 };

      // Calculate retention rate
      const retentionRate = fetchPrevious
        ? calculateRetentionRate(users, previousUsers)
        : 0;

      // Compute engagement scores
      const { scores: engagementScores, averageScore: engagementScore } =
        calculateEngagementScores(interactions);

      // Generate top users
      const topUsers = generateTopCustomers(users, engagementScores);

      // Aggregate interaction trends
      const interactionTrends = aggregateInteractionTrends(interactions);

      // Calculate changes for totalUsers
      const changes = calculateChanges(
        { totalUsers },
        { totalUsers: previousMetrics.totalCustomers },
        fetchPrevious
      );

      // Return the response with rounded numbers
      return {
        totalUsers,
        totalRevenue: Number(totalRevenue.toFixed(2)),
        retentionRate: Number(retentionRate.toFixed(2)),
        lifetimeValue: Number(lifetimeValue.toFixed(2)),
        repeatPurchaseRate: Number(repeatPurchaseRate.toFixed(2)),
        engagementScore: Number(engagementScore.toFixed(2)),
        topUsers,
        interactionTrends,
        changes: {
          users: Number(changes.users?.toFixed(2)) || 0,
        },
      };
    },
  },
};

export default userAnalytics;
