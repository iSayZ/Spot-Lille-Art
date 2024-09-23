import { createContext, useContext, useMemo } from "react";
import PropTypes from "prop-types";

const BadgeContext = createContext();

export function BadgeProvider({ children }) {
  const badges = [
    { id: 1, name: "chercheur", threshold: 20, range: "0-20", logo: "👀" },
    { id: 2, name: "explorateur", threshold: 50, range: "20-50", logo: "🔍" },
    { id: 3, name: "detective", threshold: 100, range: "50-100", logo: "🕵️" },
    {
      id: 4,
      name: "archeologue",
      threshold: Infinity,
      range: "100+",
      logo: "📷",
    },
  ];

  const getBadgeForPoints = (points) =>
    badges.find((badge) => points < badge.threshold);

  const memoBadgeValue = useMemo(
    () => ({
      badges,
      getBadgeForPoints,
    }),
    [badges, getBadgeForPoints]
  );

  return (
    <BadgeContext.Provider value={memoBadgeValue}>
      {children}
    </BadgeContext.Provider>
  );
}

BadgeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useBadges = () => useContext(BadgeContext);
