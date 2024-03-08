import React, { useEffect, useState } from "react";
import LineChart, { SimpleChartData } from "../LineChart";
import {
  AnnualBalancesForMonth,
  ApiStatsService,
} from "../../../services/apiStatsService";
import {
  formatDateToLocalISO,
  getMonthFrByYearMonth,
} from "../../../utils/dateUtils";

interface AnnualMonthlyBalanceChartProps {
  startDate: Date;
  endDate: Date;
  bankAccountId?: number;
}

type DataStructure = {
  [key: string]: {
    Balance: number;
  };
};
const AnnualMonthlyBalanceChart: React.FC<
  AnnualMonthlyBalanceChartProps
> = ({ startDate, endDate, bankAccountId }) => {
  const [balances, setBalances] = useState<AnnualBalancesForMonth[]>([]);
  const [datas, setDatas] = useState<SimpleChartData>();

  const getBalances = async function () {
    setBalances(
      await new ApiStatsService().getAnnualBalancesByMonth(
        formatDateToLocalISO(startDate),
        formatDateToLocalISO(endDate),
        bankAccountId,
      )
    );
  };

  useEffect(() => {
    getBalances();
  }, [startDate, endDate, bankAccountId]);

  useEffect(() => {
    const datasByMonth: DataStructure = {
      Janvier: { Balance: 0 },
      Février: { Balance: 0 },
      Mars: { Balance: 0 },
      Avril: { Balance: 0 },
      Mai: { Balance: 0 },
      Juin: { Balance: 0 },
      Juillet: { Balance: 0 },
      Août: { Balance: 0 },
      Septembre: { Balance: 0 },
      Octobre: { Balance: 0 },
      Novembre: { Balance: 0 },
      Décembre: { Balance: 0 },
    };

    balances.forEach((result) => {
      const frenchMonth = getMonthFrByYearMonth(result.month);
      if (datasByMonth[frenchMonth]) {
        datasByMonth[frenchMonth].Balance = result.amount;
      }
    });

    setDatas({
      labels: {
        y: "Montant (€)",
        x: "Mois",
      },
      colors: ["#77dd77"],
      data: datasByMonth,
    });
  }, [balances]);

  return datas ? (
    <LineChart data={datas} title="Evolution du solde" />
  ) : null;
};

export default AnnualMonthlyBalanceChart;
