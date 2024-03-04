import React from "react";
import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  label: string;
  value: number;
  theoreticalValue?: number;
  maxValue: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  label,
  value,
  theoreticalValue = 0,
  maxValue,
}) => {
  const valuePercentage = (value / maxValue) * 100;
  const theoreticalPercentage = Math.min(
    100,
    (theoreticalValue / maxValue) * 100
  );
  const remaining = (maxValue - value).toFixed(2);
  const theoreticalRemaining = (maxValue - theoreticalValue).toFixed(2);
  const displayTheoretical = theoreticalValue !== value;
  const progressColor =
    valuePercentage < 40 ? "green" : valuePercentage < 60 ? "orange" : "red";

  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressBarHeader}>
        <div className={styles.progressBarTitle}>{label}</div>
        <div className={styles.progressBarRemaining}>
          Reste: {remaining}€{" "}
          {displayTheoretical && `(${theoreticalRemaining}€)`}
        </div>
      </div>
      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{
            width: `${valuePercentage}%`,
            backgroundColor: progressColor,
          }}
        ></div>
        {displayTheoretical && theoreticalValue > value && (
          <div
            className={styles.progress}
            style={{
              width: `${theoreticalPercentage}%`,
              backgroundColor: progressColor,
              zIndex: 0,
              opacity: 0.5,
            }}
          ></div>
        )}
        <div className={styles.progressPercentage}>
          {valuePercentage.toFixed(0)}%
        </div>
      </div>
      <div className={styles.progressBarSummary}>
        {value}€ {displayTheoretical && `(${theoreticalValue}€)`} / {maxValue}€
      </div>
    </div>
  );
};

export default ProgressBar;
