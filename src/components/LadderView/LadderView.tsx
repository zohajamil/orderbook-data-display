import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ScrollableWidgets from '../ScrollableWidget/ScrollableWidget';
import { LadderViewProps } from '../../common/interfaces/LadderViewProps';
import { OrderWithTimestamp } from '../../common/interfaces/OrderWithTimestamp';


const LadderView: React.FC<LadderViewProps> = (props: LadderViewProps) => {
  const fifteenMinutes = 15 * 1000; // 15 minutes in milliseconds (keep ladderview data of last 15 mins only)
  const [displayedBids, setDisplayedBids] = useState<OrderWithTimestamp[]>([]);
  const [displayedAsks, setDisplayedAsks] = useState<OrderWithTimestamp[]>([]);

  const updateDisplayedData = useCallback(() => {
    const now = Date.now();

    const filterData = (orders: OrderWithTimestamp[]) => {
      return orders.filter(order => order.timestamp >= now - fifteenMinutes); // filtering data for last 15 mins only
    };

    setDisplayedBids(filterData(props.bids));
    setDisplayedAsks(filterData(props.asks));
  }, [props.bids, props.asks, fifteenMinutes]);

  useEffect(() => {
    const interval = setInterval(updateDisplayedData, 15000); // Update every 15 seconds so that the data is not rendered repeatedly

    // Initial update
    updateDisplayedData();

    return () => clearInterval(interval);
  }, [updateDisplayedData])

  const sortedBids = useMemo(() => {
    return displayedBids.sort((a, b) => b.price - a.price);
  }, [displayedBids])

  const sortedAsks = useMemo(() => {
    return displayedAsks.sort((a, b) => a.price - b.price);
  }, [displayedAsks])

  return (
    <div className="ladder-view">
      {/* Display the ladder view data in scrollable widgets so that the height of screen is not repeatedly changed */}
      <ScrollableWidgets aggregatedAsks={sortedAsks} aggregatedBids={sortedBids} />
    </div>
  );
};

// Have used memo here to avoid unnecessary rerenders
export default React.memo(LadderView);
